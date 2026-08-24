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
} from "@/hooks/use-content-query";
import {
  coverProducts,
  featuredInterview,
  featuredStory,
  heroImage,
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
  contributionTitle,
} from "@/lib/content";

export default function Page() {
  const storiesQuery = useStories();
  const interviewsQuery = useInterviews();
  const magazinesQuery = useMagazines();
  const pageStories = storiesQuery.data || stories;
  const pageInterviews = interviewsQuery.data || interviews;
  const pageMagazines = magazinesQuery.data || magazines;
  const pageFeaturedStory = pageStories[0] || featuredStory;
  const pageFeaturedInterview = pageInterviews[0] || featuredInterview;
  const pageMagazine = pageMagazines[0] || magazines[0];
  return (
    <main className="contribution-site min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="contribution-hero">
        <MotionImage className="hero-media">
          <img src={heroImage} alt={imageAlt(pageFeaturedStory.title)} />
        </MotionImage>
        <Reveal className="hero-overlay">
          <div>
            <ContrastText src={heroImage}>
              <p>Independent journal · Vol. 01</p>
              <h1>{contributionTitle}</h1>
              <p className="hero-kicker">
                Culture, community, and creative practice.
              </p>
              <div className="hero-actions">
                <Link href="#stories">Explore stories</Link>
                <Link href="#magazine">Shop the issue</Link>
              </div>
            </ContrastText>
          </div>
        </Reveal>
      </section>
      <section className="community-band" id="community">
        <div>
          <p className="eyebrow">London · Lagos · New York</p>
          <h2>{newsletterLabel}</h2>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="home-email">Email address</label>
          <input
            id="home-email"
            type="email"
            required
            placeholder="your@email.address"
          />
          <button type="submit">Join</button>
        </form>
      </section>
      <section className="editorial-section" id="stories">
        <div className="section-heading">
          <p className="eyebrow">01 · Stories</p>
          <Link className="icon-link" href="/stories">
            View all <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
        {storiesQuery.isLoading ? (
          <p>Loading stories…</p>
        ) : (
          <StoryList items={pageStories} />
        )}
      </section>
      <section className="editorial-section" id="interviews">
        <div className="section-heading">
          <p className="eyebrow">02 · Interviews</p>
          <Link className="icon-link" href="/interveiws">
            View all <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
        {interviewsQuery.isLoading ? (
          <p>Loading interviews…</p>
        ) : (
          <InterviewList items={pageInterviews} />
        )}
      </section>
      <section className="magazine-section" id="magazine">
        <div className="section-heading">
          <p className="eyebrow">03 · Magazine</p>
          <Link className="icon-link" href={magazinePath(pageMagazine.slug)}>
            View issue <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
        <div className="issue-feature">
          <img src={pageMagazine.image} alt={imageAlt(pageMagazine.title)} />
          <div>
            <p className="eyebrow">{productBlurb}</p>
            <h2>{pageMagazine.title}</h2>
            <p>{pageMagazine.description}</p>
            <Link
              className="button-link"
              href={magazinePath(pageMagazine.slug)}
            >
              View {pageMagazine.price}
            </Link>
          </div>
        </div>
        <div className="cover-grid">
          {coverProducts.map((cover) => (
            <Link
              href={magazinePath(pageMagazine.slug)}
              className="cover-card"
              key={cover.name}
            >
              <div className={`cover-art text-white ${cover.tone}`}>
                <img src={cover.image} alt={`${cover.name} mock cover`} />
                <strong>contribution magazine</strong>
                <b>{cover.name}</b>
              </div>
              <p>{productBlurb}</p>
              <span>{priceBlurb}</span>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
