"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Menu,
  ShoppingBag,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useState } from "react";

import {
  contributionTitle,
  footerLinks,
  navLinks,
  legalLinks,
} from "@/lib/content";
import { useSiteContact } from "@/hooks/use-content-query";

const ease = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/* Header                                                                      */
/* -------------------------------------------------------------------------- */

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  return (
    <>
      <motion.header
        className="
          sticky top-0 z-50
          flex min-h-[66px] items-center justify-between
          border-b border-border
          bg-white/90
          px-[18px] py-[12px]
          backdrop-blur-[14px]
          supports-[backdrop-filter]:bg-white/75
        "
        initial={
          reduced
            ? false
            : {
              opacity: 0,
              y: -10,
            }
        }
        animate={
          reduced
            ? undefined
            : {
              opacity: 1,
              y: 0,
            }
        }
        transition={{
          duration: 0.6,
          ease,
        }}
      >
        {/* ---------------------------------------------------------------- */}
        {/* Logo                                                              */}
        {/* ---------------------------------------------------------------- */}

        <Link
          href="/"
          aria-label={contributionTitle}
          className="
            relative z-10
            text-[21px]
            font-bold
            uppercase
            leading-none
            tracking-[-0.09em]
            transition-opacity
            duration-300
            hover:opacity-50
            sm:text-[24px]
          "
        >
          CONTRIBUTION MAGAZINE.
        </Link>

        {/* ---------------------------------------------------------------- */}
        {/* Desktop navigation                                                */}
        {/* ---------------------------------------------------------------- */}

        <nav
          className="
            absolute
            left-1/2
            hidden
            -translate-x-1/2
            items-center
            gap-6
            lg:flex
          "
          aria-label="Primary navigation"
        >
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={
                reduced
                  ? false
                  : {
                    opacity: 0,
                    y: -8,
                  }
              }
              animate={
                reduced
                  ? undefined
                  : {
                    opacity: 1,
                    y: 0,
                  }
              }
              transition={{
                duration: 0.45,
                delay: 0.12 + index * 0.045,
                ease,
              }}
            >
              <Link
                href={link.href}
                className="
                  group
                  relative
                  block
                  py-2
                  text-[10px]
                  uppercase
                  tracking-[0.08em]
                  transition-opacity
                  duration-300
                  hover:opacity-50
                "
              >
                {link.label}

                <span
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-px
                    w-0
                    bg-current
                    transition-[width]
                    duration-300
                    ease-out
                    group-hover:w-full
                  "
                />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* ---------------------------------------------------------------- */}
        {/* Actions                                                           */}
        {/* ---------------------------------------------------------------- */}

        <div className="relative z-10 flex items-center gap-4">
          <Link
            href="/magazine"
            aria-label="Browse magazine"
            className="
              group
              flex
              items-center
              gap-2
              transition-opacity
              duration-300
              hover:opacity-50
            "
          >
            <span className="hidden text-[9px] uppercase tracking-[0.08em] sm:block">
              Shop
            </span>

            <ShoppingBag
              size={16}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </Link>

          <button
            type="button"
            aria-label="Open navigation"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="
              border-0
              bg-transparent
              p-0
              text-inherit
              transition-opacity
              duration-300
              hover:opacity-50
            "
          >
            <Menu
              size={19}
              strokeWidth={1.5}
            />
          </button>
        </div>
      </motion.header>

      {/* ------------------------------------------------------------------ */}
      {/* Navigation overlay                                                  */}
      {/* ------------------------------------------------------------------ */}

      <AnimatePresence>
        {open && (
          <motion.div
            className="
              fixed
              inset-0
              z-[60]
              flex
              min-h-screen
              flex-col
              overflow-hidden
              bg-primary
              px-[20px]
              py-[18px]
              text-primary-foreground
              sm:px-[30px]
              sm:py-[24px]
            "
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            initial={
              reduced
                ? { opacity: 0 }
                : {
                  opacity: 0,
                  x: "100%",
                }
            }
            animate={
              reduced
                ? { opacity: 1 }
                : {
                  opacity: 1,
                  x: 0,
                }
            }
            exit={
              reduced
                ? { opacity: 0 }
                : {
                  opacity: 0,
                  x: "100%",
                }
            }
            transition={{
              duration: reduced ? 0.2 : 0.55,
              ease,
            }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between">
              <motion.div
                initial={
                  reduced
                    ? false
                    : {
                      opacity: 0,
                    }
                }
                animate={
                  reduced
                    ? undefined
                    : {
                      opacity: 1,
                    }
                }
                transition={{
                  delay: 0.2,
                  duration: 0.5,
                  ease,
                }}
              >
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.1em]
                    transition-opacity
                    hover:opacity-50
                  "
                >
                  {contributionTitle}
                </Link>
              </motion.div>

              <motion.button
                type="button"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
                initial={
                  reduced
                    ? false
                    : {
                      opacity: 0,
                      rotate: -20,
                    }
                }
                animate={
                  reduced
                    ? undefined
                    : {
                      opacity: 1,
                      rotate: 0,
                    }
                }
                transition={{
                  delay: 0.12,
                  duration: 0.5,
                  ease,
                }}
                whileHover={
                  reduced
                    ? undefined
                    : {
                      rotate: 90,
                    }
                }
                whileTap={
                  reduced
                    ? undefined
                    : {
                      scale: 0.9,
                    }
                }
                className="
                  border-0
                  bg-transparent
                  p-1
                  text-inherit
                "
              >
                <X
                  size={24}
                  strokeWidth={1.4}
                />
              </motion.button>
            </div>

            {/* Main navigation */}
            <nav
              className="
                mt-[11vh]
                flex
                flex-col
                gap-0
              "
              aria-label="Mobile navigation"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={
                    reduced
                      ? false
                      : {
                        opacity: 0,
                        x: 45,
                      }
                  }
                  animate={
                    reduced
                      ? undefined
                      : {
                        opacity: 1,
                        x: 0,
                      }
                  }
                  transition={{
                    delay: 0.18 + index * 0.06,
                    duration: 0.6,
                    ease,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="
                      group
                      flex
                      items-center
                      justify-between
                      border-b
                      border-primary-foreground/20
                      py-[11px]
                      text-[clamp(42px,11vw,88px)]
                      font-bold
                      uppercase
                      leading-[0.9]
                      tracking-[-0.1em]
                      transition-opacity
                      duration-300
                      hover:opacity-50
                    "
                  >
                    <span>{link.label}</span>

                    <ArrowUpRight
                      size={24}
                      strokeWidth={1.2}
                      className="
                        mr-1
                        opacity-0
                        transition-all
                        duration-300
                        group-hover:-translate-y-1
                        group-hover:translate-x-1
                        group-hover:opacity-100
                        sm:size-8
                      "
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom information */}
            <motion.div
              initial={
                reduced
                  ? false
                  : {
                    opacity: 0,
                    y: 15,
                  }
              }
              animate={
                reduced
                  ? undefined
                  : {
                    opacity: 1,
                    y: 0,
                  }
              }
              transition={{
                delay: 0.5,
                duration: 0.6,
                ease,
              }}
              className="
                mt-auto
                flex
                items-end
                justify-between
                gap-6
                pb-1
                text-[9px]
                uppercase
                tracking-[0.12em]
              "
            >
              <span>London · Lagos · New York</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Footer                                                                      */
/* -------------------------------------------------------------------------- */

export function SiteFooter() {
  const contactQuery = useSiteContact();
  const reduced = useReducedMotion();

  const showNewsletter =
    process.env.NEXT_PUBLIC_SHOW_NEWSLETTER !== "false";

  const socialLinks = [
    ...Object.entries(
      contactQuery.data?.social_links || {},
    ),
    ...(contactQuery.data?.instagram
      ? [
        [
          "Instagram",
          contactQuery.data.instagram,
        ] as [string, string],
      ]
      : []),
  ];

  const displayedSocialLinks =
    socialLinks.length > 0
      ? socialLinks
      : footerLinks.map(
        (link) =>
          [link.label, link.href] as [string, string],
      );

  const aboutUsLink: [string, string] = ["About Us", "/about"];
  const footerLinksWithAbout = [...displayedSocialLinks, aboutUsLink];

  return (
    <footer
      className="
        m-0
        w-full
        max-w-none
        border-t
        border-border
        px-[5vw]
        pt-12
        text-foreground
        sm:pt-16
      "
    >
      {/* Top */}
      <motion.div
        initial={
          reduced
            ? false
            : {
              opacity: 0,
              y: 25,
            }
        }
        whileInView={
          reduced
            ? undefined
            : {
              opacity: 1,
              y: 0,
            }
        }
        viewport={{
          once: true,
          amount: 0.1,
        }}
        transition={{
          duration: 0.8,
          ease,
        }}
      >
        <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left */}
          <div className="grid grid-cols-2 gap-8">
            {/* Social */}
            <div>
              <p className="eyebrow mb-6">
                Connect
              </p>

              <nav
                className="flex flex-col gap-3 text-sm leading-tight"
                aria-label="Social links"
              >
                {footerLinksWithAbout.map(([label, href], index) => {
                  const isExternal = href.startsWith("http");

                  const motionProps = {
                    initial: reduced
                      ? false
                      : {
                        opacity: 0,
                        x: -8,
                      },
                    whileInView: reduced
                      ? undefined
                      : {
                        opacity: 1,
                        x: 0,
                      },
                    viewport: {
                      once: true,
                      amount: 0.2,
                    },
                    transition: {
                      delay: index * 0.04,
                      duration: 0.4,
                      ease,
                    },
                  };

                  const className = `
    group
    flex
    w-fit
    items-center
    gap-2
    leading-none
    transition-opacity
    duration-300
    hover:opacity-50
  `;

                  const content = (
                    <>
                      <span>{label}</span>

                      <ArrowUpRight
                        aria-hidden="true"
                        size={12}
                        strokeWidth={1.4}
                        className="
          shrink-0
          translate-x-[-2px]
          translate-y-[2px]
          opacity-0
          transition-all
          duration-300
          group-hover:translate-x-0
          group-hover:translate-y-0
          group-hover:opacity-100
        "
                      />
                    </>
                  );

                  return isExternal ? (
                    <motion.a
                      key={`${label}-${href}`}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                      {...motionProps}
                    >
                      {content}
                    </motion.a>
                  ) : (
                    <motion.div key={`${label}-${href}`} {...motionProps}>
                      <Link href={href} className={className}>
                        {content}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* Information */}
            <div>
              <p className="eyebrow mb-6">
                Information
              </p>

              <div className="flex flex-col gap-3 text-sm leading-tight">
                {contactQuery.data?.email && (
                  <a
                    href={`mailto:${contactQuery.data.email}`}
                    className="
                      w-fit
                      transition-opacity
                      duration-300
                      hover:opacity-50
                    "
                  >
                    {contactQuery.data.email}
                  </a>
                )}

                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="
                      w-fit
                      transition-opacity
                      duration-300
                      hover:opacity-50
                    "
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter */}
          {showNewsletter && (
            <div
              className="
                border-t
                border-border
                pt-10
                lg:border-l
                lg:border-t-0
                lg:pl-10
                lg:pt-0
              "
            >
              <p className="eyebrow mb-7">
                Newsletter
              </p>

              <div className="flex flex-col gap-8">
                <p className="
                  m-0
                  max-w-[500px]
                  text-[clamp(26px,3vw,42px)]
                  leading-[0.95]
                  tracking-[-0.045em]
                ">
                  SIGN UP TO THE NEWSLETTER.
                </p>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="w-full"
                >
                  <label
                    className="sr-only"
                    htmlFor="footer-email"
                  >
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
                        min-w-0
                        flex-1
                        border
                        border-border
                        bg-transparent
                        px-4
                        py-4
                        text-sm
                        outline-none
                        placeholder:text-muted-foreground
                        transition-colors
                        duration-300
                        focus:border-foreground
                        sm:px-6
                        sm:py-5
                      "
                    />

                    <motion.button
                      type="submit"
                      whileHover={
                        reduced
                          ? undefined
                          : {
                            opacity: 0.8,
                          }
                      }
                      whileTap={
                        reduced
                          ? undefined
                          : {
                            scale: 0.98,
                          }
                      }
                      className="
                        shrink-0
                        border
                        border-l-0
                        border-border
                        bg-primary
                        px-5
                        py-4
                        text-[10px]
                        uppercase
                        tracking-[0.08em]
                        text-primary-foreground
                        sm:px-8
                        sm:py-5
                        sm:text-sm
                      "
                    >
                      Subscribe
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Wordmark */}
      <div className="mt-20 w-full overflow-hidden sm:mt-24 lg:mt-28">
        <motion.div
          initial={
            reduced
              ? false
              : {
                opacity: 0,
                y: 70,
              }
          }
          whileInView={
            reduced
              ? undefined
              : {
                opacity: 1,
                y: 0,
              }
          }
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            flex
            w-full
            flex-col
            overflow-hidden
            text-left
            text-[clamp(4rem,10.5vw,11rem)]
            font-bold
            leading-[0.76]
            tracking-[-0.065em]
          "
          aria-label="Contribution Magazine"
        >
          <motion.strong
            className="block whitespace-nowrap font-bold"
            whileHover={
              reduced
                ? undefined
                : {
                  x: 8,
                }
            }
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 25,
            }}
          >
            Contribution
          </motion.strong>

          <motion.strong
            className="block whitespace-nowrap font-bold"
            whileHover={
              reduced
                ? undefined
                : {
                  x: -8,
                }
            }
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 25,
            }}
          >
            Magazine
          </motion.strong>
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="
        mt-6
        flex
        w-full
        flex-col
        justify-between
        gap-2
        border-t
        border-border
        py-5
        sm:flex-row
        sm:items-center
      ">
        <small className="
          text-[10px]
          uppercase
          tracking-[0.08em]
          text-muted-foreground
        ">
          © 2026, Contribution Magazine
        </small>

        {/* <small className="
          text-[10px]
          uppercase
          tracking-[0.08em]
          text-muted-foreground
        ">
          London · Lagos · New York
        </small> */}
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/* Back link                                                                   */
/* -------------------------------------------------------------------------- */

export function BackLink() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={
        reduced
          ? false
          : {
            opacity: 0,
            x: -10,
          }
      }
      animate={
        reduced
          ? undefined
          : {
            opacity: 1,
            x: 0,
          }
      }
      transition={{
        duration: 0.5,
        ease,
      }}
    >
      <Link
        href="/"
        className="
          group
          mb-[70px]
          inline-flex
          items-center
          gap-2
          text-[11px]
          uppercase
          tracking-[0.04em]
          text-muted-foreground
          transition-colors
          duration-300
          hover:text-foreground
        "
      >
        <ArrowLeft
          size={13}
          strokeWidth={1.4}
          className="
            transition-transform
            duration-300
            group-hover:-translate-x-1
          "
        />

        Contribution Magazine
      </Link>
    </motion.div>
  );
}