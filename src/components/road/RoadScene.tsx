"use client";

import { useEffect, useRef, type RefObject } from "react";
import clsx from "clsx";
import { FRAGMENT_SHADER, VERTEX_SHADER } from "@/components/road/roadShader";

export type RoadFrame = {
  /** Пройденный путь по прокрутке, метры — без холостого хода. */
  z: number;
  yaw: number;
  pitch: number;
  sway: number;
  width: number;
  height: number;
  /** Фокус в CSS-пикселях: смещение на экране = (x / z) * focal. */
  focal: number;
};

type RoadSceneProps = {
  /**
   * drive — камера едет от прокрутки (progressRef, 0..1).
   * cruise — медленный ход сам по себе, для финала.
   */
  mode: "drive" | "cruise";
  progressRef?: RefObject<number>;
  /** Сколько метров трассы приходится на всю прокрутку секции. */
  length?: number;
  onFrame?: (frame: RoadFrame) => void;
  className?: string;
};

const F = 1.6;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * Живая ночная трасса на WebGL. Прокрутка двигает камеру вперёд, мышь
 * поворачивает взгляд и фары, на телефоне то же делает наклон.
 *
 * Рисует только пока видна на экране. Если WebGL нет или пользователь
 * просит меньше движения, остаётся один неподвижный кадр либо постер
 * из CSS — под канвасом всегда лежит фон секции.
 */
