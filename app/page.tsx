"use client";

import Link from "next/link";
import { ArrowUpRight, Volume, VolumeX } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { StoryList, InterviewList } from "@/components/collection-list";
import { ContrastText } from "@/components/contrast-text";

import {
  useHero,
  useInterviews,
  useMagazines,
  useStories,
} from "@/hooks/use-content-query";

import {
  featuredInterview,
  imageAlt,
  magazinePath,
  magazines,
  newsletterLabel,
  stories,
  interviews,
  featuredStory,
  contributionTitle,
  noStoriesLabel,
  noInterviewsLabel,
  noIssuesLabel,
  viewIssueLabel,
} from "@/lib/content";

/* -------------------------------------------------------------------------- */
/* Motion helpers                                                             */
/* -------------------------------------------------------------------------- */

const revealEase = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/* Hero slideshow                                                             */
/* -------------------------------------------------------------------------- */
function HeroSlideshow({
  images,
  alt,
}: {
  images: { desktop: string | null; mobile: string | null }[];
  alt: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<number | null>(null);

  const AUTOPLAY_DURATION = 5000;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["0%", "16%"],
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [1, 1] : [1.04, 1.12],
  );

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setProgress(0);
  };

  // Auto progress
  useEffect(() => {
    if (reduced || images.length <= 1) return;

    const start = performance.now();

    const updateProgress = (now: number) => {
      const elapsed = now - start;
      const nextProgress = Math.min(elapsed / AUTOPLAY_DURATION, 1);

      setProgress(nextProgress);

      if (nextProgress < 1) {
        progressRef.current = requestAnimationFrame(updateProgress);
      }
    };

    progressRef.current = requestAnimationFrame(updateProgress);

    intervalRef.current = setTimeout(() => {
      nextSlide();
    }, AUTOPLAY_DURATION);

    return () => {
      if (progressRef.current !== null) {
        cancelAnimationFrame(progressRef.current);
      }

      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [currentIndex, images.length, reduced]);

  const currentImage = images[currentIndex];

  const desktopSrc = currentImage?.desktop ?? null;
  const mobileSrc = currentImage?.mobile ?? null;

  if (!desktopSrc && !mobileSrc) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
    >
      {/* Images */}
      <div className="absolute inset-0 z-0">
        {/* Desktop */}
        {desktopSrc && (
          <AnimatePresence mode="sync" initial={false}>
            <motion.img
              key={`desktop-${currentIndex}`}
              src={desktopSrc}
              alt={alt}
              onLoad={() => setIsLoading(false)}
              style={{ y, scale }}
              initial={{
                opacity: 0,
                scale: reduced ? 1 : 1.04,
              }}
              animate={{
                opacity: isLoading ? 0 : 1,
                scale: reduced ? 1 : 1.04,
              }}
              exit={{
                opacity: 0,
                scale: reduced ? 1 : 1.08,
              }}
              transition={{
                opacity: {
                  duration: reduced ? 0 : 1.2,
                  ease: [0.22, 1, 0.36, 1],
                },
                scale: {
                  duration: reduced ? 0 : 1.5,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
              className="
                absolute
                inset-0
                hidden
                h-full
                w-full
                object-cover
                object-center
                saturate-[0.72]
                md:block
              "
            />
          </AnimatePresence>
        )}

        {/* Mobile */}
        {mobileSrc && (
          <AnimatePresence mode="sync" initial={false}>
            <motion.img
              key={`mobile-${currentIndex}`}
              src={mobileSrc}
              alt={alt}
              onLoad={() => setIsLoading(false)}
              style={{ y, scale }}
              initial={{
                opacity: 0,
                scale: reduced ? 1 : 1.04,
              }}
              animate={{
                opacity: isLoading ? 0 : 1,
                scale: reduced ? 1 : 1.04,
              }}
              exit={{
                opacity: 0,
                scale: reduced ? 1 : 1.08,
              }}
              transition={{
                opacity: {
                  duration: reduced ? 0 : 1.2,
                  ease: [0.22, 1, 0.36, 1],
                },
                scale: {
                  duration: reduced ? 0 : 1.5,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
              className="
                absolute
                inset-0
                block
                h-full
                w-full
                object-cover
                object-center
                saturate-[0.72]
                md:hidden
              "
            />
          </AnimatePresence>
        )}
      </div>

      {/* Loading indicator */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="
              absolute
              inset-0
              z-20
              flex
              items-center
              justify-center
              pointer-events-none
            "
          >
            <div className="h-px w-24 overflow-hidden bg-white/20">
              <motion.div
                className="h-full w-1/2 bg-white"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Carousel indicators */}
      {images.length > 1 && (
        <div
          className="
            absolute
            bottom-6
            left-1/2
            z-30
            flex
            -translate-x-1/2
            items-center
            gap-2
          "
          role="tablist"
          aria-label="Hero images"
        >
          {images.map((_, index) => {
            const isActive = index === currentIndex;

            return (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to image ${index + 1}`}
                onClick={() => goToSlide(index)}
                className="
                  group
                  relative
                  h-1
                  w-10
                  overflow-hidden
                  rounded-full
                  bg-white/30
                  transition-all
                  duration-300
                  hover:bg-white/50
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-transparent
                "
              >
                <span
                  className="
                    absolute
                    inset-y-0
                    left-0
                    rounded-full
                    bg-white
                  "
                  style={{
                    width: isActive
                      ? `${progress * 100}%`
                      : index < currentIndex
                        ? "100%"
                        : "0%",
                    transition:
                      isActive && progress === 0
                        ? "none"
                        : "width 50ms linear",
                  }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero content                                                               */
/* -------------------------------------------------------------------------- */

function HeroContent({ src }: { src: string }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: 0.25,
            staggerChildren: 0.1,
          },
        },
      }}
      className="max-w-[1100px]"
    >
      <ContrastText src={src}>
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              y: 18,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.65,
                ease: revealEase,
              },
            },
          }}
          className="
          mb-4
          flex
          items-center
          gap-3
          text-[9px]
          uppercase
          tracking-[0.16em]
          sm:mb-5
          sm:text-[10px]
        "
        >
          <span className="h-px w-7 bg-current opacity-70 sm:w-10" />
          <span>Independent journal</span>
        </motion.div>

        <motion.h1
          variants={{
            hidden: {
              opacity: 0,
              y: 45,
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
          max-w-[1050px]
          text-[clamp(54px,10vw,148px)]
          font-bold
          uppercase
          leading-[0.76]
          tracking-[-0.105em]
        "
        >
          {contributionTitle}
        </motion.h1>
      </ContrastText>

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
              duration: 0.7,
              ease: revealEase,
            },
          },
        }}
        className="
          mt-6
          flex
          flex-col
          gap-5
          sm:mt-7
          sm:flex-row
          sm:items-end
          sm:justify-between
          lg:mt-8
        "
      >
        <p className="max-w-[360px] text-[15px] leading-[1.35] sm:text-[17px] lg:text-[18px]">
          Culture, community, and creative practice.
        </p>

        <div className="flex gap-2">
          <MagneticLink href="#stories">
            Explore stories
          </MagneticLink>

          <MagneticLink href="#magazine" inverted>
            Shop the issue
          </MagneticLink>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Video hero section (latest magazine issue)                                 */
/* -------------------------------------------------------------------------- */

function VideoHeroSection({
  magazine,
}: {
  magazine: typeof magazines[number];
}) {
  const [isMuted, setIsMuted] = useState(true);
  const reduced = useReducedMotion();

  const reveal = {
    hidden: {
      opacity: 0,
      y: 28,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
  };

  const videoReveal = {
    hidden: {
      opacity: 0,
      scale: reduced ? 1 : 1.06,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
  };

  if (!magazine.video_url) { return null }

  return (
    <section
      className="
        relative
        isolate
        min-h-[60vh]
        max-h-[700px]
        overflow-hidden
        bg-black
      "
      aria-label={`Latest issue: ${magazine.title}`}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Video                                                               */}
      {/* ------------------------------------------------------------------ */}

      <motion.video
        autoPlay
        loop
        muted={isMuted}
        playsInline
        poster={magazine.image}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={videoReveal}
        transition={{
          duration: reduced ? 0 : 1.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      >
        <source
          src={
            magazine.video_url
          }
          type="video/mp4"
        />
      </motion.video>

      {/* ------------------------------------------------------------------ */}
      {/* Cinematic overlays                                                  */}
      {/* ------------------------------------------------------------------ */}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: reduced ? 0 : 1.2,
          ease: revealEase,
        }}
        className="
          absolute
          inset-0
          bg-black/20
        "
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: reduced ? 0 : 1.6,
          delay: reduced ? 0 : 0.15,
          ease: revealEase,
        }}
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/90
          via-black/20
          to-black/10
        "
      />

      {/* Subtle bottom vignette */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-1/2
          bg-gradient-to-t
          from-black/30
          to-transparent
        "
      />

      {/* ------------------------------------------------------------------ */}
      {/* Content                                                             */}
      {/* ------------------------------------------------------------------ */}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.25,
        }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              delayChildren: reduced ? 0 : 0.35,
              staggerChildren: reduced ? 0 : 0.11,
            },
          },
        }}
        className="
          relative
          flex
          min-h-[60vh]
          max-h-[700px]
          flex-col
          items-start
          justify-end
          px-[5vw]
          pb-12
          sm:pb-14
          lg:pb-20
        "
      >
        <div className="w-full max-w-[1100px]">
          {/* Issue */}
          <motion.p
            variants={reveal}
            transition={{
              duration: reduced ? 0 : 0.7,
              ease: revealEase,
            }}
            className="
              mb-3
              text-[9px]
              uppercase
              tracking-[0.18em]
              text-white/70
              sm:text-[10px]
            "
          >
            {magazine.issue}
          </motion.p>

          {/* Title */}
          <motion.h2
            variants={reveal}
            transition={{
              duration: reduced ? 0 : 0.95,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              max-w-[1050px]
              text-[clamp(48px,8vw,120px)]
              font-bold
              uppercase
              leading-[0.78]
              tracking-[-0.095em]
              text-white
            "
          >
            {magazine.title}
          </motion.h2>

          {/* Meta / CTA */}
          <motion.div
            variants={reveal}
            transition={{
              duration: reduced ? 0 : 0.75,
              ease: revealEase,
            }}
            className="
              mt-6
              flex
              items-center
              gap-4
              sm:mt-7
            "
          >
            <MagneticLink
              href={magazinePath(magazine.slug)}
              inverted
            >
              {viewIssueLabel}
            </MagneticLink>

            <span
              className="
                text-[10px]
                uppercase
                tracking-[0.12em]
                text-white/60
              "
            >
              {magazine.price}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* Mute control                                                        */}
      {/* ------------------------------------------------------------------ */}

      <motion.button
        type="button"
        onClick={() => setIsMuted((prev) => !prev)}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        initial={
          reduced
            ? false
            : {
              opacity: 0,
              scale: 0.85,
              filter: "blur(6px)",
            }
        }
        whileInView={
          reduced
            ? undefined
            : {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }
        }
        viewport={{ once: true }}
        transition={{
          duration: reduced ? 0 : 0.6,
          delay: reduced ? 0 : 0.8,
          ease: revealEase,
        }}
        whileHover={
          reduced
            ? undefined
            : {
              scale: 1.08,
            }
        }
        whileTap={{
          scale: 0.94,
        }}
        className="
          absolute
          bottom-5
          right-5
          z-10
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          border
          border-white/30
          bg-black/30
          text-white
          backdrop-blur-sm
          transition-colors
          duration-300
          hover:border-white/60
          hover:bg-black/50
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-white
          focus-visible:ring-offset-2
          focus-visible:ring-offset-black
        "
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isMuted ? "muted" : "unmuted"}
            initial={{
              opacity: 0,
              scale: 0.7,
              rotate: -15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.7,
              rotate: 15,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            {isMuted ? (
              <VolumeX size={17} />
            ) : (
              <Volume size={17} />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </section>
  );
}


/* -------------------------------------------------------------------------- */
/* Fade up                                                                    */
/* -------------------------------------------------------------------------- */

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay,
        ease: revealEase,
      }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Arrow link                                                                 */
/* -------------------------------------------------------------------------- */

function AnimatedArrowLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        group
        inline-flex
        items-center
        gap-2
        text-[10px]
        uppercase
        tracking-[0.1em]
        text-muted-foreground
        transition-colors
        duration-300
        hover:text-foreground
      "
    >
      {children}

      <motion.span
        initial={{ x: 0, y: 0 }}
        whileHover={{ x: 3, y: -3 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
        }}
      >
        <ArrowUpRight aria-hidden="true" size={15} />
      </motion.span>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Magnetic link                                                              */
/* -------------------------------------------------------------------------- */

function MagneticLink({
  href,
  children,
  inverted = false,
}: {
  href: string;
  children: React.ReactNode;
  inverted?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 22,
      }}
    >
      <Link
        href={href}
        className={[
          "group inline-flex items-center gap-3 border px-4 py-3",
          "text-[10px] uppercase tracking-[0.12em]",
          "transition-colors duration-300",
          inverted
            ? "border-white bg-white/70 text-black hover:border-primary hover:bg-primary hover:text-white"
            : "border-white/80 bg-black/20 text-white backdrop-blur-sm hover:border-primary hover:bg-primary",
        ].join(" ")}
      >
        {children}

        <motion.span
          whileHover={{ x: 3, y: -3 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
        >
          <ArrowUpRight aria-hidden="true" size={14} />
        </motion.span>
      </Link>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section header                                                             */
/* -------------------------------------------------------------------------- */

function SectionHeader({
  number,
  title,
  description,
  href,
  action = "View all",
}: {
  number: string;
  title: string;
  description: string;
  href: string;
  action?: string;
}) {
  return (
    <FadeUp>
      <div className="mb-8 flex items-end justify-between gap-6 border-b border-border pb-4">
        <div>
          <p className="eyebrow">
            {number} · {title}
          </p>

          <p className="mt-2 hidden max-w-[380px] text-[12px] leading-[1.45] text-muted-foreground sm:block">
            {description}
          </p>
        </div>

        <AnimatedArrowLink href={href}>
          {action}
        </AnimatedArrowLink>
      </div>
    </FadeUp>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function Page() {
  const storiesQuery = useStories();
  const interviewsQuery = useInterviews();
  const magazinesQuery = useMagazines();
  const heroQuery = useHero();

  const pageStories = storiesQuery.data || stories;
  const pageInterviews = interviewsQuery.data || interviews;
  const pageMagazines = magazinesQuery.data || magazines;

  const showNoStories = storiesQuery.data?.length === 0;
  const showNoInterviews = interviewsQuery.data?.length === 0;
  const showNoMagazines = magazinesQuery.data?.length === 0;

  const pageFeaturedStory =
    pageStories[0] || featuredStory;

  const pageFeaturedInterview =
    pageInterviews[0] || featuredInterview;

  const pageMagazine =
    pageMagazines[0] || magazines[0];

  const hasHeroStories = pageStories.length > 0;

  const showNewsletter =
    process.env.NEXT_PUBLIC_SHOW_NEWSLETTER !== "false";

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <SiteHeader />

      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                */}
      {/* ------------------------------------------------------------------ */}

      <section
        className="
          relative
          isolate
          min-h-[min(86vh,900px)]
          overflow-hidden
          border-b
          border-white/15
        "
      >
        {/* Hero slideshow with latest article images */}
        <HeroSlideshow
          images={[
            ...(heroQuery.data?.hero_image_url_desktop ||
              heroQuery.data?.hero_image_url_mobile
              ? [
                {
                  desktop: heroQuery.data.hero_image_url_desktop ?? null,
                  mobile: heroQuery.data.hero_image_url_mobile ?? null,
                },
              ]
              : []),

            ...pageStories
              .slice(0, 5)
              .filter((story) => Boolean(story.image))
              .map((story) => ({
                desktop: story.image,
                mobile: story.image,
              })),
          ]}
          alt={imageAlt(pageFeaturedStory.title)}
        />

        {/* Contrast layers */}
        {pageStories.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1.2,
                ease: revealEase,
              }}
              className="
                absolute
                inset-0
                -z-10
                bg-gradient-to-t
                from-black/90
                via-black/25
                to-black/5
              "
            />

            <div className="absolute inset-0 -z-10 bg-black/10" />
          </>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Hero content — mobile                                             */}
        {/* ---------------------------------------------------------------- */}

        {pageStories[0]?.image && (
          <div
            className="
              absolute
              inset-x-[5vw]
              bottom-[6vh]
              z-10
              md:hidden
            "
          >
            <HeroContent src={pageStories[0].image} />
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Hero content — desktop                                            */}
        {/* ---------------------------------------------------------------- */}

        {pageStories[0]?.image && (
          <div
            className="
              absolute
              inset-x-[5vw]
              bottom-[6vh]
              z-10
              hidden
              md:block
              sm:bottom-[7vh]
              lg:bottom-[8vh]
            "
          >
            <ContrastText src={pageStories[0].image}>
              <HeroContent />
            </ContrastText>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Scroll indicator                                                   */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 0.65,
            y: 0,
          }}
          transition={{
            delay: 1.6,
            duration: 0.6,
            ease: revealEase,
          }}
          className="
            absolute
            bottom-5
            right-[5vw]
            hidden
            items-center
            gap-3
            text-[8px]
            uppercase
            tracking-[0.16em]
            md:flex
          "
        >
          <span className="h-px w-8 bg-current opacity-50" />
          <span>Scroll to explore</span>
        </motion.div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* VIDEO HERO - Latest Magazine Issue                                   */}
      {/* ------------------------------------------------------------------ */}
      <VideoHeroSection magazine={pageMagazine} />

      {/* ------------------------------------------------------------------ */}
      {/* COMMUNITY                                                           */}
      {/* ------------------------------------------------------------------ */}

      {showNewsletter && (
        <section
          id="community"
          className="
            border-b
            border-border
            bg-background
            px-[5vw]
            py-12
            sm:py-16
            lg:py-20
          "
        >
          <FadeUp>
            <div className="mb-10 flex items-center justify-between border-b border-border pb-4">
              <p className="eyebrow">00 · Community</p>

              <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                Social Mark
              </span>
            </div>
          </FadeUp>

          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-[10vw]">
            <FadeUp delay={0.05}>
              <div>
                <p className="eyebrow mb-5">
                  London · Lagos · New York
                </p>

                <h2 className="max-w-[850px] text-[clamp(48px,7vw,100px)] font-normal leading-[0.86] tracking-[-0.085em]">
                  {newsletterLabel}
                </h2>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="self-end"
              >
                <label
                  htmlFor="home-email"
                  className="
                    mb-3
                    block
                    text-[10px]
                    uppercase
                    tracking-[0.12em]
                    text-muted-foreground
                  "
                >
                  Stay connected
                </label>

                <div className="flex border-b border-foreground/60">
                  <input
                    id="home-email"
                    type="email"
                    required
                    placeholder="your@email.address"
                    className="
                      min-w-0
                      flex-1
                      bg-transparent
                      py-4
                      text-[14px]
                      outline-none
                      placeholder:text-muted-foreground
                    "
                  />

                  <motion.button
                    type="submit"
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.96 }}
                    className="
                      group
                      inline-flex
                      items-center
                      gap-2
                      px-2
                      py-4
                      text-[11px]
                      uppercase
                      tracking-[0.1em]
                    "
                  >
                    Join

                    <ArrowUpRight
                      size={15}
                      className="
                        transition-transform
                        duration-300
                        group-hover:-translate-y-0.5
                      "
                    />
                  </motion.button>
                </div>

                <p className="mt-3 text-[11px] leading-[1.4] text-muted-foreground">
                  Join the community edition.
                </p>
              </form>
            </FadeUp>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* STORIES                                                             */}
      {/* ------------------------------------------------------------------ */}

      <section
        id="stories"
        className="
          border-b
          border-border
          px-[5vw]
          py-16
          sm:py-20
          lg:py-24
        "
      >
        <SectionHeader
          number="01"
          title="Stories"
          description="Essays, visual culture, ideas and perspectives from the wider contribution community."
          href="/stories"
        />

        {storiesQuery.isLoading ? (
          <FadeUp>
            <p className="py-10 text-sm text-muted-foreground">
              Loading stories…
            </p>
          </FadeUp>
        ) : showNoStories ? (
          <FadeUp>
            <p className="py-10 text-sm text-muted-foreground">
              {noStoriesLabel}
            </p>
          </FadeUp>
        ) : (
          <FadeUp delay={0.08}>
            <StoryList items={pageStories} />
          </FadeUp>
        )}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* INTERVIEWS                                                          */}
      {/* ------------------------------------------------------------------ */}

      <section
        id="interviews"
        className="
          border-b
          border-border
          px-[5vw]
          py-16
          sm:py-20
          lg:py-24
        "
      >
        <SectionHeader
          number="02"
          title="Interviews"
          description="Conversations with people shaping culture, community and creative practice."
          href="/interviews"
        />

        {interviewsQuery.isLoading ? (
          <FadeUp>
            <p className="py-10 text-sm text-muted-foreground">
              Loading interviews…
            </p>
          </FadeUp>
        ) : showNoInterviews ? (
          <FadeUp>
            <p className="py-10 text-sm text-muted-foreground">
              {noInterviewsLabel}
            </p>
          </FadeUp>
        ) : (
          <FadeUp delay={0.08}>
            <InterviewList items={pageInterviews} />
          </FadeUp>
        )}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* MAGAZINE                                                            */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="magazine"
        className="border-b border-border py-16 sm:py-20 lg:py-28"
      >
        <div className="mb-8 border-b border-border px-[5vw] pb-4 lg:hidden">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">03 · Magazine</p>
            </div>
            <AnimatedArrowLink href="/magazine">
              View all
            </AnimatedArrowLink>
          </div>
        </div>

        {magazinesQuery.isLoading ? (
          <FadeUp>
            <div className="px-[5vw]">
              <p className="py-10 text-sm text-muted-foreground">
                Loading issues…
              </p>
            </div>
          </FadeUp>
        ) : showNoMagazines ? (
          <FadeUp>
            <div className="px-[5vw]">
              <p className="py-10 text-sm text-muted-foreground">
                {noIssuesLabel}
              </p>
            </div>
          </FadeUp>
        ) : (
          <div className="flex flex-col lg:flex-row">
            {/* Mobile: Latest issue first, edge-to-edge */}
            <div className="relative aspect-[0.72] w-full lg:hidden">
              <Link
                href={magazinePath(pageMagazine.slug)}
                className="group block h-full"
              >
                <div className="relative h-full w-full overflow-hidden bg-muted">
                  <img
                    src={pageMagazine.image}
                    alt={imageAlt(pageMagazine.title)}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                </div>
              </Link>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-5 py-4">
                <p className="text-[8px] uppercase tracking-[0.08em] text-white/70">
                  {pageMagazine.issue}
                </p>
                <h2 className="mt-1 text-[clamp(24px,6vw,42px)] font-bold uppercase leading-[0.9] tracking-[-0.05em] text-white">
                  {pageMagazine.title}
                </h2>
                <p className="mt-2 text-[11px] text-white/80">
                  {pageMagazine.price}
                </p>
              </div>
            </div>

            {/* Desktop: Grid layout */}
            <div className="hidden w-full px-[5vw] lg:block">
              <div className="mx-auto max-w-[1380px]">
                <div className="mb-8 flex items-end justify-between gap-6">
                  <div>
                    <p className="eyebrow">03 · Magazine</p>
                    <p className="mt-2 hidden max-w-[380px] text-[12px] leading-[1.45] text-muted-foreground sm:block">
                      The physical edition of Contribution Magazine.
                    </p>
                  </div>
                  <AnimatedArrowLink href="/magazine">
                    View all
                  </AnimatedArrowLink>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-[5vw]">
                  {/* LEFT: List of all issues */}
                  <div>
                    <div className="mb-6 flex items-center justify-between border-b border-border pb-3">
                      <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                        All Issues
                      </p>
                    </div>
                    <div className="flex flex-col divide-y divide-border">
                      {pageMagazines.map((magazine, index) => (
                        <div key={magazine.slug} className="py-4 first:pt-0">
                          <Link
                            href={magazinePath(magazine.slug)}
                            className="group flex items-center gap-4"
                          >
                            <div className="relative aspect-[0.72] w-16 shrink-0 overflow-hidden bg-muted">
                              <img
                                src={magazine.image}
                                alt={imageAlt(magazine.title)}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[9px] uppercase tracking-[0.1em] text-muted-foreground">
                                {magazine.issue}
                              </p>
                              <h3 className="mt-0.5 truncate text-[clamp(18px,2.5vw,28px)] font-medium leading-[1] tracking-[-0.04em]">
                                {magazine.title}
                              </h3>
                              <p className="mt-1 text-[11px] text-muted-foreground">
                                {magazine.price}
                              </p>
                            </div>
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-border text-foreground transition-all duration-300 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                              <ArrowUpRight size={14} />
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT: Latest issue featured */}
                  <div className="lg:sticky lg:top-24 lg:self-start">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10% 0px" }}
                      transition={{
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="mb-6 flex items-center justify-between border-b border-border pb-3"
                    >
                      <p className="text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                        Latest Issue
                      </p>

                      <p className="text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                        {pageMagazine.issue}
                      </p>
                    </motion.div>

                    <Link
                      href={magazinePath(pageMagazine.slug)}
                      className="group block"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{
                          duration: 0.9,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="relative aspect-[0.72] w-full overflow-hidden bg-muted"
                      >
                        {/* Image */}
                        <motion.img
                          src={pageMagazine.image}
                          alt={imageAlt(pageMagazine.title)}
                          initial={{ scale: 1.04 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.4,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          transition-transform
          duration-[1200ms]
          ease-out
          group-hover:scale-[1.035]
        "
                        />

                        {/* Overall hover veil */}
                        <motion.div
                          className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/10"
                        />

                        {/* Top gradient */}
                        <div
                          className="
          absolute
          inset-x-0
          top-0
          h-[55%]
          bg-gradient-to-b
          from-black/75
          via-black/25
          to-transparent
        "
                        />

                        {/* Bottom subtle vignette */}
                        <div
                          className="
          absolute
          inset-x-0
          bottom-0
          h-[30%]
          bg-gradient-to-t
          from-black/30
          to-transparent
        "
                        />

                        {/* Content */}
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 16,
                            filter: "blur(6px)",
                          }}
                          whileInView={{
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                          }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.15,
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="absolute left-0 right-0 top-0 px-6 pb-16 pt-6 sm:px-8 sm:pt-8"
                        >
                          {/* Issue */}
                          <div className="mb-3 flex items-center gap-3">
                            <span className="h-px w-6 bg-white/60" />

                            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/70">
                              {pageMagazine.issue}
                            </p>
                          </div>

                          {/* Title */}
                          <h2
                            className="
            max-w-[90%]
            text-[clamp(32px,5vw,64px)]
            font-bold
            uppercase
            leading-[0.82]
            tracking-[-0.065em]
            text-white
          "
                          >
                            {pageMagazine.title}
                          </h2>

                          {/* Price */}
                          <p className="mt-4 text-[11px] uppercase tracking-[0.14em] text-white/65">
                            {pageMagazine.price}
                          </p>
                        </motion.div>

                        {/* Hover indicator */}
                        <motion.div
                          initial={{ opacity: 0, x: -8 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          className="
          absolute
          bottom-6
          right-6
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          border
          border-white/40
          bg-black/10
          backdrop-blur-sm
        "
                        >
                          <span className="text-sm text-white">↗</span>
                        </motion.div>
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}