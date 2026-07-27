"use client";

import { useEffect } from "react";

const MOTION_SELECTOR = [
  ".reveal-up",
  ".surface-panel",
  ".surface-quiet",
  ".section-panel",
  ".section-card",
  ".section-frame",
  ".service-card",
  ".editorial-card",
  ".service-faq-shell",
].join(",");

export default function MotionObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      root.classList.remove("motion-enhanced");
      return;
    }

    root.classList.add("motion-enhanced");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px 0px 18% 0px",
        threshold: 0.04,
      },
    );

    const observedElements = new WeakSet<Element>();

    const observeElement = (element: Element) => {
      if (observedElements.has(element)) return;
      observedElements.add(element);
      observer.observe(element);
    };

    const observeAll = (scope: ParentNode = document) => {
      for (const element of Array.from(scope.querySelectorAll<HTMLElement>(MOTION_SELECTOR))) {
        observeElement(element);
      }
    };

    observeAll();

    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of Array.from(mutation.addedNodes)) {
          if (!(node instanceof HTMLElement)) continue;

          if (node.matches(MOTION_SELECTOR)) {
            observeElement(node);
          }

          observeAll(node);
        }
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      root.classList.remove("motion-enhanced");
    };
  }, []);

  return null;
}
