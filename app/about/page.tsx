"use client";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { useAbout } from "@/hooks/use-content-query";

export default function AboutPage() {
  const aboutQuery = useAbout();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto w-[1180px] px-[5vw] py-[120px]">
        <p className="eyebrow">Contribution Magazine · About Us</p>
        <h1 className="mb-[12px] mt-0 text-[clamp(72px,14vw,190px)] font-normal tracking-[-0.12em] leading-[0.78]">
          About Us
        </h1>

        {aboutQuery.isLoading ? (
          <p className="text-foreground/70">Loading about information...</p>
        ) : aboutQuery.error ? (
          <p className="text-destructive">Unable to load about information</p>
        ) : (
          <div 
            className="about-content max-w-[560px] mb-[70px] text-[clamp(18px,2.4vw,30px)] text-[#c7c7c7] leading-[1.15]"
            dangerouslySetInnerHTML={{ __html: aboutQuery.data?.content_html || "" }}
          />
        )}

        <div className="mt-[120px] border-t border-border pt-[60px]">
          <h2 className="mb-[40px] text-[clamp(48px,8vw,120px)] font-normal tracking-[-0.08em]">Contact Us</h2>
          {aboutQuery.isLoading ? (
            <p className="text-foreground/70">Loading contact information...</p>
          ) : aboutQuery.error ? (
            <p className="text-destructive">Unable to load contact information</p>
          ) : aboutQuery.data?.email ? (
            <div className="flex flex-col gap-[20px]">
              <a href={`mailto:${aboutQuery.data.email}`} className="w-fit text-foreground hover:opacity-70 transition-opacity">
                {aboutQuery.data.email}
              </a>
              {aboutQuery.data.instagram && (
                <a href={`https://instagram.com/${aboutQuery.data.instagram.replace(/^@/, '')}`} target="_blank" rel="noopener noreferrer" className="w-fit text-foreground hover:opacity-70 transition-opacity">
                  Instagram: @{aboutQuery.data.instagram.replace(/^@/, '')}
                </a>
              )}
            </div>
          ) : (
            <p className="text-foreground/70">Contact information not available</p>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
