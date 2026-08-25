"use client";

import { InterviewList } from "@/components/collection-list";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { interviews } from "@/lib/content";
import { useInterviews } from "@/hooks/use-content-query";

export default function InterviewsPage() {
  const query = useInterviews();
  const items = query.data || interviews;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto w-[1180px] px-[5vw] py-[120px]_110px">
        <p className="eyebrow">Contribution Magazine · Conversations</p>
        <h1 className="mb-[12px] mt-0 text-[clamp(72px,14vw,190px)] font-normal tracking-[-0.12em] leading-[0.78]">
          Interviews
        </h1>
        <p className="collection-intro max-w-[560px] mb-[70px] text-[clamp(18px,2.4vw,30px)] text-[#c7c7c7] leading-[1.15]">
          Long-form conversations with artists, makers, and people widening the
          room.
        </p>
        {query.isLoading ? (
          <p>Loading interviews…</p>
        ) : (
          <InterviewList items={items} />
        )}
      </section>
      <SiteFooter />
    </main>
  );
}