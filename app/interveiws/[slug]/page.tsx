"use client";

import { useParams } from "next/navigation";
import { BackLink, SiteFooter, SiteHeader } from "@/components/site-chrome";
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
      <main className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <p className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-16 text-foreground md:px-10">
          Loading interview…
        </p>
        <SiteFooter />
      </main>
    );
  if (!interview) return null;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <BackLink />
      <MotionArticle
        className="mx-auto max-w-[1100px] flex flex-col gap-8 px-[5vw] py-[100px_120px] text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.85 }}
      >
        <div className="flex justify-between gap-[20px] text-muted-foreground">
          <p className="eyebrow">Interview · {interview.role}</p>
        </div>
        <h1 className="max-w-[1000px] mb-[15px] mt-0 text-[clamp(52px,10vw,140px)] font-normal tracking-[-0.1em] leading-[0.82]">
          {interview.name}
        </h1>
        <p className="detail-dek max-w-[700px] text-[clamp(20px,3vw,36px)] leading-[1.1]">
          "{interview.quote}"
        </p>
        <MotionImage className="detail-image">
          <img
            src={interview.image}
            alt={imageAlt(interview.name)}
            className="block mx-auto my-[60px] max-w-[min(100%,880px)] max-h-[720px] object-cover"
          />
        </MotionImage>
        <div className="detail-body mx-auto max-w-[620px]">
          {interview.body.map((paragraph) => (
            <p key={paragraph} className="text-[18px] leading-[1.65]">
              {paragraph}
            </p>
          ))}
        </div>
      </MotionArticle>
      <SiteFooter />
    </main>
  );
}
