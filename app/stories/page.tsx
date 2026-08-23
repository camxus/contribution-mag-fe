"use client";

import { StoryList } from "@/components/collection-list";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { stories } from "@/lib/content";
import { useStories } from "@/hooks/use-content-query";

export default function StoriesPage() {
  const query = useStories();
  const items = query.data || stories;
  return (
    <main className="contribution-site">
      <SiteHeader />
      <section className="collection-page">
        <p className="eyebrow">Contribution Magazine · Archive</p>
        <h1>Stories</h1>
        <p className="collection-intro">
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
