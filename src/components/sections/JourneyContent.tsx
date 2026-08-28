import { Surface } from "@/components/ui/Surface";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Motion";
import { ContentCard } from "@/components/cards/ContentCard";
import { journeyCategories, journeyPosts } from "@/lib/content";
import { site, waMessages, whatsappLink } from "@/lib/site";

/**
 * SECTION 09 — content feed.
 * The card architecture is ready for Instagram posts, reels, videos or
 * articles: set `href` (and a thumbnail) on an entry in content.ts and the
 * card becomes a live link. Until then cards render as inactive placeholders
 * rather than dead links.
 */
export function JourneyContent() {
  const hasSocial = Boolean(site.socials.instagram || site.socials.youtube);

  return (
    <Surface tone="ink" grid className="section" aria-labelledby="journal-heading">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel index="08" className="text-bone/60">
                Training journal
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionHeading id="journal-heading" className="mt-6 text-bone">
                Follow the journey.
              </SectionHeading>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-6 lg:pb-2">
            <p className="copy max-w-[44ch] text-bone/60">
              Training breakdowns, nutrition explainers, weekly updates and
              honest progress notes.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {journeyCategories.map((c) => (
                <li
                  key={c}
                  className="label rounded-sm border border-ink-line px-2.5 py-1.5 text-bone/55"
                >
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <RevealGroup
          as="ul"
          stagger={0.06}
          className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
        >
          {journeyPosts.map((post) => (
            <RevealItem key={post.title} as="li">
              <ContentCard post={post} className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>

        {hasSocial ? (
          <Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              {site.socials.instagram && (
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label rounded-sm border border-ink-line px-4 py-3 text-bone/70 transition-colors hover:border-accent hover:text-bone"
                >
                  Instagram
                </a>
              )}
              {site.socials.youtube && (
                <a
                  href={site.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label rounded-sm border border-ink-line px-4 py-3 text-bone/70 transition-colors hover:border-accent hover:text-bone"
                >
                  YouTube
                </a>
              )}
            </div>
          </Reveal>
        ) : (
          <Reveal>
            {/*
              No fake follower counts and no dead social icons. Add real handles
              to `site.socials` in src/lib/site.ts and this becomes a live link
              row; add a `href` to a post in src/lib/content.ts and that card
              becomes clickable.
            */}
            <div className="mt-8 flex flex-col gap-3 border-l-2 border-ink-muted pl-4 sm:flex-row sm:items-center sm:gap-5">
              <p className="text-[0.875rem] leading-relaxed text-bone/55">
                New training and nutrition content is published regularly.
              </p>
              <a
                href={whatsappLink(waMessages.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline -my-3 inline-block py-3 font-display text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-bone/80 hover:text-accent-text"
              >
                Ask Vignesh a question
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </Surface>
  );
}
