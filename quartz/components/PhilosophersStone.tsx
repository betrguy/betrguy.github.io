import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import style from "./styles/philosophersStone.scss"
// @ts-ignore
import script from "./scripts/philosophersStone.inline"
import { classNames } from "../util/lang"

type QuadrantId = "inner-conceptual" | "outer-conceptual" | "inner-physical" | "outer-physical"

type LayoutSeed = {
  match: string
  x: number
  y: number
  accent: string
  size?: "sm" | "md" | "lg"
}

type NoteEntry = {
  slug: string
  title: string
  href: string
  description: string
  x: number
  y: number
  xPct: string
  yPct: string
  accent: string
  size: "sm" | "md" | "lg"
  quadrant: QuadrantId
}

const layoutSeeds: LayoutSeed[] = [
  { match: "know-yourself", x: -0.58, y: -0.58, accent: "amber", size: "lg" },
  { match: "change-yourself", x: -0.34, y: -0.18, accent: "amber" },
  { match: "being-a-freak", x: -0.72, y: -0.1, accent: "crimson" },
  { match: "william-donahue", x: -0.44, y: -0.72, accent: "violet" },
  { match: "brain-blast", x: -0.16, y: -0.54, accent: "violet" },
  { match: "goals", x: 0.14, y: -0.44, accent: "teal" },
  { match: "what-to-do-if-you-lose-your-job", x: 0.58, y: -0.32, accent: "teal" },
  { match: "3d-printing-houses", x: 0.82, y: -0.08, accent: "teal", size: "lg" },
  { match: "building-self-hosted-systems-with-ai", x: 0.34, y: -0.06, accent: "teal", size: "lg" },
  { match: "local-ai-is-super-important-and-useful", x: 0.74, y: 0.22, accent: "teal" },
  { match: "building-small-and-local", x: 0.38, y: 0.22, accent: "jade" },
  { match: "local-info-you-can-trust", x: 0.22, y: 0.58, accent: "jade" },
  { match: "troubleshooting-my-pegasus-writer", x: 0.82, y: 0.52, accent: "jade" },
  { match: "new-world-grid", x: -0.24, y: 0.18, accent: "crimson", size: "lg" },
  { match: "meaningful-human-version-of-the-internet", x: -0.48, y: 0.28, accent: "violet" },
  { match: "nuclear-fusion-breakthrough-tracker", x: -0.18, y: 0.66, accent: "crimson" },
  { match: "age-of-aquarius", x: -0.72, y: 0.52, accent: "violet" },
  { match: "canada-and-china-trade", x: -0.52, y: 0.78, accent: "crimson" },
  { match: "iran-vs-israel-war-", x: -0.08, y: 0.84, accent: "crimson" },
]

const quadrantMeta: Record<
  QuadrantId,
  {
    label: string
    kicker: string
    blurb: string
  }