export default function RoadScene({ mode, progressRef, length = 420, onFrame, className }: RoadSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onFrameRef = useRef(onFrame);

  useEffect(() => {
    onFrameRef.current = onFrame;
  }, [onFrame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Контекст WebGL, компиляция шейдера и первый кадр — заметная работа,
    // а сцена стоит ниже шоурила. Поднимаем её, когда браузер освободится
    // после загрузки или когда до сцены останется экран прокрутки, — не
    // в момент гидратации, где она отнимала время у первого экрана.
    const setup = () => {
      const gl = canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "high-performance",
      });
      if (!gl) {
        canvas.dataset.state = "fallback";
        return;
      }
      gl.getExtension("OES_standard_derivatives");

      const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
      const program = gl.createProgram();
      if (!vs || !fs || !program) {
        canvas.dataset.state = "fallback";
        return;
      }
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        canvas.dataset.state = "fallback";
        return;
      }
      gl.useProgram(program);

      // Один треугольник на весь экран.
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const aPos = gl.getAttribLocation(program, "aPos");
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      const u = (name: string) => gl.getUniformLocation(program, name);
      const uRes = u("uRes");
      const uTime = u("uTime");
      const uZ = u("uZ");
      const uYaw = u("uYaw");
      const uPitch = u("uPitch");
      const uSway = u("uSway");
      const uBeam = u("uBeam");
      const uCity = u("uCity");
      const uLamps = u("uLamps");

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      // Шейдер тяжёлый на пиксель: считаем в уменьшенном разрешении и
      // растягиваем. Зерно и туман прячут разницу.
      const scale = coarse ? 0.45 : 0.62;
      const lamps = coarse ? 8 : 11;

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.max(1, Math.round(canvas.clientWidth * dpr * scale));
        const h = Math.max(1, Math.round(canvas.clientHeight * dpr * scale));
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          gl.viewport(0, 0, w, h);
        }
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);
      resize();

      // Куда смотрит водитель: −0.5..0.5 по обеим осям.
      let aimX = 0;
      let aimY = 0;
      const onPointer = (event: PointerEvent) => {
        aimX = event.clientX / window.innerWidth - 0.5;
        aimY = event.clientY / window.innerHeight - 0.5;
      };
      const onTilt = (event: DeviceOrientationEvent) => {
        if (event.gamma == null || event.beta == null) return;
        aimX = Math.max(-0.5, Math.min(0.5, event.gamma / 50));
        aimY = Math.max(-0.5, Math.min(0.5, (event.beta - 50) / 80));
      };
      if (coarse) window.addEventListener("deviceorientation", onTilt);
      else window.addEventListener("pointermove", onPointer, { passive: true });

      let visible = false;
      let menuOpen = false;
      let raf = 0;
      const start = performance.now();
      let last = start;
      let z = 0;
      let yaw = 0;
      let pitch = -0.02;
      let beam = 0;

      const render = (now: number) => {
        raf = 0;
        // Под открытым меню сцену не видно — кадры отдаём анимации меню.
        if (menuOpen) return;
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        const time = (now - start) / 1000;
        const ease = (rate: number) => 1 - Math.exp(-dt * rate);

        const progress = progressRef?.current ?? 0;
        const target = mode === "drive" ? progress * length : 0;
        z += (target - z) * (reduce ? 1 : ease(5));
        const idle = reduce ? 0 : time * (mode === "drive" ? 1.4 : 6.5);

        yaw += (aimX * 0.32 - yaw) * ease(2.6);
        pitch += (-aimY * 0.07 - 0.02 - pitch) * ease(2.6);
        beam += (aimX * 1.5 - beam) * ease(3.5);
        const sway = reduce ? 0 : Math.sin(time * 0.33) * 0.14;

        resize();
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, time);
        gl.uniform1f(uZ, z + idle);
        gl.uniform1f(uYaw, yaw);
        gl.uniform1f(uPitch, pitch);
        gl.uniform1f(uSway, sway);
        gl.uniform1f(uBeam, beam);
        gl.uniform1f(uCity, mode === "cruise" ? 1 : 0.35);
        gl.uniform1f(uLamps, lamps);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        onFrameRef.current?.({
          z,
          yaw,
          pitch,
          sway,
          width: canvas.clientWidth,
          height: canvas.clientHeight,
          focal: F * canvas.clientHeight,
        });

        if (visible && !reduce && !document.hidden) raf = requestAnimationFrame(render);
      };

      const kick = () => {
        if (!raf) raf = requestAnimationFrame(render);
      };

      const intersection = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) kick();
        },
        // Только когда сцена действительно на экране: шейдер тяжёлый, и
        // рисовать его под шоурилом «на всякий случай» — отнимать кадры.
        // Минус 2 px — потому что сцена начинается ровно у нижнего края
        // экрана, а касание края браузер считает пересечением: без отступа
        // шейдер крутился 60 кадров в секунду, пока смотрят шоурил.
        { rootMargin: "-2px 0px" },
      );
      intersection.observe(canvas);

      // Даже без движения нужен один кадр: и для reduced motion, и для
      // прокрутки, которая двигает камеру без анимационного цикла.
      const onScroll = () => {
        if (visible) kick();
      };
      const onVisibility = () => {
        if (!document.hidden && visible) kick();
      };
      const onMenu = (event: Event) => {
        menuOpen = Boolean((event as CustomEvent<boolean>).detail);
        if (!menuOpen && visible) {
          last = performance.now();
          kick();
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("hf:menu", onMenu);
      document.addEventListener("visibilitychange", onVisibility);
      canvas.dataset.state = "live";
      kick();

      return () => {
        if (raf) cancelAnimationFrame(raf);
        intersection.disconnect();
        resizeObserver.disconnect();
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("deviceorientation", onTilt);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("hf:menu", onMenu);
        document.removeEventListener("visibilitychange", onVisibility);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    };

    let teardown: (() => void) | undefined;
    let started = false;
    // requestIdleCallback есть не во всех Safari — там просто таймер.
    const hasIdle = typeof window.requestIdleCallback === "function";
    let idle = 0;
    const cancelIdle = () => {
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) begin();
      },
      { rootMargin: "100% 0px" },
    );
    const begin = () => {
      if (started) return;
      started = true;
      near.disconnect();
      cancelIdle();
      teardown = setup();
    };
    near.observe(canvas);
    idle = hasIdle ? window.requestIdleCallback(begin, { timeout: 5000 }) : window.setTimeout(begin, 2500);

    return () => {
      near.disconnect();
      cancelIdle();
      teardown?.();
    };
  }, [mode, progressRef, length]);

  return <canvas ref={canvasRef} className={clsx("road-canvas", className)} aria-hidden />;
}
