"use client";

import { useParams } from "next/navigation";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import {
  BackLink,
  SiteFooter,
  SiteHeader,
} from "@/components/site-chrome";

import {
  imageAlt,
  interviews,
  safeSlug,
} from "@/lib/content";

import { useInterview } from "@/hooks/use-content-query";

const ease = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/* Portrait                                                                    */
/* -------------------------------------------------------------------------- */

function InterviewPortrait({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["-3%", "5%"],
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [1, 1] : [1.02, 1.07],
  );

  return (
    <div
      ref={ref}
      className="
        relative
        mx-auto
        aspect-[4/5]
        w-full
        max-w-[880px]
        overflow-hidden
        bg-muted
        sm:aspect-[4/4.5]
        lg:aspect-[1.15/1]
      "
    >
      <motion.img
        src={src}
        alt={alt}
        style={{
          y,
          scale,
        }}
        initial={
          reduced
            ? false
            : {
                opacity: 0,
                scale: 1.08,
              }
        }
        animate={
          reduced
            ? undefined
            : {
                opacity: 1,
                scale: 1.02,
              }
        }
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          h-full
          w-full
          object-cover
        "
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function InterviewPage() {
  const { slug } = useParams<{ slug: string }>();

  const currentSlug = safeSlug(slug);

  const query = useInterview(currentSlug);

  const interview =
    query.data ||
    interviews.find(
      (item) => item.slug === currentSlug,
    );

  const reduced = useReducedMotion();

  /* ---------------------------------------------------------------------- */
  /* Loading                                                                 */
  /* ---------------------------------------------------------------------- */

  if (query.isLoading && !interview) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <SiteHeader />

        <div className="mx-auto flex min-h-[50vh] max-w-[1380px] items-center px-[5vw]">
          <motion.p
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
              duration: 0.5,
              ease,
            }}
            className="text-sm text-muted-foreground"
          >
            Loading interview…
          </motion.p>
        </div>

        <SiteFooter />
      </main>
    );
  }

  /* ---------------------------------------------------------------------- */
  /* Not found                                                               */
  /* ---------------------------------------------------------------------- */

  if (!interview) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <SiteHeader />

        <div className="mx-auto flex min-h-[60vh] max-w-[1380px] flex-col justify-center px-[5vw]">
          <p className="eyebrow mb-5">
            Contribution Magazine · 404
          </p>

          <h1
            className="
              mb-10
              text-[clamp(56px,9vw,120px)]
              leading-[0.8]
              tracking-[-0.09em]
            "
          >
            Interview not found.
          </h1>

          <BackLink />
        </div>

        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <SiteHeader />

      <article className="mx-auto w-full max-w-[1380px] px-[5vw] pb-24 pt-[90px] sm:pb-28 sm:pt-[120px] lg:pb-36 lg:pt-[145px]">
        {/* ---------------------------------------------------------------- */}
        {/* Back                                                               */}
        {/* ---------------------------------------------------------------- */}

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
            duration: 0.6,
            ease,
          }}
          className="mb-14 sm:mb-20"
        >
          <BackLink />
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* Interview header                                                   */}
        {/* ---------------------------------------------------------------- */}

        <motion.header
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: 0.08,
                staggerChildren: 0.1,
              },
            },
          }}
          className="mb-14 sm:mb-20 lg:mb-24"
        >
          {/* Eyebrow */}
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: 15,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease,
                },
              },
            }}
            className="
              mb-7
              flex
              items-center
              gap-4
              text-[10px]
              uppercase
              tracking-[0.11em]
              text-muted-foreground
            "
          >
            <p className="eyebrow">
              Interview
            </p>

            <span className="h-px w-6 bg-border" />

            <p>{interview.role}</p>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={{
              hidden: {
                opacity: 0,
                y: 65,
                filter: "blur(8px)",
              },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            className="
              m-0
              max-w-[1200px]
              text-[clamp(60px,11vw,155px)]
              font-normal
              uppercase
              leading-[0.78]
              tracking-[-0.115em]
            "
          >
            {interview.name}
          </motion.h1>

          {/* Quote */}
          <motion.blockquote
            variants={{
              hidden: {
                opacity: 0,
                y: 30,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.75,
                  ease,
                },
              },
            }}
            className="
              m-0
              mt-9
              max-w-[780px]
              border-l
              border-foreground
              pl-5
              text-[clamp(22px,3.2vw,40px)]
              leading-[1.08]
              tracking-[-0.035em]
              sm:mt-12
              sm:pl-7
            "
          >
            “{interview.quote}”
          </motion.blockquote>
        </motion.header>

        {/* ---------------------------------------------------------------- */}
        {/* Portrait                                                           */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial={
            reduced
              ? false
              : {
                  opacity: 0,
                  y: 45,
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
            duration: 0.95,
            delay: 0.35,
            ease,
          }}
          className="mb-16 sm:mb-24 lg:mb-32"
        >
          <InterviewPortrait
            src={interview.image}
            alt={imageAlt(interview.name)}
          />
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* Body                                                               */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.08,
          }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="
            grid
            grid-cols-1
            gap-12
            lg:grid-cols-[minmax(160px,0.3fr)_minmax(0,0.7fr)]
            lg:gap-[8vw]
          "
        >
          {/* Side information */}
          <motion.aside
            variants={{
              hidden: {
                opacity: 0,
                y: 20,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease,
                },
              },
            }}
            className="hidden lg:block"
          >
            <div className="sticky top-[100px]">
              <p className="eyebrow">
                Conversation
              </p>

              <div className="mt-4 h-px w-10 bg-border" />

              <p className="mt-4 max-w-[150px] text-[10px] uppercase leading-[1.4] tracking-[0.1em] text-muted-foreground">
                Contribution Magazine
              </p>
            </div>
          </motion.aside>

          {/* Interview copy */}
          <div className="max-w-[720px]">
            {interview.body.map(
              (paragraph, index) => (
                <motion.p
                  key={`${paragraph}-${index}`}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 24,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.65,
                        ease,
                      },
                    },
                  }}
                  className={[
                    "text-[17px] leading-[1.65] text-foreground/90 sm:text-[19px] sm:leading-[1.65]",
                    index === 0
                      ? "first-letter:float-left first-letter:mr-2 first-letter:text-[4.5em] first-letter:font-normal first-letter:leading-[0.75] first-letter:tracking-[-0.05em]"
                      : "",
                    index <
                    interview.body.length - 1
                      ? "mb-7 sm:mb-8"
                      : "",
                  ].join(" ")}
                >
                  {paragraph}
                </motion.p>
              ),
            )}
          </div>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* End marker                                                         */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial={
            reduced
              ? false
              : {
                  opacity: 0,
                  scaleX: 0,
                }
          }
          whileInView={
            reduced
              ? undefined
              : {
                  opacity: 1,
                  scaleX: 1,
                }
          }
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.8,
            ease,
          }}
          className="
            mt-20
            origin-left
            border-t
            border-border
            pt-5
            sm:mt-28
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
            <span>End of conversation</span>
            <span>Contribution Magazine</span>
          </div>
        </motion.div>
      </article>

      <SiteFooter />
    </main>
  );
}