> = {
  "inner-conceptual": {
    label: "Inner / Conceptual",
    kicker: "Identity, myth, private cognition",
    blurb: "Notes concerned with self-interpretation, private meaning, and internal orientation.",
  },
  "outer-conceptual": {
    label: "Outer / Conceptual",
    kicker: "Systems, narratives, world models",
    blurb: "Ideas about culture, media, geopolitics, and the symbolic architecture of reality.",
  },
  "inner-physical": {
    label: "Inner / Physical",
    kicker: "Embodied practice, personal infrastructure",
    blurb: "Work tied to lived habits, personal tools, and the material side of self-direction.",
  },
  "outer-physical": {
    label: "Outer / Physical",
    kicker: "Local execution, buildable reality",
    blurb: "Projects, local systems, and tangible interventions in the world around you.",
  },
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function quadrantFor(x: number, y: number): QuadrantId {
  if (x < 0 && y < 0) return "inner-conceptual"
  if (x < 0 && y >= 0) return "outer-conceptual"
  if (x >= 0 && y < 0) return "inner-physical"
  return "outer-physical"
}

function titleFromSlug(slug: string) {
  return slug
    .split("/")
    .at(-1)!
    .replace(/^\d+-/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function excerptFor(file: QuartzComponentProps["allFiles"][number]) {
  const frontmatterDescription = String(file.frontmatter?.description ?? "").trim()
  const pluginDescription = String((file as Record<string, unknown>).description ?? "").trim()
  const text = frontmatterDescription || pluginDescription
  if (!text) {
    return "A note in the garden."
  }

  return text.length > 170 ? `${text.slice(0, 167).trimEnd()}...` : text
}

function scoreTerms(text: string, terms: string[]) {
  return terms.reduce((sum, term) => sum + (text.includes(term) ? 1 : 0), 0)
}

function fallbackPlacement(slug: string, text: string) {
  const conceptualScore = scoreTerms(text, [
    "meaning",
    "consciousness",
    "myth",
    "spiritual",
    "world",
    "internet",
    "trade",
    "war",
    "truth",
    "belief",
  ])
  const physicalScore = scoreTerms(text, [
    "build",
    "printer",
    "local",
    "system",
    "job",
    "house",
    "tool",
    "track",
    "hosting",
    "grid",
  ])
  const innerScore = scoreTerms(text, [
    "self",
    "identity",
    "mind",
    "habit",
    "soul",
    "meditation",
    "procrastination",
    "taste",
    "yourself",
  ])
  const outerScore = scoreTerms(text, [
    "community",
    "market",
    "country",
    "energy",
    "network",
    "economy",
    "people",
    "companies",
    "world",
  ])

  const x = clamp((physicalScore - conceptualScore) / 5, -0.85, 0.85)
  const y = clamp((outerScore - innerScore) / 5, -0.85, 0.85)
  const accent = x >= 0 ? (y >= 0 ? "jade" : "teal") : y >= 0 ? "crimson" : "violet"

  return {
    x: x || (slug.length % 6) / 10 - 0.25,
    y: y || ((slug.length + 3) % 6) / 10 - 0.25,
    accent,
    size: "md" as const,
  }
}

export default (() => {
  const PhilosophersStone: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
  }: QuartzComponentProps) => {
    if (fileData.slug !== "index") {
      return null
    }

    const noteEntries = allFiles
      .filter((file) => {
        const slug = file.slug
        return (
          typeof slug === "string" &&
          slug !== "index" &&
          !slug.startsWith(".") &&
          !slug.startsWith("tags/") &&
          !slug.endsWith("/index") &&
          !file.frontmatter?.draft
        )
      })
      .map((file) => {
        const slug = file.slug!
        const normalized = slug.toLowerCase()
        const seed = layoutSeeds.find((entry) => normalized.includes(entry.match))
        const title = String(file.frontmatter?.title ?? titleFromSlug(slug))
        const description = excerptFor(file)
        const fallback = fallbackPlacement(
          slug,
          `${title.toLowerCase()} ${description.toLowerCase()}`,
        )
        const x = clamp(seed?.x ?? fallback.x, -0.9, 0.9)
        const y = clamp(seed?.y ?? fallback.y, -0.9, 0.9)

        return {
          slug,
          title,
          href: resolveRelative(fileData.slug!, slug),
          description,
          x,
          y,
          xPct: `${((x + 1) / 2) * 100}%`,
          yPct: `${((y + 1) / 2) * 100}%`,
          accent: seed?.accent ?? fallback.accent,
          size: seed?.size ?? fallback.size,
          quadrant: quadrantFor(x, y),
        } satisfies NoteEntry
      })
      .sort((left, right) => left.title.localeCompare(right.title))

    const defaultNote = noteEntries.find((entry) => entry.size === "lg") ?? noteEntries[0]

    return (
      <section
        class={classNames(displayClass, "ps-shell")}
        data-default-note={defaultNote?.slug}
        data-active-quadrant="all"
      >
        <div class="ps-backdrop">
          <div class="ps-backdrop-ring ps-backdrop-ring-left" />
          <div class="ps-backdrop-ring ps-backdrop-ring-right" />
          <div class="ps-noise" />
        </div>

        <div class="ps-hero-stage">
          <div class="ps-hero-meta">
            <div class="ps-hero-chip">Squared circle atlas</div>
            <div class="ps-hero-chip ps-hero-chip-count">{noteEntries.length} notes</div>
          </div>

          <div class="ps-hero-titleblock">
            <h1 class="ps-title">Reality, arranged as a shape.</h1>
            <p class="ps-lede">
              Conceptual to physical. Inner life to outer life. The map is the homepage.
            </p>
          </div>

          <div class="ps-controls" role="tablist" aria-label="Filter note map">
            <button class="ps-filter is-active" data-ps-quadrant="all" type="button">
              All notes
            </button>
            {Object.entries(quadrantMeta).map(([id, meta]) => (
              <button class="ps-filter" data-ps-quadrant={id} type="button">
                {meta.label}
              </button>
            ))}
          </div>

          <div class="ps-main-grid">
            <div class="ps-stage-orb ps-stage-orb-left" />
            <div class="ps-stage-orb ps-stage-orb-right" />
            <div class="ps-stage-square ps-stage-square-a" />
            <div class="ps-stage-square ps-stage-square-b" />
            <div class="ps-stage-circle ps-stage-circle-a" />
            <div class="ps-stage-circle ps-stage-circle-b" />

            <div class="ps-map-panel">
              <div class="ps-map-frame">
                <div class="ps-axis-label ps-axis-label-top">Inner life</div>
                <div class="ps-axis-label ps-axis-label-bottom">Outer life</div>
                <div class="ps-axis-label ps-axis-label-left">Conceptual</div>
                <div class="ps-axis-label ps-axis-label-right">Physical</div>

                <div class="ps-map">
                  <div class="ps-map-square" />
                  <div class="ps-map-circle" />
                  <div class="ps-map-cross ps-map-cross-x" />
                  <div class="ps-map-cross ps-map-cross-y" />
                  <div class="ps-map-center" />

                  {noteEntries.map((entry, index) => (
                    <a
                      href={entry.href}
                      class={`ps-node accent-${entry.accent} size-${entry.size}`}
                      data-note-slug={entry.slug}
                      data-quadrant={entry.quadrant}
                      style={
                        {
                          left: entry.xPct,
                          top: entry.yPct,
                          "--delay": `${index * 40}ms`,
                        } as never
                      }
                    >
                      <span class="ps-node-core" />
                      <span class="ps-node-label">{entry.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div class="ps-detail-panel">
              <div class="ps-detail-card">
                <div class="ps-detail-header">
                  <div>
                    <div class="ps-summary-label">Focused note</div>
                    <h2>Read the garden by orientation.</h2>
                  </div>
                  <p>
                    Hover or focus any point on the map to preview it here before opening the note.
                  </p>
                </div>

                <div class="ps-previews">
                  {noteEntries.map((entry) => (
                    <article
                      class="ps-preview"
                      data-preview-slug={entry.slug}
                      data-quadrant={entry.quadrant}
                    >
                      <div class={`ps-preview-badge accent-${entry.accent}`}>
                        {quadrantMeta[entry.quadrant].label}
                      </div>
                      <h3>{entry.title}</h3>
                      <p>{entry.description}</p>
                      <div class="ps-preview-meta">{quadrantMeta[entry.quadrant].kicker}</div>
                      <a href={entry.href} class="ps-preview-link">
                        Open note
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="ps-quadrants">
          {Object.entries(quadrantMeta).map(([id, meta]) => {
            const notes = noteEntries.filter((entry) => entry.quadrant === id)

            return (
              <section class="ps-quadrant-card" data-quadrant-card={id}>
                <div class="ps-quadrant-head">
                  <div>
                    <div class="ps-summary-label">{meta.label}</div>
                    <h3>{meta.kicker}</h3>
                  </div>
                  <span class="ps-count-pill">{notes.length}</span>
                </div>
                <p class="ps-quadrant-blurb">{meta.blurb}</p>
                <div class="ps-note-list">
                  {notes.map((entry) => (
                    <a
                      href={entry.href}
                      class={`ps-note-card accent-${entry.accent}`}
                      data-note-slug={entry.slug}
                      data-quadrant={entry.quadrant}
                    >
                      <div class="ps-note-card-title">{entry.title}</div>
                      <div class="ps-note-card-copy">{entry.description}</div>
                    </a>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </section>
    )
  }

  PhilosophersStone.css = style
  PhilosophersStone.afterDOMLoaded = script
  return PhilosophersStone
}) satisfies QuartzComponentConstructor
