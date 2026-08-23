"use client";

import { useParams } from "next/navigation";
import { BackLink, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { MotionArticle, MotionImage } from "@/components/motion";
import { imageAlt, safeSlug, stories } from "@/lib/content";
import { useStory } from "@/hooks/use-content-query";

export default function StoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const query = useStory(safeSlug(slug));
  const story =
    query.data || stories.find((item) => item.slug === safeSlug(slug));
  if (query.isLoading && !story)
    return (
      <main className="contribution-site">
        <SiteHeader />
        <p className="detail-page">Loading story…</p>
        <SiteFooter />
      </main>
    );
  if (!story) return null;
  return (
    <main className="contribution-site">
      <SiteHeader />
      <MotionArticle
        className="detail-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="detail-meta">
          <p className="eyebrow">
            {story.category} · {story.date}
          </p>
          <p>By {story.author}</p>
        </div>
        <h1>{story.title}</h1>
        <p className="detail-dek">{story.dek}</p>
        <MotionImage className="detail-image">
          <img src={story.image} alt={imageAlt(story.title)} />
        </MotionImage>
        <div className="detail-body">
          {story.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </MotionArticle>
      <SiteFooter />
    </main>
  );
}
