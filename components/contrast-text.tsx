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
  return (
    <span className="relative inline-block aria-live=polite {className}">
      <motion.span
        className="absolute inset-0 pointer-events-none block transition-colors duration-350"
        style={{
          color: tone === "light" ? "#ffffff" : "transparent",
          textShadow: tone === "light" ? "0 1px 12px rgba(0, 0, 0, 0.42)" : "none",
          opacity: tone === "light" ? 1 : 0,
        }}
        animate={{ opacity: tone === "light" ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.35 }}
        aria-hidden={tone !== "light"}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute inset-0 pointer-events-none block transition-colors duration-350"
        style={{
          color: tone === "dark" ? "#0b0b0d" : "transparent",
          textShadow: tone === "dark" ? "0 1px 12px rgba(255, 255, 255, 0.42)" : "none",
          opacity: tone === "dark" ? 1 : 0,
        }}
        animate={{ opacity: tone === "dark" ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.35 }}
        aria-hidden={tone !== "dark"}
      >
        {children}
      </motion.span>
    </span>
  );
}
