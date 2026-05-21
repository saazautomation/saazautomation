"use client";

import { motion, useScroll, useTransform, type MotionStyle } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

type FloatLayerProps = {
  children: ReactNode;
  className?: string;
  style?: MotionStyle;
  yRange?: [number, number];
  floatAmount?: number;
  duration?: number;
};

export default function FloatLayer({
  children,
  className,
  style,
  yRange = [30, -30],
  floatAmount = 12,
  duration = 4.5,
}: FloatLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scrollY = useTransform(scrollYProgress, [0, 1], yRange);

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y: scrollY }}>
      <motion.div
        animate={{ y: [0, -floatAmount, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
