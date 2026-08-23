'use client'

import Link from 'next/link'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { contributionTitle, footerLinks, navLinks } from '@/lib/content'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return <>
    <motion.header className="contribution-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}>
      <Link href="/" className="header-logo" aria-label={contributionTitle}>contribution magazine.</Link>
      <nav className="desktop-nav" aria-label="Primary navigation">{navLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav>
      <div className="header-tools"><Link href="/magazines" aria-label="Browse magazines"><ShoppingBag size={16} /></Link><button type="button" aria-label="Open navigation" onClick={() => setOpen(true)}><Menu size={18} strokeWidth={1.5} /></button></div>
    </motion.header>
    <AnimatePresence>{open && <motion.div className="mobile-menu" role="dialog" aria-label="Mobile navigation" initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} transition={{ duration: .45, ease: [0.22, 1, 0.36, 1] }}><button type="button" className="close-menu" aria-label="Close navigation" onClick={() => setOpen(false)}><X /></button><p>{contributionTitle}</p><nav>{navLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}</nav></motion.div>}</AnimatePresence>
  </>
}

export function SiteFooter() {
  const showNewsletter =
    process.env.NEXT_PUBLIC_SHOW_NEWSLETTER !== "false";

  return (
    <footer className="contribution-footer">
      <div className="footer-inner">
        <div className="footer-social" aria-label="Social links">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>

        {showNewsletter && (
          <div className="footer-newsletter">
            <p>SIGN UP TO THE NEWSLETTER.</p>

            <form onSubmit={(e) => e.preventDefault()}>
              <label className="sr-only" htmlFor="footer-email">
                Email address
              </label>

              <div className="newsletter-form">
                <input
                  id="footer-email"
                  name="email"
                  required
                  type="email"
                  placeholder="your@email.address"
                  autoComplete="email"
                />

                <button type="submit">SUBSCRIBE</button>
              </div>
            </form>
          </div>
        )}

        <div
          className="footer-lockup"
          aria-label="Contribution Magazine"
        >
          <strong>contribution</strong>
          <strong>magazine</strong>
        </div>

        <small>© 2026, Contribution Magazine</small>
      </div>
    </footer>
  );
}

export function BackLink() { return <Link className="back-link" href="/">← contribution magazine</Link> }
