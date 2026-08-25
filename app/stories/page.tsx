"use client";

import { StoryList } from "@/components/collection-list";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { stories } from "@/lib/content";
import { useStories } from "@/hooks/use-content-query";

export default function StoriesPage() {
  const query = useStories();
  const items = query.data || stories;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto w-[1180px] px-[5vw] py-[120px]_110px">
        <p className="eyebrow">Contribution Magazine · Archive</p>
        <h1 className="mb-[12px] mt-0 text-[clamp(72px,14vw,190px)] font-normal tracking-[-0.12em] leading-[0.78]">
          Stories
        </h1>
        <p className="collection-intro max-w-[560px] mb-[70px] text-[clamp(18px,2.4vw,30px)] text-[#c7c7c7] leading-[1.15]">
          Dispatches on culture, community, and the creative practices shaping
          what comes next.
        </p>
        {query.isLoading ? (
          <p>Loading stories…</p>
        ) : (
          <StoryList items={items} />
        )}
      </section>
      <SiteFooter />
    </main>
  );
}