"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22, filter: "blur(8px)" }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay, duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.22 }}
    >
      {children}
    </motion.div>
  );
}

type ParallaxImageProps = {
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes: string;
  src: string;
};

export function ParallaxImage({
  alt,
  className,
  imgClassName,
  priority = false,
  sizes,
  src,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-18, 18]);
  const scale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1.04, 1.1]);

  return (
    <div className={className} ref={ref}>
      <motion.div className="absolute inset-0" style={{ scale, y }}>
        <Image
          alt={alt}
          className={imgClassName}
          fill
          priority={priority}
          sizes={sizes}
          src={src}
        />
      </motion.div>
    </div>
  );
}

export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = reduceMotion ? 0 : scrollYProgress;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-[#3f9108]"
      style={{ scaleX }}
    />
  );
}
