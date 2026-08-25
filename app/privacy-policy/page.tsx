"use client";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { usePrivacyPolicy } from "@/hooks/use-content-query";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const query = usePrivacyPolicy();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto w-[1180px] px-[5vw] py-[120px]">
        <p className="eyebrow">Contribution Magazine · Privacy Policy</p>
        <h1 className="mb-[12px] mt-0 text-[clamp(72px,14vw,190px)] font-normal tracking-[-0.12em] leading-[0.78]">
          Privacy Policy
        </h1>

        {query.isLoading ? (
          <p className="text-foreground/70">Loading privacy policy...</p>
        ) : query.error ? (
          <p className="text-destructive">Unable to load privacy policy</p>
        ) : (
          <div 
            className="legal-content max-w-[560px] text-[clamp(18px,2.4vw,30px)] text-[#c7c7c7] leading-[1.15]"
            dangerouslySetInnerHTML={{ __html: query.data?.content_html || "" }}
          />
        )}
      </section>
      <SiteFooter />
    </main>
  );
}
