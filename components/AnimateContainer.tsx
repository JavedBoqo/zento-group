"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade"
  | "scale-up"
  | "stagger";

interface AnimateContainerProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  viewportOnce?: boolean;
  viewportMargin?: string;
  staggerDelay?: number;
}

const getVariants = (animation: AnimationType, distance = 24): Variants => {
  switch (animation) {
    case "fade-up":
      return {
        hidden: { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0 },
      };
    case "fade-down":
      return {
        hidden: { opacity: 0, y: -distance },
        visible: { opacity: 1, y: 0 },
      };
    case "fade-left":
      return {
        hidden: { opacity: 0, x: -distance },
        visible: { opacity: 1, x: 0 },
      };
    case "fade-right":
      return {
        hidden: { opacity: 0, x: distance },
        visible: { opacity: 1, x: 0 },
      };
    case "scale-up":
      return {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
      };
    case "stagger":
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };
    case "fade":
    default:
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };
  }
};

export default function AnimateContainer({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.5,
  className = "",
  viewportOnce = true,
  viewportMargin = "-50px",
  staggerDelay = 0.08,
  ...rest
}: AnimateContainerProps) {
  const baseVariants = getVariants(animation);

  const containerVariants: Variants =
    animation === "stagger"
      ? {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        }
      : {
          hidden: baseVariants.hidden,
          visible: {
            ...baseVariants.visible,
            transition: {
              duration,
              delay,
              ease: [0.21, 0.47, 0.32, 0.98],
            },
          },
        };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: viewportOnce, margin: viewportMargin }}
      variants={containerVariants}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Child item helper for use inside AnimateContainer with animation="stagger"
 */
export function AnimateItem({
  children,
  className = "",
  distance = 20,
  duration = 0.45,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
}) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
