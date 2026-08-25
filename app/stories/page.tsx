"use client";

import { motion, useReducedMotion } from "framer-motion";

import { StoryList } from "@/components/collection-list";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { stories, noStoriesLabel } from "@/lib/content";
import { useStories } from "@/hooks/use-content-query";

const revealEase = [0.22, 1, 0.36, 1] as const;

export default function StoriesPage() {
  const query = useStories();
  const items = query.data || stories;
  const reduced = useReducedMotion();

  const showNoStories = query.data?.length === 0;

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <SiteHeader />

      <section className="mx-auto w-full max-w-[1380px] px-[5vw] pb-20 pt-[100px] sm:pb-24 sm:pt-[130px] lg:pb-32 lg:pt-[160px]">
        {/* Header */}
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
            ease: revealEase,
          }}
        >
          <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
            <p className="eyebrow">
              Contribution Magazine · Archive
            </p>

            <span className="hidden text-[9px] uppercase tracking-[0.14em] text-muted-foreground sm:block">
              01 / Stories
            </span>
          </div>
        </motion.div>

        {/* Title */}
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
            delay: 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-6 mt-0 text-[clamp(72px,14vw,190px)] font-normal uppercase leading-[0.78] tracking-[-0.12em]"
        >
          Stories
        </motion.h1>

        {/* Intro */}
        <motion.div
          initial={
            reduced
              ? false
              : {
                  opacity: 0,
                  y: 25,
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
            duration: 0.75,
            delay: 0.3,
            ease: revealEase,
          }}
          className="mb-16 flex flex-col gap-8 border-b border-border pb-10 sm:mb-20 sm:pb-12 lg:flex-row lg:items-end lg:justify-between"
        >
          <p className="max-w-[650px] text-[clamp(19px,2.4vw,30px)] leading-[1.12] tracking-[-0.025em] text-muted-foreground">
            Dispatches on culture, community, and the creative
            practices shaping what comes next.
          </p>

          <div className="flex shrink-0 items-center gap-3 text-[9px] uppercase tracking-[0.13em] text-muted-foreground">
            <span className="h-px w-8 bg-border" />
            <span>{items.length} Stories</span>
          </div>
        </motion.div>

        {/* Collection */}
        {query.isLoading ? (
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-10 text-sm text-muted-foreground"
          >
            Loading stories…
          </motion.div>
        ) : showNoStories ? (
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-10 text-sm text-muted-foreground"
          >
            {noStoriesLabel}
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.05,
            }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            <motion.div
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
                    ease: revealEase,
                  },
                },
              }}
            >
              <StoryList items={items} />
            </motion.div>
          </motion.div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}