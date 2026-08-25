"use client";

import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  contributionTitle,
  footerLinks,
  navLinks,
  legalLinks,
} from "@/lib/content";
import { useSiteContact } from "@/hooks/use-content-query";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.header
        className="sticky top-0 z-30 flex items-center justify-between min-h-[66px] px-[18px] py-[12px] border-b border-border bg-white/94 backdrop-blur-[12px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          href="/"
          className="text-[24px] font-bold tracking-[-0.09em]"
          aria-label={contributionTitle}
        >
          CONTRIBUTION MAGAZINE.
        </Link>
        <nav
          className="absolute left-1/2 flex gap-[24px] -translate-x-1/2 text-[10px] tracking-[0.08em]"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-[17px]">
          <Link href="/magazine" aria-label="Browse magazine">
            <ShoppingBag size={16} />
          </Link>
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
            className="border-0 bg-transparent text-inherit p-0"
          >
            <Menu size={18} strokeWidth={1.5} />
          </button>
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-60 flex flex-col gap-[70px] p-[25px] bg-primary text-primary-foreground"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              className="self-end border-0 bg-transparent text-inherit"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
            >
              <X />
            </button>
            <p className="mt-[10vh] text-[13px]">{contributionTitle}</p>
            <nav className="mt-[22px] flex flex-col gap-[12px] text-[clamp(42px,12vw,90px)] font-bold tracking-[-0.1em]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function SiteFooter() {
  const contactQuery = useSiteContact();
  const showNewsletter = process.env.NEXT_PUBLIC_SHOW_NEWSLETTER !== "false";

  const socialLinks = [
    ...Object.entries(contactQuery.data?.social_links || {}),
    ...(contactQuery.data?.instagram
      ? [["Instagram", contactQuery.data.instagram] as [string, string]]
      : []),
  ];

  const displayedSocialLinks =
    socialLinks.length > 0
      ? socialLinks
      : footerLinks.map((link) => [link.label, link.href] as [string, string]);

  return (
    <footer className="!m-0 !w-full !max-w-none !border-t !border-border px-[4vw] pt-12 text-foreground">
      {/* Top footer */}
      <div className="w-full">
        <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT */}
          <div className="grid grid-cols-2 gap-8">
            {/* Social */}
            <div>
              <nav
                className="flex flex-col gap-3 text-sm leading-tight"
                aria-label="Social links"
              >
                {displayedSocialLinks.map(([label, href]) => (
                  <a
                    key={`${label}-${href}`}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit transition-opacity hover:opacity-50"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Legal / Contact */}
            <div>
              <div className="flex flex-col gap-3 text-sm leading-tight">
                {contactQuery.data?.email && (
                  <a
                    href={`mailto:${contactQuery.data.email}`}
                    className="w-fit transition-opacity hover:opacity-50"
                  >
                    {contactQuery.data.email}
                  </a>
                )}

                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="w-fit transition-opacity hover:opacity-50"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Newsletter */}
          {showNewsletter && (
            <div className="border-t border-border pt-10 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div className="flex flex-col gap-8">
                <p className="m-0 text-sm leading-none">
                  SIGN UP TO THE NEWSLETTER.
                </p>

                <form onSubmit={(e) => e.preventDefault()} className="w-full">
                  <label className="sr-only" htmlFor="footer-email">
                    Email address
                  </label>

                  <div className="flex w-full">
                    <input
                      id="footer-email"
                      name="email"
                      required
                      type="email"
                      placeholder="your@email.address"
                      autoComplete="email"
                      className="
              min-w-0 flex-1
              border border-border
              bg-transparent
              px-6 py-5
              text-sm
              outline-none
              placeholder:text-muted-foreground
              focus:border-foreground
            "
                    />

                    <button
                      type="submit"
                      className="
              shrink-0
              border border-l-0 border-border
              bg-primary
              px-8 py-5
              text-sm
              text-primary-foreground
              transition-opacity
              hover:opacity-80
            "
                    >
                      SUBSCRIBE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Wordmark */}
      <div className="!m-0 !mt-16 !w-full !max-w-none overflow-hidden">
        <div
          className="
            !m-0
            !flex
            !w-full
            !max-w-none
            !flex-col
            !overflow-hidden
            !text-left
            !text-[clamp(4rem,10.5vw,11rem)]
            !font-bold
            !leading-[0.78]
            !tracking-[-0.065em]
          "
          aria-label="Contribution Magazine"
        >
          <strong className="!m-0 !block !whitespace-nowrap !font-bold">
            Contribution
          </strong>

          <strong className="!m-0 !block !whitespace-nowrap !font-bold">
            Magazine
          </strong>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex w-full justify-between border-t border-border py-5">
        <small className="text-xs text-muted-foreground">
          © 2026, Contribution Magazine
        </small>
      </div>
    </footer>
  );
}

export function BackLink() {
  return (
    <Link className="inline-block mb-[70px] text-muted-foreground text-[11px]" href="/">
      ← contribution magazine
    </Link>
  );
}