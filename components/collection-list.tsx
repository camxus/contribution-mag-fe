"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  imageAlt,
  interviewPath,
  magazinePath,
  storyPath,
  type Interview,
  type Magazine,
  type Story,
} from "@/lib/content";
const ease = [0.22, 1, 0.36, 1] as const;

function ListRow({
  href,
  eyebrow,
  title,
  description,
  image,
}: {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  contrastAware?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.li
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.7,
            ease,
          },
        },
      }}
      whileHover={reduced ? undefined : { opacity: 0.78 }}
    >
      <Link
        href={href}
        className="
          group
          flex w-full items-center
          gap-4
          border-t border-border
          py-5
          sm:gap-6 sm:py-6
        "
      >
        <span
          className="
            relative
            aspect-square
            w-20 shrink-0
            overflow-hidden
            bg-muted
            sm:w-24
          "
        >
          <img
            src={image}
            alt={imageAlt(title)}
            className="
              block h-full w-full
              object-cover
              transition-transform duration-500
              group-hover:scale-[1.03]
            "
          />
        </span>

        <span
          className="
            flex min-w-0 flex-1
            flex-col justify-center
            gap-1
            text-foreground
          "
        >
          <span
            className="
              truncate
              text-[10px] font-medium
              uppercase tracking-[0.14em]
              opacity-60
              sm:text-xs
            "
          >
            {eyebrow}
          </span>

          <strong
            className="
              block
              text-2xl font-medium
              leading-[0.92]
              tracking-[-0.08em]
              sm:text-4xl
            "
          >
            {title}
          </strong>

          <span
            className="
              line-clamp-2
              text-sm
              leading-[1.35]
              opacity-40
              transition-opacity duration-300
              group-hover:opacity-60
              sm:text-base
            "
          >
            {description}
          </span>
        </span>

        <ArrowUpRight
          aria-hidden="true"
          size={20}
          strokeWidth={1.5}
          className="
              ml-auto
              shrink-0
              opacity-50
              transition-all duration-300
              group-hover:rotate-45
              group-hover:opacity-100
              sm:size-[22px]
            "
        />
      </Link>
    </motion.li>
  );
}

function AnimatedList({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.ul
      className="flex flex-col gap-0 p-0 list-none border-t border-border"
      initial={reduced ? false : { opacity: 0 }}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -8% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduced ? 0 : 0.12 } },
      }}
    >
      {children}
    </motion.ul>
  );
}

export function StoryList({ items }: { items: Story[] }) {
  return (
    <AnimatedList>
      {items.map((item) => (
        <ListRow
          key={item.slug}
          href={storyPath(item.slug)}
          eyebrow={`${item.category} · ${item.date}`}
          title={item.title}
          description={item.dek}
          image={item.image}
        />
      ))}
    </AnimatedList>
  );
}

export function InterviewList({ items }: { items: Interview[] }) {
  return (
    <AnimatedList>
      {items.map((item) => (
        <ListRow
          key={item.slug}
          href={interviewPath(item.slug)}
          eyebrow={item.role}
          title={item.name}
          description={`“${item.quote}”`}
          image={item.image}
        />
      ))}
    </AnimatedList>
  );
}

export function MagazineList({ items }: { items: Magazine[] }) {
  return (
    <AnimatedList>
      {items.map((item) => (
        <ListRow
          key={item.slug}
          href={magazinePath(item.slug)}
          eyebrow={item.issue}
          title={item.title}
          description={`${item.price} · ${item.description}`}
          image={item.image}
        />
      ))}
    </AnimatedList>
  );
}
