import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/philosophersStone.scss"
// @ts-ignore
import script from "./scripts/philosophersStone.inline"
import { classNames } from "../util/lang"
import { resolveRelative } from "../util/path"

type ShapeKind = "world-circle" | "mind-triangle" | "material-square" | "soul-circle"

type NoteEntry = {
  slug: string
  title: string
  href: string
  shape: ShapeKind
  x: number
  y: number
}

function titleFromSlug(slug: string) {
  return slug
    .split("/")
    .at(-1)!
    .replace(/^\d+-/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function hashString(input: string) {
  let hash = 2166136261
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function createRandom(seed: number) {
  let state = seed || 1
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    return state / 4294967296
  }
}

function scoreTerms(text: string, terms: string[]) {
  return terms.reduce((sum, term) => sum + (text.includes(term) ? 1 : 0), 0)
}

function inferShape(text: string, slug: string): ShapeKind {
  const soul = scoreTerms(text, [
    "know yourself",
    "change yourself",
    "william donahue",
    "self",
    "identity",
    "spiritual",
    "consciousness",
    "inner",
    "soul",
    "freak",
    "aquarius",
    "bible",
  ])
  const material = scoreTerms(text, [
    "build",
    "system",
    "local ai",
    "self hosted",
    "printing",
    "house",
    "tool",
    "infrastructure",
    "grid",
    "tracker",
    "app",
    "python",
  ])
  const mind = scoreTerms(text, [
    "brain",
    "idea",
    "thought",
    "meaning",
    "human version",
    "internet",
    "goals",
    "procrastination",
    "creative",
    "frame",
    "taste",
  ])
  const world = scoreTerms(text, [
    "war",
    "trade",
    "canada",
    "iran",
    "israel",
    "world",
    "country",
    "economy",
    "energy",
    "community",
    "neighborhood",
    "news",
  ])

  const ranked = [
    { shape: "soul-circle" as const, score: soul },
    { shape: "material-square" as const, score: material },
    { shape: "mind-triangle" as const, score: mind },
    { shape: "world-circle" as const, score: world },
  ].sort((left, right) => right.score - left.score)

  if (ranked[0].score > 0) return ranked[0].shape

  if (slug.includes("local") || slug.includes("build") || slug.includes("system")) {
    return "material-square"
  }
  if (slug.includes("yourself") || slug.includes("freak") || slug.includes("donahue")) {
    return "soul-circle"
  }
  if (slug.includes("world") || slug.includes("trade") || slug.includes("war")) {
    return "world-circle"
  }

  return "mind-triangle"
}

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

function inTriangle(x: number, y: number) {
  const x1 = 500
  const y1 = 80
  const x2 = 136.27
  const y2 = 710
  const x3 = 863.73
  const y3 = 710

  const denominator = (y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3)
  const a = ((y2 - y3) * (x - x3) + (x3 - x2) * (y - y3)) / denominator
  const b = ((y3 - y1) * (x - x3) + (x1 - x3) * (y - y3)) / denominator
  const c = 1 - a - b
  return a >= 0 && b >= 0 && c >= 0
}

function inSquare(x: number, y: number) {
  return x >= 331.2 && x <= 668.8 && y >= 372.4 && y <= 710
}

function inSoulCircle(x: number, y: number) {
  return distance({ x, y }, { x: 500, y: 541.2 }) <= 168.8
}

function generatePoint(shape: ShapeKind, random: () => number) {
  if (shape === "soul-circle") {
    const angle = random() * Math.PI * 2
    const radius = Math.sqrt(random()) * 120
    return {
      x: 500 + Math.cos(angle) * radius,
      y: 541.2 + Math.sin(angle) * radius,
    }
  }

  if (shape === "material-square") {
    return {
      x: 360 + random() * 280,
      y: 400 + random() * 280,
    }
  }

  if (shape === "mind-triangle") {
    const r1 = Math.sqrt(random())
    const r2 = random()
    const x = (1 - r1) * 500 + r1 * (1 - r2) * 136.27 + r1 * r2 * 863.73
    const y = (1 - r1) * 120 + r1 * (1 - r2) * 690 + r1 * r2 * 690
    return { x, y }
  }

  const angle = random() * Math.PI * 2
  const radius = 320 + random() * 78
  return {
    x: 500 + Math.cos(angle) * radius,
    y: 500 + Math.sin(angle) * radius,
  }
}

function validForShape(shape: ShapeKind, x: number, y: number) {
  if (shape === "soul-circle") return inSoulCircle(x, y)
  if (shape === "material-square") return inSquare(x, y)
  if (shape === "mind-triangle") return inTriangle(x, y) && !inSquare(x, y)
  return distance({ x, y }, { x: 500, y: 500 }) <= 420 && !inTriangle(x, y)
}

function generatePlacements(notes: Omit<NoteEntry, "x" | "y">[]) {
  const placed: NoteEntry[] = []

  for (const note of notes) {
    const random = createRandom(hashString(note.slug))
    const minDistance =
      note.shape === "soul-circle" ? 66 : note.shape === "material-square" ? 82 : 90
    let best: { x: number; y: number; clearance: number } | null = null

    for (let attempt = 0; attempt < 280; attempt++) {
      const point = generatePoint(note.shape, random)
      if (!validForShape(note.shape, point.x, point.y)) continue

      let clearance = Infinity
      for (const existing of placed) {
        const required = existing.shape === note.shape ? minDistance : minDistance - 16
        const current = distance(existing, point) - required
        clearance = Math.min(clearance, current)
      }

      if (clearance >= 0 || placed.length === 0) {
        best = { ...point, clearance }
        break
      }

      if (!best || clearance > best.clearance) {
        best = { ...point, clearance }
      }
    }

    placed.push({
      ...note,
      x: best?.x ?? 500,
      y: best?.y ?? 500,
    })
  }

  return placed
}

export default (() => {
  const PhilosophersStone: QuartzComponent = ({
    fileData,
    displayClass,
    allFiles,
  }: QuartzComponentProps) => {
    if (fileData.slug !== "index") {
      return null
    }

    const notes = allFiles
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
        const title = String(file.frontmatter?.title ?? titleFromSlug(slug))
        const description = String(
          (file as Record<string, unknown>).description ?? "",
        ).toLowerCase()
        const text = `${title.toLowerCase()} ${slug.toLowerCase()} ${description}`

        return {
          slug,
          title,
          href: resolveRelative(fileData.slug!, slug),
          shape: inferShape(text, slug.toLowerCase()),
        }
      })
      .sort((left, right) => left.title.localeCompare(right.title))

    const noteEntries = generatePlacements(notes)

    return (
      <section class={classNames(displayClass, "ps-shell")} data-active-reveal="none">
        <div class="ps-backdrop">
          <div class="ps-backdrop-ring ps-backdrop-ring-left" />
          <div class="ps-backdrop-ring ps-backdrop-ring-right" />
          <div class="ps-noise" />
        </div>

        <div class="ps-stage">
          <div class="ps-stage-orb ps-stage-orb-left" />
          <div class="ps-stage-orb ps-stage-orb-right" />

          <div class="ps-map-frame">
            <div class="ps-titleblock">
              <button class="ps-title-toggle" type="button" aria-label="Show or hide all notes">
                <h1 class="ps-title">Perfect Loop</h1>
              </button>
              <p class="ps-subtitle">"Man becomes the reality that he engenders"</p>
            </div>
            <div class="ps-map">
              <div class="ps-core-glow" />
              <svg class="ps-symbol" viewBox="0 0 1000 1000" aria-hidden="true">
                <circle
                  class="shape-hit shape-hit-world"
                  data-shape-select="world-circle"
                  cx="500"
                  cy="500"
                  r="420"
                />
                <polygon
                  class="shape-hit shape-hit-mind"
                  data-shape-select="mind-triangle"
                  points="500,80 136.27,710 863.73,710"
                />
                <rect
                  class="shape-hit shape-hit-material"
                  data-shape-select="material-square"
                  x="331.2"
                  y="372.4"
                  width="337.6"
                  height="337.6"
                />
                <circle
                  class="shape-hit shape-hit-soul"
                  data-shape-select="soul-circle"
                  cx="500"
                  cy="541.2"
                  r="168.8"
                />
                <circle class="world-circle" cx="500" cy="500" r="420" />
                <polygon class="mind-triangle" points="500,80 136.27,710 863.73,710" />
                <rect class="material-square" x="331.2" y="372.4" width="337.6" height="337.6" />
                <circle class="soul-circle" cx="500" cy="541.2" r="168.8" />
              </svg>

              <div class="ps-note-layer">
                {noteEntries.map((note) => (
                  <a
                    href={note.href}
                    class={`ps-note shape-${note.shape}`}
                    data-shape={note.shape}
                    style={
                      {
                        left: `${(note.x / 1000) * 100}%`,
                        top: `${(note.y / 1000) * 100}%`,
                        "--note-delay": `${(hashString(note.slug) % 9) * 35}ms`,
                      } as never
                    }
                  >
                    <span class="ps-note-dot" />
                    <span class="ps-note-label">{note.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  PhilosophersStone.css = style
  PhilosophersStone.afterDOMLoaded = script
  return PhilosophersStone
}) satisfies QuartzComponentConstructor
