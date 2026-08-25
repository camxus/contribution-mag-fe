"use client";

import { useParams } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { MotionArticle, MotionImage } from "@/components/motion";
import { imageAlt, magazines, safeSlug } from "@/lib/content";
import { useMagazine } from "@/hooks/use-content-query";

const ease = [0.22, 1, 0.36, 1] as const;

export default function MagazinePage() {
  const { slug } = useParams<{ slug: string }>();
  const safe = safeSlug(slug);

  const query = useMagazine(safe);
  const magazine =
    query.data || magazines.find((item) => item.slug === safe);

  if (query.isLoading && !magazine) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <SiteHeader />

        <div className="mx-auto max-w-[1380px] px-[5vw] py-16">
          <p className="text-sm text-muted-foreground">
            Loading issue…
          </p>
        </div>

        <SiteFooter />
      </main>
    );
  }

  if (!magazine) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <SiteHeader />

        <div className="mx-auto max-w-[1380px] px-[5vw] py-16">
          <p className="text-sm text-muted-foreground">
            Issue not found.
          </p>
        </div>

        <SiteFooter />
      </main>
    );
  }

  const buyLink =
    magazine.stripeBuyLinkPrint ||
    magazine.stripeBuyLinkDigital ||
    process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ||
    "#";

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <SiteHeader />

      <MotionArticle
        className="
          mx-auto
          w-full
          max-w-[1380px]
          px-[5vw]
          pb-20
          pt-[100px]
          sm:pb-24
          sm:pt-[130px]
          lg:pb-32
          lg:pt-[160px]
        "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease,
        }}
      >
        <div className="mb-8 border-b border-border pb-4 sm:mb-12">
          <p className="eyebrow">
            {magazine.issue} · Print edition
          </p>
        </div>

        <div
          className="
    grid
    grid-cols-1
    items-stretch
    gap-10
    md:grid-cols-[minmax(300px,0.85fr)_1fr]
    md:gap-[7vw]
  "
        >
          <MotionImage
            className="
      mx-auto
      w-full
      max-w-[560px]
      overflow-hidden
      md:mx-0
    "
          >
            <img
              src={magazine.image}
              alt={imageAlt(magazine.title)}
              className="block h-auto w-full object-cover"
            />
          </MotionImage>

          <div className="flex max-w-[680px] flex-col justify-between">
            <div>
              <h1
                className="
          text-[clamp(48px,8vw,110px)]
          font-normal
          leading-[0.82]
          tracking-[-0.09em]
        "
              >
                {magazine.title}
              </h1>

              <p
                className="
          mt-6
          max-w-[600px]
          text-[clamp(18px,2.4vw,30px)]
          leading-[1.12]
          tracking-[-0.025em]
        "
              >
                {magazine.description}
              </p>
            </div>

            <div className="mt-10 md:mt-0">
              <p className="text-[18px]">
                {magazine.price}
              </p>

              {magazine.soldOut ? (
                <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Sold Out
                </p>
              ) : (
                <a
                  href={buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
            mt-8
            inline-flex
            items-center
            border
            border-foreground
            px-5
            py-3
            text-[12px]
            font-medium
            uppercase
            tracking-[0.12em]
            transition-colors
            duration-300
            hover:bg-foreground
            hover:text-background
          "
                >
                  Buy now
                </a>
              )}
            </div>
          </div>
        </div>
      </MotionArticle>

      <SiteFooter />
    </main>
  );
}