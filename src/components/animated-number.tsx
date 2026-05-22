"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

function parseValue(value: string) {
  const match = value.match(/\d+/);
  return {
    number: match ? Number(match[0]) : 0,
    prefix: value.startsWith("+") ? "+" : "",
    suffix: value.endsWith("+") ? "+" : "",
  };
}

export function AnimatedNumber({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const parsed = parseValue(value);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 24, stiffness: 90 });
  const rounded = useTransform(spring, (latest) => `${parsed.prefix}${Math.round(latest)}${parsed.suffix}`);

  useEffect(() => {
    if (inView) {
      motionValue.set(parsed.number);
    }
  }, [inView, motionValue, parsed.number]);

  return <motion.span className={className} ref={ref}>{rounded}</motion.span>;
}

