'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={reduced ? false : { opacity: 0 }} whileInView={reduced ? undefined : { opacity: 1 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.55, delay, ease }}>{children}</motion.div>
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={reduced ? false : 'hidden'} whileInView={reduced ? undefined : 'show'} viewport={{ once: true, amount: 0.08 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>{children}</motion.div>
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.75, ease } } }}>{children}</motion.div>
}

export function MotionImage({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={reduced ? false : { opacity: 0 }} whileInView={reduced ? undefined : { opacity: 1 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 1.1, ease }}>{children}</motion.div>
}

export const MotionLink = motion.a
export const MotionButton = motion.button
export const MotionHeader = motion.header
export const MotionFooter = motion.footer
export const MotionArticle = motion.article
export const MotionSection = motion.section
