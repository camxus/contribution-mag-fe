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

const ink = "text-[#0b0b0b]";

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
}) {
  const reduced = useReducedMotion();

  return (
    <motion.li
      variants={{
        hidden: {
          opacity: 0,
          y: 18,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reduced ? 0 : 0.7,
            ease,
          },
        },
      }}
      whileHover={
        reduced
          ? undefined
          : {
              opacity: 0.78,
            }
      }
    >
      <Link
        href={href}
        className={`
          group
          flex w-full items-center
          gap-4
          border-t border-black/15
          py-5
          sm:gap-6 sm:py-6
          ${ink}
        `}
      >
        {/* Image */}
        <span
          className="
            relative
            aspect-square
            w-20
            shrink-0
            overflow-hidden
            bg-black/5
            sm:w-24
          "
        >
          <img
            src={image}
            alt={imageAlt(title)}
            className="
              block
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.04]
            "
          />

          <span
            className="
              pointer-events-none
              absolute
              inset-0
              bg-black/0
              transition-colors
              duration-500
              group-hover:bg-black/5
            "
          />
        </span>

        {/* Content */}
        <span
          className="
            flex
            min-w-0
            flex-1
            flex-col
            justify-center
            gap-1
          "
        >
          <span
            className="
              block
              truncate
              text-[9px]
              font-medium
              uppercase
              tracking-[0.14em]
              text-black/55
              sm:text-[10px]
            "
          >
            {eyebrow}
          </span>

          <strong
            className="
              block
              text-[clamp(24px,3vw,42px)]
              font-medium
              leading-[0.92]
              tracking-[-0.075em]
              text-[#0b0b0b]
              transition-opacity
              duration-300
              group-hover:opacity-70
            "
          >
            {title}
          </strong>

          <span
            className="
              line-clamp-2
              max-w-[700px]
              text-[13px]
              leading-[1.4]
              text-black/55
              transition-colors
              duration-300
              group-hover:text-black/70
              sm:text-[15px]
            "
          >
            {description}
          </span>
        </span>

        {/* Arrow */}
        <span
          className="
            ml-auto
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            border
            border-black/15
            text-black
            transition-all
            duration-300
            group-hover:border-black
            group-hover:bg-black
            group-hover:text-white
            sm:h-10
            sm:w-10
          "
        >
          <ArrowUpRight
            aria-hidden="true"
            size={18}
            strokeWidth={1.5}
            className="
              transition-transform
              duration-300
              group-hover:rotate-45
            "
          />
        </span>
      </Link>
    </motion.li>
  );
}

function AnimatedList({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <motion.ul
      className="
        m-0
        flex
        list-none
        flex-col
        gap-0
        border-t
        border-black/15
        p-0
      "
      initial={reduced ? "visible" : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{
        once: true,
        amount: 0.18,
        margin: "0px 0px -8% 0px",
      }}
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: reduced ? 0 : 0.1,
          },
        },
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