'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useImageContrast } from '@/hooks/use-image-contrast'

export function ContrastText({ src, children, className = '' }: { src: string; children: ReactNode; className?: string }) {
  const tone = useImageContrast(src)
  const reduced = useReducedMotion()
  return <span className={`contrast-text ${className}`} aria-live="polite">
    <motion.span className="contrast-text-layer contrast-text-light" animate={{ opacity: tone === 'light' ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.35 }} aria-hidden={tone !== 'light'}>{children}</motion.span>
    <motion.span className="contrast-text-layer contrast-text-dark" animate={{ opacity: tone === 'dark' ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.35 }} aria-hidden={tone !== 'dark'}>{children}</motion.span>
  </span>
}
