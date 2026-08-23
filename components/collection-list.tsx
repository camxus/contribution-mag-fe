'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { imageAlt, interviewPath, magazinePath, storyPath, type Interview, type Magazine, type Story } from '@/lib/content'
import { ContrastText } from '@/components/contrast-text'

const ease = [0.22, 1, 0.36, 1] as const

function ListRow({ href, eyebrow, title, description, image, contrastAware = false }: { href: string; eyebrow: string; title: string; description: string; image: string; contrastAware?: boolean }) {
  const reduced = useReducedMotion()
  return <motion.li variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7, ease } } }} whileHover={reduced ? undefined : { opacity: 0.78 }}>
    <Link href={href} className="collection-row">
      <span className="collection-row-image"><img src={image} alt={imageAlt(title)} /></span>
      <span className={`collection-row-copy ${contrastAware ? 'cover-copy' : ''}`}>{contrastAware ? <ContrastText src={image}><span className="cover-copy-content"><span className="eyebrow">{eyebrow}</span><strong>{title}</strong><span>{description}</span></span></ContrastText> : <><span className="eyebrow">{eyebrow}</span><strong>{title}</strong><span>{description}</span></>}</span>
      <ArrowUpRight aria-hidden="true" className="collection-row-icon" size={22} strokeWidth={1.5} />
    </Link>
  </motion.li>
}

function AnimatedList({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  return <motion.ul className="collection-list" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18, margin: '0px 0px -8% 0px' }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : 0.12 } } }}>{children}</motion.ul>
}

export function StoryList({ items }: { items: Story[] }) {
  return <AnimatedList>{items.map((item) => <ListRow key={item.slug} href={storyPath(item.slug)} eyebrow={`${item.category} · ${item.date}`} title={item.title} description={item.dek} image={item.image} />)}</AnimatedList>
}

export function InterviewList({ items }: { items: Interview[] }) {
  return <AnimatedList>{items.map((item) => <ListRow key={item.slug} href={interviewPath(item.slug)} eyebrow={item.role} title={item.name} description={`“${item.quote}”`} image={item.image} />)}</AnimatedList>
}

export function MagazineList({ items }: { items: Magazine[] }) {
  return <AnimatedList>{items.map((item) => <ListRow key={item.slug} href={magazinePath(item.slug)} eyebrow={item.issue} title={item.title} description={`${item.price} · ${item.description}`} image={item.image} contrastAware />)}</AnimatedList>
}
