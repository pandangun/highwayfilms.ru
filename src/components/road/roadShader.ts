/**
 * Ночная трасса одним фрагментным шейдером: без моделей и текстур.
 *
 * Камера стоит в средней полосе трёхполосной дороги. Для каждого пикселя
 * луч пересекается с плоскостью асфальта; разметка, пятна фонарей, фары
 * и отражения на мокром покрытии считаются аналитически. Фонари и огни
 * машин рисуются в проективных координатах камеры: так их свечение
 * сжимается с расстоянием само, без спрайтов.
 *
 * Гамма — синяя ночь сайта: светодиодные фонари, лунный свет разметки,
 * красные габариты впереди как единственный тёплый цвет.
 */
export const VERTEX_SHADER = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

export const FRAGMENT_SHADER = `
#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform float uZ;
uniform float uYaw;
uniform float uPitch;
uniform float uSway;
uniform float uBeam;
uniform float uCity;
uniform float uLamps;

const float HALF = 5.625;
const float LAMP_X = 7.6;
const float LAMP_H = 10.5;
const float GAP = 36.0;
const float F = 1.6;
const vec3 LED = vec3(0.60, 0.76, 1.0);
const vec3 MOON = vec3(0.86, 0.91, 1.0);
const vec3 NIGHT = vec3(0.008, 0.020, 0.048);
const vec3 TAIL = vec3(1.0, 0.07, 0.05);

float hash21(vec2 p) {
  p = fract(p * vec2(233.34, 851.73));
  p += dot(p, p + 23.45);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float aaWidth(float v) {
#ifdef GL_OES_standard_derivatives
  return fwidth(v) + 0.001;
#else
  return 0.02;
#endif
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

  float cy = cos(uYaw);
  float sy = sin(uYaw);
  float cp = cos(uPitch);
  float sp = sin(uPitch);
  vec3 fw = vec3(sy * cp, sp, cy * cp);
  vec3 rt = normalize(vec3(cy, 0.0, -sy));
  vec3 up = cross(fw, rt);

  vec3 ro = vec3(uSway, 1.3, uZ);
  vec3 rd = normalize(fw * F + uv.x * rt + uv.y * up);
  vec2 pix = uv / F;

  // Небо: ночь, у горизонта холодное зарево города.
  vec3 sky = NIGHT * (0.55 + 0.45 * smoothstep(-0.05, 0.35, rd.y));
  float band = exp(-abs(rd.y) * 26.0);
  sky += (LED * 0.07 + MOON * 0.035) * band * (0.6 + uCity);
  // Редкие огни города по линии горизонта.
  if (rd.y > -0.002 && rd.y < 0.02) {
    vec2 cell = floor(vec2(atan(rd.x, rd.z) * 900.0, rd.y * 1800.0));
    float spark = step(0.992 - uCity * 0.01, hash21(cell));
    sky += MOON * spark * 0.55 * smoothstep(0.02, 0.0, rd.y) * (0.4 + uCity);
  }

  vec3 col = sky;
  // Туман того же цвета, что небо у горизонта: без шва на линии горизонта.
  vec3 fogCol = NIGHT * 0.55 + (LED * 0.07 + MOON * 0.035) * (0.6 + uCity);

  if (rd.y < -0.0006) {
    float t = -ro.y / rd.y;
    vec3 p = ro + rd * t;
    float ax = abs(p.x);

    float road = 1.0 - smoothstep(HALF + 0.15, HALF + 0.45, ax);
    // Мелкое зерно асфальта видно только вблизи: вдали шум даёт муар.
    float near = exp(-t * 0.06);
    float g1 = vnoise(p.xz * vec2(0.9, 0.35));
    float g2 = mix(0.5, vnoise(p.xz * 9.0 + 7.1), near);
    vec3 asphalt = mix(vec3(0.007, 0.012, 0.026), vec3(0.016, 0.025, 0.046), g1 * 0.7 + g2 * 0.3);
    vec3 base = mix(vec3(0.003, 0.006, 0.012), asphalt, road);

    // Разметка: сплошные края, прерывистые линии между полосами.
    float aa = aaWidth(p.x);
    float edgeLine = 1.0 - smoothstep(0.075, 0.075 + aa, abs(ax - (HALF - 0.3)));
    float dash = step(fract(p.z / 12.0), 0.27);
    float laneLine = (1.0 - smoothstep(0.065, 0.065 + aa, abs(ax - 1.875))) * dash;
    float paint = max(edgeLine, laneLine) * smoothstep(300.0, 70.0, t);

    vec3 lit = vec3(0.0);
    vec3 refl = vec3(0.0);
    float z0 = floor((ro.z - 24.0) / GAP) * GAP;

    for (int i = 0; i < 12; i++) {
      if (float(i) >= uLamps) break;
      float lz = z0 + float(i) * GAP;
      for (int s = 0; s < 2; s++) {
        float side = s == 0 ? -1.0 : 1.0;
        float zz = lz + (s == 0 ? 0.0 : GAP * 0.5);

        vec2 d = p.xz - vec2(side * (LAMP_X - 2.4), zz);
        lit += LED * (1.0 / (1.0 + dot(d, d) * 0.011));

        // Отражение фонаря на мокром асфальте — вертикальная полоса под
        // зеркальным двойником фонаря.
        vec3 dm = vec3(side * LAMP_X, -LAMP_H, zz) - ro;
        float zc = dot(dm, fw);
        if (zc > 1.0) {
          vec2 q = vec2(dot(dm, rt), dot(dm, up)) / zc - pix;
          float w = 0.25 / zc + 0.0015;
          float h = 0.06 + 4.5 / zc;
          refl += LED * exp(-(q.x * q.x) / (w * w)) * exp(-(q.y * q.y) / (h * h)) * (1.3 / (1.0 + zc * 0.012));
        }
      }
    }

    // Фары своей машины: конус света впереди, ведёт мышь.
    float fz = p.z - ro.z;
    float bx = uSway + uBeam * 2.6;
    float beam = smoothstep(0.0, 5.0, fz) * exp(-fz * 0.026) * exp(-pow((p.x - bx) / (1.2 + fz * 0.17), 2.0));
    lit += MOON * beam * 1.7;

    // Лужи: низкочастотная маска делает отражения то ярче, то глуше.
    float wet = 0.55 + 0.75 * smoothstep(0.25, 0.85, g1);
    vec3 surf = base * (0.3 + lit) + paint * (0.02 + lit * 0.5 + beam * 1.1);
    surf += refl * road * wet;
    // Редкие блики мокрого асфальта в свете фар и фонарей, только вблизи.
    surf += MOON * pow(g2, 14.0) * (lit.b * 0.5 + beam) * road * near * 0.8;

    float fog = 1.0 - exp(-t * 0.0062);
    col = mix(surf, fogCol, fog);
  }

  // Фонари в воздухе: ядро, ореол и горизонтальный анаморфный блик.
  float z0l = floor((ro.z - 24.0) / GAP) * GAP;
  for (int i = 0; i < 12; i++) {
    if (float(i) >= uLamps) break;
    float lz = z0l + float(i) * GAP;
    for (int s = 0; s < 2; s++) {
      float side = s == 0 ? -1.0 : 1.0;
      float zz = lz + (s == 0 ? 0.0 : GAP * 0.5);
      vec3 dl = vec3(side * LAMP_X, LAMP_H, zz) - ro;
      float zc = dot(dl, fw);
      if (zc > 1.5) {
        vec2 q = vec2(dot(dl, rt), dot(dl, up)) / zc - pix;
        float r = 0.55 / zc;
        float r2 = dot(q, q);
        float core = exp(-r2 / (r * r * 0.25));
        float halo = exp(-r2 / (r * r * 9.0)) * 0.09;
        float flare = exp(-(q.y * q.y) / (r * r * 0.02)) * exp(-(q.x * q.x) / (r * r * 220.0)) * 0.22;
        col += LED * (core + halo + flare) * exp(-zc * 0.0045) * 1.25;
      }
    }
  }

  // Габариты машин впереди.
  for (int c = 0; c < 2; c++) {
    float fc = float(c);
    float cz = uZ + 75.0 + fc * 95.0 + sin(uTime * (0.05 + fc * 0.03) + fc * 2.0) * 22.0;
    float cx = fc < 0.5 ? 3.75 : -0.1;
    for (int k = 0; k < 2; k++) {
      float kx = k == 0 ? -0.72 : 0.72;
      vec3 dl = vec3(cx + kx, 0.85, cz) - ro;
      float zc = dot(dl, fw);
      if (zc > 2.0) {
        vec2 q = vec2(dot(dl, rt), dot(dl, up)) / zc - pix;
        float r = 0.16 / zc;
        float r2 = dot(q, q);
        float g = exp(-r2 / (r * r * 0.6)) + exp(-r2 / (r * r * 14.0)) * 0.12;
        col += TAIL * g * exp(-zc * 0.006) * 1.4;
        // отражение габарита
        vec3 dm = vec3(cx + kx, -0.85, cz) - ro;
        float zm = dot(dm, fw);
        vec2 qm = vec2(dot(dm, rt), dot(dm, up)) / zm - pix;
        col += TAIL * exp(-(qm.x * qm.x) / (r * r * 0.5)) * exp(-(qm.y * qm.y) / (0.0009 + 0.25 / (zm * zm))) * 0.35 * exp(-zm * 0.008);
      }
    }
  }

  // Плёнка: тональная кривая, зерно, виньетка.
  col = 1.0 - exp(-col * 1.4);
  col = pow(col, vec3(0.92));
  col += (hash21(gl_FragCoord.xy + fract(uTime * 7.0) * 113.0) - 0.5) * 0.028;
  col *= 1.0 - 0.34 * dot(uv * 0.95, uv * 0.95);
  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`;
