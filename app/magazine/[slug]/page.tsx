"use client";

import { useParams } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { MotionArticle, MotionImage } from "@/components/motion";
import { ContrastText } from "@/components/contrast-text";
import { imageAlt, magazines, safeSlug } from "@/lib/content";
import { useMagazine } from "@/hooks/use-content-query";

export default function MagazinePage() {
  const { slug } = useParams<{ slug: string }>();
  const query = useMagazine(safeSlug(slug));
  const magazine =
    query.data || magazines.find((item) => item.slug === safeSlug(slug));
  if (query.isLoading && !magazine)
    return (
      <main className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <p className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-16 text-foreground md:px-10">
          Loading issue…
        </p>
        <SiteFooter />
      </main>
    );
  if (!magazine) return null;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <MotionArticle
        className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-16 text-foreground md:px-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.85 }}
      >
        <p className="eyebrow">{magazine.issue} · Print edition</p>
        <div className="grid grid-cols-[minmax(260px,1fr)_1fr] gap-[7vw] items-center">
          <MotionImage className="detail-image">
            <img src={magazine.image} alt={imageAlt(magazine.title)} />
          </MotionImage>
          <div>
            <ContrastText src={magazine.image}>
              <h1>{magazine.title}</h1>
              <p className="detail-dek">{magazine.description}</p>
              <p className="mt-[28px] text-[18px]">{magazine.price}</p>
            </ContrastText>
            {magazine.soldOut ? (
              <p className="mt-[30px] text-[12px] text-muted-foreground">Sold Out</p>
            ) : (
              <a
                className="mt-[28px] inline-block text-[18px]"
                href={
                  magazine.stripeBuyLinkPrint ||
                  magazine.stripeBuyLinkDigital ||
                  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ||
                  "#"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy now
              </a>
            )}
            <p className="mt-[30px] text-[12px] text-muted-foreground">
              Mock product page powered by editorial data.
            </p>
          </div>
        </div>
      </MotionArticle>
      <SiteFooter />
    </main>
  );
}