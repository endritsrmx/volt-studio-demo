"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
}

/** Easing names mirroring the reference timing vocabulary */
export const EASE = {
  outExpo: "expo.out",
  outQuart: "quart.out",
  inOutQuart: "quart.inOut",
  outCirc: "circ.out",
  inOutCubic: "cubic.inOut",
} as const;

export { gsap, ScrollTrigger };
