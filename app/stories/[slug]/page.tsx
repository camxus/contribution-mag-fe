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

import { imageAlt, safeSlug, stories } from "@/lib/content";
import { useStory } from "@/hooks/use-content-query";

const ease = [0.22, 1, 0.36, 1] as const;

function StoryHeroImage({
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
    offset: ["start start", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["0%", "10%"],
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [1, 1] : [1.02, 1.08],
  );

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] overflow-hidden bg-muted sm:aspect-[16/9] lg:aspect-[1.85/1]"
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
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
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export default function StoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const currentSlug = safeSlug(slug);

  const query = useStory(currentSlug);

  const story =
    query.data ||
    stories.find((item) => item.slug === currentSlug);

  const reduced = useReducedMotion();

  /* ---------------------------------------------------------------------- */
  /* Loading                                                                 */
  /* ---------------------------------------------------------------------- */

  if (query.isLoading && !story) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <SiteHeader />

        <div className="mx-auto flex min-h-[50vh] max-w-[1380px] items-center px-[5vw] py-20">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 15 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease,
            }}
            className="text-sm text-muted-foreground"
          >
            Loading story…
          </motion.p>
        </div>

        <SiteFooter />
      </main>
    );
  }

  /* ---------------------------------------------------------------------- */
  /* Not found                                                               */
  /* ---------------------------------------------------------------------- */

  if (!story) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <SiteHeader />

        <div className="mx-auto flex min-h-[60vh] max-w-[1380px] flex-col justify-center px-[5vw]">
          <p className="eyebrow mb-5">
            Contribution Magazine · 404
          </p>

          <h1 className="text-[clamp(56px,9vw,120px)] leading-[0.8] tracking-[-0.09em]">
            Story not found.
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
        {/* Header                                                             */}
        {/* ---------------------------------------------------------------- */}

        <motion.header
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: 0.1,
                staggerChildren: 0.1,
              },
            },
          }}
          className="mb-12 max-w-[1100px] sm:mb-16 lg:mb-20"
        >
          {/* Meta */}
          <motion.div
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
            className="mb-7 flex flex-col gap-2 text-[10px] uppercase tracking-[0.1em] text-muted-foreground sm:flex-row sm:items-center sm:gap-4"
          >
            <p className="eyebrow">
              {story.category}
            </p>

            <span className="hidden h-px w-5 bg-border sm:block" />

            <p>{story.date}</p>

            <span className="hidden h-px w-5 bg-border sm:block" />

            <p>By {story.author}</p>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={{
              hidden: {
                opacity: 0,
                y: 60,
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
              max-w-[1150px]
              text-[clamp(54px,9vw,128px)]
              font-normal
              uppercase
              leading-[0.79]
              tracking-[-0.105em]
            "
          >
            {story.title}
          </motion.h1>

          {/* Dek */}
          <motion.p
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
              mt-8
              max-w-[720px]
              text-[clamp(19px,2.5vw,30px)]
              leading-[1.12]
              tracking-[-0.025em]
              text-muted-foreground
              sm:mt-10
            "
          >
            {story.dek}
          </motion.p>
        </motion.header>

        {/* ---------------------------------------------------------------- */}
        {/* Hero image                                                         */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial={
            reduced
              ? false
              : {
                  opacity: 0,
                  y: 40,
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
            duration: 0.9,
            delay: 0.35,
            ease,
          }}
          className="mb-16 sm:mb-20 lg:mb-28"
        >
          <StoryHeroImage
            src={story.image}
            alt={imageAlt(story.title)}
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
          className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(160px,0.3fr)_minmax(0,0.7fr)] lg:gap-[8vw]"
        >
          {/* Article label */}
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
                {story.category}
              </p>

              <div className="mt-4 h-px w-10 bg-border" />

              <p className="mt-4 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                Contribution Magazine
              </p>
            </div>
          </motion.aside>

          {/* Article copy */}
          <div className="max-w-[720px]">
            {story.body.map((paragraph, index) => (
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
                    ? "first-letter:text-[4.5em] first-letter:font-normal first-letter:leading-[0.75] first-letter:tracking-[-0.05em] first-letter:float-left first-letter:mr-2"
                    : "",
                  index < story.body.length - 1
                    ? "mb-7 sm:mb-8"
                    : "",
                ].join(" ")}
              >
                {paragraph}
              </motion.p>
            ))}
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
          className="mt-20 origin-left border-t border-border pt-5 sm:mt-28"
        >
          <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
            <span>End of story</span>
            <span>Contribution Magazine</span>
          </div>
        </motion.div>
      </article>

      <SiteFooter />
    </main>
  );
}