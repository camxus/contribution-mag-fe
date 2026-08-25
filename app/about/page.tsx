"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  SiteFooter,
  SiteHeader,
} from "@/components/site-chrome";

import { useAbout } from "@/hooks/use-content-query";

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutPage() {
  const aboutQuery = useAbout();
  const reduced = useReducedMotion();

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <SiteHeader />

      <section className="mx-auto w-full max-w-[1380px] px-[5vw] pb-24 pt-[100px] sm:pb-28 sm:pt-[130px] lg:pb-36 lg:pt-[160px]">
        {/* ---------------------------------------------------------------- */}
        {/* Header                                                             */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial={
            reduced
              ? false
              : {
                  opacity: 0,
                  y: 30,
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
            duration: 0.8,
            ease,
          }}
        >
          <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
            <p className="eyebrow">
              Contribution Magazine · About Us
            </p>

            <span className="hidden text-[9px] uppercase tracking-[0.14em] text-muted-foreground sm:block">
              04 / About
            </span>
          </div>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* Title                                                              */}
        {/* ---------------------------------------------------------------- */}

        <motion.h1
          initial={
            reduced
              ? false
              : {
                  opacity: 0,
                  y: 70,
                  filter: "blur(8px)",
                }
          }
          animate={
            reduced
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }
          }
          transition={{
            duration: 1,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mb-10
            mt-0
            text-[clamp(68px,14vw,190px)]
            font-normal
            uppercase
            leading-[0.78]
            tracking-[-0.12em]
          "
        >
          About Us
        </motion.h1>

        {/* ---------------------------------------------------------------- */}
        {/* Intro / manifesto                                                  */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid grid-cols-1 gap-12 border-b border-border pb-16 lg:grid-cols-[0.3fr_0.7fr] lg:gap-[8vw] lg:pb-24">
          {/* Label */}
          <motion.div
            initial={
              reduced
                ? false
                : {
                    opacity: 0,
                    x: -15,
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
              duration: 0.65,
              delay: 0.3,
              ease,
            }}
          >
            <p className="eyebrow">
              Our Story
            </p>

            <div className="mt-5 hidden h-px w-10 bg-border lg:block" />
          </motion.div>

          {/* Content */}
          {aboutQuery.isLoading ? (
            <motion.p
              initial={reduced ? false : { opacity: 0 }}
              animate={
                reduced
                  ? undefined
                  : { opacity: 1 }
              }
              transition={{ duration: 0.5 }}
              className="text-sm text-muted-foreground"
            >
              Loading about information...
            </motion.p>
          ) : aboutQuery.error ? (
            <motion.p
              initial={reduced ? false : { opacity: 0 }}
              animate={
                reduced
                  ? undefined
                  : { opacity: 1 }
              }
              transition={{ duration: 0.5 }}
              className="text-destructive"
            >
              Unable to load about information.
            </motion.p>
          ) : (
            <motion.div
              initial={
                reduced
                  ? false
                  : {
                      opacity: 0,
                      y: 35,
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
                duration: 0.8,
                delay: 0.35,
                ease,
              }}
              className="
                about-content
                max-w-[760px]
                text-[clamp(20px,2.6vw,34px)]
                leading-[1.12]
                tracking-[-0.025em]
                text-foreground/85
              "
              dangerouslySetInnerHTML={{
                __html:
                  aboutQuery.data?.content_html ||
                  "",
              }}
            />
          )}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Contact                                                            */}
        {/* ---------------------------------------------------------------- */}

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="pt-20 sm:pt-28 lg:pt-32"
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.3fr_0.7fr] lg:gap-[8vw]">
            {/* Contact label */}
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -15,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.65,
                    ease,
                  },
                },
              }}
            >
              <p className="eyebrow">
                Get In Touch
              </p>

              <div className="mt-5 hidden h-px w-10 bg-border lg:block" />
            </motion.div>

            {/* Contact content */}
            <div>
              <motion.h2
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 40,
                    filter: "blur(6px)",
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                className="
                  m-0
                  text-[clamp(54px,8vw,110px)]
                  font-normal
                  leading-[0.8]
                  tracking-[-0.09em]
                "
              >
                Contact Us
              </motion.h2>

              {aboutQuery.isLoading ? (
                <motion.p
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                      },
                    },
                  }}
                  className="mt-10 text-sm text-muted-foreground"
                >
                  Loading contact information...
                </motion.p>
              ) : aboutQuery.error ? (
                <motion.p
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                      },
                    },
                  }}
                  className="mt-10 text-destructive"
                >
                  Unable to load contact information.
                </motion.p>
              ) : aboutQuery.data?.email ? (
                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 25,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.7,
                        ease,
                      },
                    },
                  }}
                  className="
                    mt-10
                    flex
                    flex-col
                    gap-4
                    border-t
                    border-border
                    pt-7
                  "
                >
                  {/* Email */}
                  <a
                    href={`mailto:${aboutQuery.data.email}`}
                    className="
                      group
                      flex
                      w-fit
                      items-center
                      gap-3
                      text-[clamp(20px,2.5vw,30px)]
                      leading-none
                      tracking-[-0.03em]
                      transition-opacity
                      duration-300
                      hover:opacity-50
                    "
                  >
                    <span>
                      {aboutQuery.data.email}
                    </span>

                    <span
                      aria-hidden="true"
                      className="
                        text-sm
                        transition-transform
                        duration-300
                        group-hover:-translate-y-1
                        group-hover:translate-x-1
                      "
                    >
                      ↗
                    </span>
                  </a>

                  {/* Instagram */}
                  {aboutQuery.data.instagram && (
                    <a
                      href={`https://instagram.com/${aboutQuery.data.instagram.replace(
                        /^@/,
                        "",
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        group
                        flex
                        w-fit
                        items-center
                        gap-3
                        text-[clamp(20px,2.5vw,30px)]
                        leading-none
                        tracking-[-0.03em]
                        transition-opacity
                        duration-300
                        hover:opacity-50
                      "
                    >
                      <span>
                        Instagram: @
                        {aboutQuery.data.instagram.replace(
                          /^@/,
                          "",
                        )}
                      </span>

                      <span
                        aria-hidden="true"
                        className="
                          text-sm
                          transition-transform
                          duration-300
                          group-hover:-translate-y-1
                          group-hover:translate-x-1
                        "
                      >
                        ↗
                      </span>
                    </a>
                  )}
                </motion.div>
              ) : (
                <motion.p
                  variants={{
                    hidden: {
                      opacity: 0,
                    },
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                      },
                    },
                  }}
                  className="mt-10 text-sm text-muted-foreground"
                >
                  Contact information not available.
                </motion.p>
              )}
            </div>
          </div>
        </motion.section>

        {/* ---------------------------------------------------------------- */}
        {/* Closing statement                                                  */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial={
            reduced
              ? false
              : {
                  opacity: 0,
                  y: 30,
                  scaleX: 0.96,
                }
          }
          whileInView={
            reduced
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                  scaleX: 1,
                }
          }
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.9,
            ease,
          }}
          className="
            mt-24
            origin-left
            border-t
            border-border
            pt-5
            sm:mt-32
          "
        >
          <div className="
            flex
            items-center
            justify-between
            text-[9px]
            uppercase
            tracking-[0.12em]
            text-muted-foreground
          ">
            <span>Contribution Magazine</span>
          </div>
        </motion.div>
      </section>

      <SiteFooter />
    </main>
  );
}