"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { StoryList, InterviewList } from "@/components/collection-list";
import { ContrastText } from "@/components/contrast-text";

import {
  useInterviews,
  useMagazines,
  useStories,
  useHero,
} from "@/hooks/use-content-query";

import {
  coverProducts,
  featuredInterview,
  imageAlt,
  magazinePath,
  magazines,
  newsletterLabel,
  priceBlurb,
  productBlurb,
  stories,
  interviews,
  featuredStory,
  contributionTitle,
  noStoriesLabel,
  noInterviewsLabel,
  noIssuesLabel,
} from "@/lib/content";

/* -------------------------------------------------------------------------- */
/* Motion helpers                                                             */
/* -------------------------------------------------------------------------- */

const revealEase = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/* Hero image                                                                 */
/* -------------------------------------------------------------------------- */

function HeroImage({
  desktopSrc,
  mobileSrc,
  alt,
}: {
  desktopSrc: string | null;
  mobileSrc: string | null;
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
    reduced ? ["0%", "0%"] : ["0%", "16%"],
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [1, 1] : [1.04, 1.12],
  );

  const src = desktopSrc || mobileSrc;

  if (!src) {
    return null;
  }

  return (
    <div
      ref={ref}
      className="absolute inset-0 -z-20 overflow-hidden"
    >
      <picture>
        {mobileSrc && (
          <source
            media="(max-width: 767px)"
            srcSet={mobileSrc}
          />
        )}

        <motion.img
          key={src}
          src={src}
          alt={alt}
          style={{ y, scale }}
          initial={{
            opacity: 0,
            scale: reduced ? 1 : 1.04,
          }}
          animate={{
            opacity: 1,
            scale: reduced ? 1 : 1.04,
          }}
          transition={{
            opacity: {
              duration: reduced ? 0 : 0.9,
              ease: revealEase,
            },
            scale: {
              duration: reduced ? 0 : 1.5,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          className="
            h-full
            w-full
            object-cover
            object-center
            saturate-[0.72]
          "
        />
      </picture>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero content                                                               */
/* -------------------------------------------------------------------------- */

function HeroContent() {
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
        <span className="opacity-40">·</span>
        <span>Vol. 01</span>
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
/* Magazine cover                                                             */
/* -------------------------------------------------------------------------- */

function MagazineCover({
  cover,
  index,
  href,
}: {
  cover: (typeof coverProducts)[number];
  index: number;
  href: string;
}) {
  return (
    <Link href={href} className="group block min-w-0">
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={{
          rest: {
            y: 0,
            rotateX: 0,
            rotateY: 0,
          },
          hover: {
            y: -8,
            rotateX: 2,
            rotateY: -2,
          },
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 22,
        }}
        style={{
          transformPerspective: 1000,
        }}
        className={`relative aspect-[0.72] overflow-hidden text-white shadow-[0_18px_50px_rgba(0,0,0,0.12)]`}
      >
        <motion.img
          src={cover.image}
          alt={`${cover.name} cover`}
          variants={{
            rest: {
              scale: 1,
            },
            hover: {
              scale: 1.045,
            },
          }}
          transition={{
            duration: 0.7,
            ease: revealEase,
          }}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            mix-blend-multiply
            saturate-90
            contrast-105
          "
        />

        <motion.div
          variants={{
            rest: {
              opacity: 0,
            },
            hover: {
              opacity: 1,
            },
          }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 bg-black/10"
        />

        <strong
          className="
            absolute
            left-3
            top-3
            max-w-[90%]
            text-[clamp(18px,2.5vw,42px)]
            font-bold
            uppercase
            leading-[0.8]
            tracking-[-0.09em]
          "
        >
          contribution magazine
        </strong>

        <b
          className="
            absolute
            bottom-3
            left-3
            text-[clamp(13px,1.5vw,24px)]
            leading-none
          "
        >
          {cover.name}
        </b>

        <motion.span
          variants={{
            rest: {
              opacity: 0,
              x: 8,
            },
            hover: {
              opacity: 1,
              x: 0,
            },
          }}
          transition={{
            duration: 0.3,
          }}
          className="
            absolute
            right-3
            top-3
            text-[9px]
            uppercase
            tracking-[0.1em]
          "
        >
          0{index + 1}
        </motion.span>
      </motion.div>

      <p className="mt-3 text-[8px] uppercase tracking-[0.08em] text-muted-foreground">
        {productBlurb}
      </p>

      <span className="mt-1 block text-[10px]">
        {priceBlurb}
      </span>
    </Link>
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

  /*
   * IMPORTANT:
   * The hero has no local fallback.
   * It only exists when the API returns a hero image.
   */
  const pageHeroImageDesktop =
    heroQuery.data?.hero_image_url_desktop || null;

  const pageHeroImageMobile =
    heroQuery.data?.hero_image_url_mobile || null;

  const hasHeroImage =
    Boolean(pageHeroImageDesktop || pageHeroImageMobile);

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
        {/* API hero image with restored parallax */}
        <HeroImage
          desktopSrc={pageHeroImageDesktop}
          mobileSrc={pageHeroImageMobile}
          alt={imageAlt(pageFeaturedStory.title)}
        />

        {/* Contrast layers */}
        {hasHeroImage && (
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

        <div
          className="
            absolute
            inset-x-[5vw]
            bottom-[6vh]
            z-10
            md:hidden
          "
        >
          {pageHeroImageMobile ? (
            <ContrastText src={pageHeroImageMobile}>
              <HeroContent />
            </ContrastText>
          ) : pageHeroImageDesktop ? (
            <ContrastText src={pageHeroImageDesktop}>
              <HeroContent />
            </ContrastText>
          ) : null}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Hero content — desktop                                            */}
        {/* ---------------------------------------------------------------- */}

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
          {pageHeroImageDesktop ? (
            <ContrastText src={pageHeroImageDesktop}>
              <HeroContent />
            </ContrastText>
          ) : pageHeroImageMobile ? (
            <ContrastText src={pageHeroImageMobile}>
              <HeroContent />
            </ContrastText>
          ) : null}
        </div>

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
        className="px-[5vw] py-16 sm:py-20 lg:py-28"
      >
        <SectionHeader
          number="03"
          title="Magazine"
          description="The physical edition of Contribution Magazine."
          href="/magazine"
          action="View issue"
        />

        {magazinesQuery.isLoading ? (
          <FadeUp>
            <p className="py-10 text-sm text-muted-foreground">
              Loading issues…
            </p>
          </FadeUp>
        ) : showNoMagazines ? (
          <FadeUp>
            <p className="py-10 text-sm text-muted-foreground">
              {noIssuesLabel}
            </p>
          </FadeUp>
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
                  staggerChildren: 0.1,
                },
              },
            }}
            className="
        grid
        grid-cols-2
        gap-x-3
        gap-y-12
        sm:gap-x-4
        sm:gap-y-16
        lg:grid-cols-8
        lg:gap-x-5
        lg:gap-y-16
      "
          >
            {/* NEWEST ISSUE */}
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
                    duration: 0.7,
                    ease: revealEase,
                  },
                },
              }}
              className="
          col-span-2
          lg:col-span-4
          lg:row-span-2
        "
            >
              <Link
                href={magazinePath(pageMagazine.slug)}
                className="group block"
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{
                    duration: 0.7,
                    ease: revealEase,
                  }}
                  className="
              relative
              aspect-[0.72]
              overflow-hidden
              bg-muted
            "
                >
                  <img
                    src={pageMagazine.image}
                    alt={imageAlt(pageMagazine.title)}
                    className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-[1.025]
              "
                  />

                  <div
                    className="
                absolute
                inset-0
                bg-black/0
                transition-colors
                duration-500
                group-hover:bg-black/10
              "
                  />
                </motion.div>
              </Link>
            </motion.div>

            {/* ISSUE INFORMATION */}
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
                    duration: 0.7,
                    ease: revealEase,
                  },
                },
              }}
              className="
          col-span-2
          flex
          items-start
          justify-center
          py-2
          sm:py-4
          lg:col-span-4
          lg:row-span-2
          lg:items-center
          lg:py-0
        "
            >
              <div className="w-full max-w-[500px] lg:max-w-[460px]">
                <p className="eyebrow">
                  {productBlurb}
                </p>

                <h2
                  className="
              mt-4
              text-[clamp(48px,14vw,110px)]
              font-normal
              leading-[0.82]
              tracking-[-0.09em]
              sm:mt-5
            "
                >
                  {pageMagazine.title}
                </h2>

                <p
                  className="
              mt-6
              line-clamp-3
              max-w-[430px]
              text-[14px]
              leading-[1.55]
              text-muted-foreground
              sm:mt-7
            "
                >
                  {pageMagazine.description}
                </p>

                <AnimatedArrowLink
                  href={magazinePath(pageMagazine.slug)}
                >
                  View {pageMagazine.price}
                </AnimatedArrowLink>
              </div>
            </motion.div>

            {/* OTHER ISSUES */}
            {pageMagazines.slice(1).map((magazine, index) => (
              <motion.div
                key={magazine.slug}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 30,
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
                className="col-span-1 lg:col-span-2"
              >
                <MagazineCover
                  cover={{
                    name: magazine.title,
                    image: magazine.image,
                  }}
                  index={index}
                  href={magazinePath(magazine.slug)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}