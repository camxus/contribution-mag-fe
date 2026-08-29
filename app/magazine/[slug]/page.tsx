"use client";

import { useParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { imageAlt, magazines, safeSlug } from "@/lib/content";
import { useMagazine } from "@/hooks/use-content-query";

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(14px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

export default function MagazinePage() {
  const { slug } = useParams<{ slug: string }>();
  const safe = safeSlug(slug);
  const reducedMotion = useReducedMotion();

  const query = useMagazine(safe);
  const magazine =
    query.data || magazines.find((item) => item.slug === safe);

  if (query.isLoading && !magazine) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <SiteHeader />

        <div className="mx-auto max-w-[1380px] px-[5vw] py-16">
          <p className="text-sm text-muted-foreground">
            Loading issue…
          </p>
        </div>

        <SiteFooter />
      </main>
    );
  }

  if (!magazine) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <SiteHeader />

        <div className="mx-auto max-w-[1380px] px-[5vw] py-16">
          <p className="text-sm text-muted-foreground">
            Issue not found.
          </p>
        </div>

        <SiteFooter />
      </main>
    );
  }

  const buyLink =
    magazine.stripeBuyLinkPrint ||
    magazine.stripeBuyLinkDigital ||
    process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ||
    "#";

  const variants = reducedMotion
    ? {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.3,
        },
      },
    }
    : itemVariants;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <motion.article
        className="
          mx-auto
          w-full
          max-w-[1380px]
          px-[5vw]
          pb-20
          pt-[100px]
          sm:pb-24
          sm:pt-[130px]
          lg:pb-32
          lg:pt-[160px]
        "
        initial="hidden"
        animate="visible"
      >
        {/* Issue label */}
        <motion.div
          variants={variants}
          className="
            mb-8
            border-b
            border-border
            pb-4
            sm:mb-12
          "
        >
          <p className="eyebrow">
            {magazine.issue} · Print edition
          </p>
        </motion.div>

        {/* Main editorial layout */}
        <div
          className="
            grid
            grid-cols-1
            gap-12
            lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]
            lg:gap-20
            xl:gap-28
          "
        >
          {/* LEFT — Sticky image */}
          <div
            className="
              lg:sticky
              lg:top-24
              lg:self-start
              lg:h-fit
            "
          >
            <motion.div
              variants={variants}
              className="
                w-full
                max-w-[680px]
                overflow-hidden
              "
            >
              <img
                src={magazine.image}
                alt={imageAlt(magazine.title)}
                className="
                  block
                  h-auto
                  w-full
                  object-cover
                "
              />
            </motion.div>
          </div>

          {/* RIGHT — Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="
              flex
              max-w-[680px]
              flex-col
              items-start
              justify-center
              text-left
              lg:min-h-[100vh]
              lg:py-12
            "
          >
            {/* Title */}
            <motion.h1
              variants={variants}
              className="
                text-[clamp(48px,7vw,110px)]
                font-normal
                leading-[0.82]
                tracking-[-0.09em]
              "
            >
              {magazine.title}
            </motion.h1>

            {/* Price */}
            <motion.p
              variants={variants}
              className="
                mt-6
                text-[clamp(36px,5vw,72px)]
                font-normal
                leading-[1]
                tracking-[-0.04em]
              "
            >
              {magazine.price}
            </motion.p>

            {/* Description */}
            <motion.p
              variants={variants}
              className="
                mt-8
                max-w-[560px]
                text-[10px]
                uppercase
                leading-[1.5]
                tracking-[0.08em]
                text-muted-foreground
              "
            >
              {magazine.description}
            </motion.p>

            {/* Buy button */}
            <motion.div
              variants={variants}
              className="mt-10"
            >
              {magazine.soldOut ? (
                <p
                  className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.14em]
                    text-muted-foreground
                  "
                >
                  Sold Out
                </p>
              ) : (
                <a
                  href={buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center
                    border
                    border-foreground
                    px-5
                    py-3
                    text-[12px]
                    font-medium
                    uppercase
                    tracking-[0.12em]
                    transition-colors
                    duration-300
                    hover:bg-foreground
                    hover:text-background
                  "
                >
                  Buy now
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.article>

      <SiteFooter />
    </main>
  );
}
