"use client";

import { useParams } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { MotionArticle, MotionImage } from "@/components/motion";
import { imageAlt, interviews, safeSlug } from "@/lib/content";
import { useInterview } from "@/hooks/use-content-query";

export default function InterviewPage() {
  const { slug } = useParams<{ slug: string }>();
  const query = useInterview(safeSlug(slug));
  const interview =
    query.data || interviews.find((item) => item.slug === safeSlug(slug));
  if (query.isLoading && !interview)
    return (
      <main className="contribution-site min-h-screen bg-background text-foreground">
        <SiteHeader />
        <p className="detail-page mx-auto flex max-w-5xl flex-col gap-8 px-5 py-16 text-foreground md:px-10">
          Loading interview…
        </p>
        <SiteFooter />
      </main>
    );
  if (!interview) return null;
  return (
    <main className="contribution-site min-h-screen bg-background text-foreground">
      <SiteHeader />
      <MotionArticle
        className="detail-page mx-auto flex max-w-5xl flex-col gap-8 px-5 py-16 text-foreground md:px-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.85 }}
      >
        <div className="detail-meta">
          <p className="eyebrow">Interview · {interview.role}</p>
        </div>
        <h1>{interview.name}</h1>
        <p className="detail-dek">“{interview.quote}”</p>
        <MotionImage className="detail-image">
          <img src={interview.image} alt={imageAlt(interview.name)} />
        </MotionImage>
        <div className="detail-body">
          {interview.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </MotionArticle>
      <SiteFooter />
    </main>
  );
}
