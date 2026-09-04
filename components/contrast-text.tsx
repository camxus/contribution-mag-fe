"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useImageContrast } from "@/hooks/use-image-contrast";

export function ContrastText({
  src,
  children,
  className = "",
}: {
  src: string;
  children: ReactNode;
  className?: string;
}) {
  const tone = useImageContrast(src);
  const reduced = useReducedMotion();

  const isReady = tone === "light" || tone === "dark";

  const duration = reduced ? 0 : 0.35;

  return (
    <span
      className={`relative inline-block ${className}`}
      aria-live="polite"
    >
      <motion.span
        className="absolute inset-0 block"
        style={{
          color: "#ffffff",
          textShadow: "0 1px 12px rgba(0, 0, 0, 0.42)",
        }}
        animate={{
          opacity: isReady && tone === "light" ? 1 : 0,
        }}
        transition={{
          duration,
          ease: [0.22, 1, 0.36, 1],
        }}
        aria-hidden={tone !== "light"}
      >
        {children}
      </motion.span>

      <motion.span
        className="absolute inset-0 block"
        style={{
          color: "#0b0b0d",
          textShadow: "0 1px 12px rgba(255, 255, 255, 0.42)",
        }}
        animate={{
          opacity: isReady && tone === "dark" ? 1 : 0,
        }}
        transition={{
          duration,
          ease: [0.22, 1, 0.36, 1],
        }}
        aria-hidden={tone !== "dark"}
      >
        {children}
      </motion.span>

      {/* Keeps the wrapper's natural dimensions */}
      <span className="invisible">{children}</span>
    </span>
  );
}
