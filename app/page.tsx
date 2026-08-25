"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { MotionImage, Reveal } from "@/components/motion";
import { InterviewList, StoryList } from "@/components/collection-list";
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
  interviewPath,
  magazinePath,
  magazines,
  newsletterLabel,
  priceBlurb,
  productBlurb,
  storyPath,
  stories,
  interviews,
  heroImage,
  featuredStory,
  contributionTitle,
} from "@/lib/content";

export default function Page() {
  const storiesQuery = useStories();
  const interviewsQuery = useInterviews();
  const magazinesQuery = useMagazines();
  const heroQuery = useHero();
  const pageStories = storiesQuery.data || stories;
  const pageInterviews = interviewsQuery.data || interviews;
  const pageMagazines = magazinesQuery.data || magazines;
  const pageFeaturedStory = pageStories[0] || featuredStory;
  const pageFeaturedInterview = pageInterviews[0] || featuredInterview;
  const pageMagazine = pageMagazines[0] || magazines[0];
  const pageHeroImage = heroQuery.data?.hero_image_url || heroImage;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="relative min-h-[min(82vh,820px)] overflow-hidden">
        <MotionImage className="absolute inset-0 w-full h-full">
          <img
            src={pageHeroImage}
            alt={imageAlt(pageFeaturedStory.title)}
            className="block h-full w-full min-h-[min(82vh,820px)] object-cover object-center filter saturate-75"
          />
        </MotionImage>
        <Reveal className="absolute z-20 inset-auto 5vw 8vw max-w-[760px] text-shadow-[0_1px_18px_rgba(0,0,0,0.45)]">
          <div>
            <ContrastText src={pageHeroImage}>
              <p className="mb-[8px] text-[18px]">Independent journal · Vol. 01</p>
              <h1 className="mb-[8px] text-[clamp(52px,10vw,140px)] font-bold tracking-[-0.12em] leading-[0.8]">
                {contributionTitle}
              </h1>
              <p className="hero-kicker max-w-[340px] text-[18px]">
                Culture, community, and creative practice.
              </p>
              <div className="mt-[26px] flex gap-[8px]">
                <Link
                  href="#stories"
                  className="inline-block border border-foreground px-[12px] py-[16px] bg-black/35 text-[11px] uppercase transition-colors hover:border-primary hover:bg-primary"
                >
                  Explore stories
                </Link>
                <Link
                  href="#magazine"
                  className="inline-block border border-foreground px-[12px] py-[16px] bg-black/35 text-[11px] uppercase transition-colors hover:border-primary hover:bg-primary"
                >
                  Shop the issue
                </Link>
              </div>
            </ContrastText>
          </div>
        </Reveal>
      </section>
      <section
        className="relative grid grid-cols-[1fr_1fr] gap-[10px] min-h-[310px] px-[48px] py-[48px] bg-background"
        id="community"
      >
        <div className="col-span-2 text-[18px]">Social Mark</div>
        <div className="col-span-1">
          <p className="eyebrow">London · Lagos · New York</p>
          <h2 className="mt-[12px] mb-0 text-[clamp(38px,6vw,78px)] font-normal tracking-[-0.08em]">
            {newsletterLabel}
          </h2>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="col-span-1 grid grid-cols-[1fr_auto] gap-[10px]"
        >
          <label htmlFor="home-email" className="sr-only">
            Email address
          </label>
          <input
            id="home-email"
            type="email"
            required
            placeholder="your@email.address"
            className="col-span-2 min-w-0 flex-1 border-0 bg-[var(--chrome)] px-[14px] py-[14px] text-[12px] text-foreground outline-none"
          />
          <button
            type="submit"
            className="col-span-2 border-0 bg-[#1a1a1a] px-[13px] py-[13px] text-[14px] text-foreground"
          >
            Join
          </button>
          <p className="col-span-2 text-[14px] text-[var(--olive)]">
            Join the community edition.
          </p>
        </form>
      </section>
      <section className="px-[5vw] py-[84px] border-b border-border" id="stories">
        <div className="flex items-center justify-between mb-[28px]">
          <p className="eyebrow">01 · Stories</p>
          <Link
            className="inline-flex items-center gap-[6px] text-[11px] text-muted-foreground"
            href="/stories"
          >
            View all <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
        {storiesQuery.isLoading ? (
          <p>Loading stories…</p>
        ) : (
          <StoryList items={pageStories} />
        )}
      </section>
      <section className="px-[5vw] py-[84px] border-b border-border" id="interviews">
        <div className="flex items-center justify-between mb-[28px]">
          <p className="eyebrow">02 · Interviews</p>
          <Link
            className="inline-flex items-center gap-[6px] text-[11px] text-muted-foreground"
            href="/interveiws"
          >
            View all <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
        {interviewsQuery.isLoading ? (
          <p>Loading interviews…</p>
        ) : (
          <InterviewList items={pageInterviews} />
        )}
      </section>
      <section className="px-[5vw] py-[84px] border-b border-border" id="magazine">
        <div className="flex items-center justify-between mb-[28px]">
          <p className="eyebrow">03 · Magazine</p>
          <Link
            className="inline-flex items-center gap-[6px] text-[11px] text-muted-foreground"
            href={magazinePath(pageMagazine.slug)}
          >
            View issue <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-[minmax(220px,0.7fr)_1fr] gap-[7vw] items-center max-w-[900px] mb-[70px]">
          <img
            src={pageMagazine.image}
            alt={imageAlt(pageMagazine.title)}
            className="w-full max-h-[560px] object-cover"
          />
          <div>
            <p className="eyebrow">{productBlurb}</p>
            <h2 className="mt-[8px] mb-0 text-[clamp(42px,7vw,90px)] font-normal tracking-[-0.09em] leading-[0.84]">
              {pageMagazine.title}
            </h2>
            <p className="mt-[8px] max-w-[380px] text-[15px] leading-[1.5] text-[#c1c1c1]">
              {pageMagazine.description}
            </p>
            <Link
              className="mt-[28px] inline-block text-[18px]"
              href={magazinePath(pageMagazine.slug)}
            >
              View {pageMagazine.price}
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(4,1fr)] gap-[18px_5px]">
          {coverProducts.map((cover) => (
            <Link
              href={magazinePath(pageMagazine.slug)}
              className="block min-w-0"
              key={cover.name}
            >
              <div
                className={`relative aspect-[0.72] overflow-hidden ${cover.tone} text-white`}
              >
                <img
                  src={cover.image}
                  alt={`${cover.name} mock cover`}
                  className="absolute inset-0 h-full w-full object-cover mix-blend-multiply filter saturate-90 contrast-105"
                />
                <strong className="absolute top-[10px] left-[12px] text-[clamp(22px,3vw,55px)] tracking-[-0.1em]">
                  contribution magazine
                </strong>
                <b className="absolute bottom-[10px] left-[12px] text-[clamp(14px,1.8vw,28px)]">
                  {cover.name}
                </b>
              </div>
              <p className="mt-[7px] mb-[2px] text-[8px] text-[#d0d0d0]">
                {productBlurb}
              </p>
              <span className="text-[10px] text-foreground">{priceBlurb}</span>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
