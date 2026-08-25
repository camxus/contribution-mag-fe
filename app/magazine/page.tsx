"use client";

import { MagazineList } from "@/components/collection-list";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { magazines } from "@/lib/content";
import { useMagazines } from "@/hooks/use-content-query";

export default function MagazinesPage() {
  const query = useMagazines();
  const items = query.data || magazines;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto w-[1180px] px-[5vw] py-[120px]_110px">
        <p className="eyebrow">Contribution Magazine · Print editions</p>
        <h1 className="mb-[12px] mt-0 text-[clamp(72px,14vw,190px)] font-normal tracking-[-0.12em] leading-[0.78]">
          Magazine
        </h1>
        <p className="collection-intro max-w-[560px] mb-[70px] text-[clamp(18px,2.4vw,30px)] text-[#c7c7c7] leading-[1.15]">
          Printed issues for people paying attention, collecting essays,
          portraits, and field notes.
        </p>
        {query.isLoading ? (
          <p>Loading issues…</p>
        ) : (
          <MagazineList items={items} />
        )}
      </section>
      <SiteFooter />
    </main>
  );
}