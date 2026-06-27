import { useEffect } from "react";
import Lenis from "lenis";

interface SmoothScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  wheelMultiplier?: number;
  touchMultiplier?: number;
}

export function useSmoothScroll(options: SmoothScrollOptions = {}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: options.duration ?? 1.2,
      easing: options.easing ?? ((t) => Math.min(1, 1.001 - 2.71828 ** (-10 * t))),
      wheelMultiplier: options.wheelMultiplier ?? 1,
      touchMultiplier: options.touchMultiplier ?? 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [options.duration, options.easing, options.wheelMultiplier, options.touchMultiplier]);
}
