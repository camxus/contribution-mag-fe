"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { usePrivacyPolicy } from "@/hooks/use-content-query";

const ease = [0.22, 1, 0.36, 1] as const;

export default function PrivacyPolicyPage() {
  const query = usePrivacyPolicy();
  const reduced = useReducedMotion();

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <SiteHeader />

      <section className="mx-auto w-full max-w-[1380px] px-[5vw] pb-24 pt-[100px] sm:pb-28 sm:pt-[130px] lg:pb-36 lg:pt-[160px]">
        {/* ---------------------------------------------------------------- */}
        {/* Page header                                                        */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial={
            reduced
              ? false
              : {
                  opacity: 0,
                  y: 30,
                }
          }
          animate={
            reduced
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          transition={{
            duration: 0.8,
            ease,
          }}
        >
          <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
            <p className="eyebrow">
              Contribution Magazine · Legal
            </p>

            <span className="hidden text-[9px] uppercase tracking-[0.14em] text-muted-foreground sm:block">
              Privacy
            </span>
          </div>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* Title                                                              */}
        {/* ---------------------------------------------------------------- */}

        <motion.h1
          initial={
            reduced
              ? false
              : {
                  opacity: 0,
                  y: 70,
                  filter: "blur(8px)",
                }
          }
          animate={
            reduced
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }
          }
          transition={{
            duration: 1,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mb-12
            mt-0
            max-w-[1200px]
            text-[clamp(62px,13vw,180px)]
            font-normal
            uppercase
            leading-[0.78]
            tracking-[-0.12em]
          "
        >
          Privacy Policy
        </motion.h1>

        {/* ---------------------------------------------------------------- */}
        {/* Content area                                                       */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid grid-cols-1 gap-12 border-t border-border pt-10 lg:grid-cols-[0.3fr_0.7fr] lg:gap-[8vw] lg:pt-14">
          {/* Sidebar */}
          <motion.aside
            initial={
              reduced
                ? false
                : {
                    opacity: 0,
                    x: -15,
                  }
            }
            animate={
              reduced
                ? undefined
                : {
                    opacity: 1,
                    x: 0,
                  }
            }
            transition={{
              duration: 0.65,
              delay: 0.35,
              ease,
            }}
            className="hidden lg:block"
          >
            <div className="sticky top-[100px]">
              <p className="eyebrow">
                Legal Information
              </p>

              <div className="mt-5 h-px w-10 bg-border" />

              <p className="mt-5 max-w-[170px] text-[10px] uppercase leading-[1.5] tracking-[0.1em] text-muted-foreground">
                Please read this policy carefully to
                understand how information is handled.
              </p>
            </div>
          </motion.aside>

          {/* Policy */}
          <motion.div
            initial={
              reduced
                ? false
                : {
                    opacity: 0,
                    y: 35,
                  }
            }
            animate={
              reduced
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            transition={{
              duration: 0.85,
              delay: 0.3,
              ease,
            }}
            className="
              legal-content
              max-w-[760px]
              text-[16px]
              leading-[1.7]
              text-foreground/75
              sm:text-[17px]
            "
          >
            {query.isLoading ? (
              <p className="text-sm text-muted-foreground">
                Loading privacy policy...
              </p>
            ) : query.error ? (
              <p className="text-sm text-destructive">
                Unable to load privacy policy.
              </p>
            ) : query.data?.content_html ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: query.data.content_html,
                }}
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                Privacy policy information is not
                currently available.
              </p>
            )}
          </motion.div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Footer marker                                                      */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial={
            reduced
              ? false
              : {
                  opacity: 0,
                  scaleX: 0.96,
                }
          }
          whileInView={
            reduced
              ? undefined
              : {
                  opacity: 1,
                  scaleX: 1,
                }
          }
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            ease,
          }}
          className="
            mt-24
            origin-left
            border-t
            border-border
            pt-5
            sm:mt-32
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-5
              text-[9px]
              uppercase
              tracking-[0.12em]
              text-muted-foreground
            "
          >
            <span>Contribution Magazine</span>
            <span>Legal · Privacy</span>
          </div>
        </motion.div>
      </section>

      <SiteFooter />
    </main>
  );
}