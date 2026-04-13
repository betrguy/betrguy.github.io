import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/philosophersStone.scss"
import { classNames } from "../util/lang"
import { resolveRelative } from "../util/path"

type NoteEntry = {
  slug: string
  title: string
  href: string
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

function generatePlacements(notes: Omit<NoteEntry, "x" | "y">[]) {
  const placed: NoteEntry[] = []
  const minDistance = 92
  const centerX = 500
  const centerY = 500
  const maxRadius = 392

  for (const note of notes) {
    const random = createRandom(hashString(note.slug))
    let best: { x: number; y: number; clearance: number } | null = null

    for (let attempt = 0; attempt < 240; attempt++) {
      const angle = random() * Math.PI * 2
      const radius = Math.sqrt(random()) * maxRadius
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      const edgeDistance = Math.hypot(x - centerX, y - centerY)

      if (edgeDistance > maxRadius) continue

      let clearance = Infinity
      for (const existing of placed) {
        const distance = Math.hypot(existing.x - x, existing.y - y)
        clearance = Math.min(clearance, distance)
      }

      if (clearance >= minDistance || placed.length === 0) {
        best = { x, y, clearance }
        break
      }

      if (!best || clearance > best.clearance) {
        best = { x, y, clearance }
      }
    }

    placed.push({
      ...note,
      x: best?.x ?? centerX,
      y: best?.y ?? centerY,
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
      .map((file) => ({
        slug: file.slug!,
        title: String(file.frontmatter?.title ?? titleFromSlug(file.slug!)),
        href: resolveRelative(fileData.slug!, file.slug!),
      }))
      .sort((left, right) => left.title.localeCompare(right.title))

    const noteEntries = generatePlacements(notes)

    return (
      <section class={classNames(displayClass, "ps-shell")}>
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
              <h1 class="ps-title">Perfect Loop</h1>
              <p class="ps-subtitle">"Man becomes the reality that he engenders"</p>
            </div>
            <div class="ps-map">
              <div class="ps-core-glow" />
              <svg class="ps-symbol" viewBox="0 0 1000 1000" aria-hidden="true">
                <circle class="ps-outer-circle" cx="500" cy="500" r="420" />
                <polygon class="ps-triangle" points="500,80 136.27,710 863.73,710" />
                <rect class="ps-inner-square" x="331.2" y="372.4" width="337.6" height="337.6" />
                <circle class="ps-core-circle" cx="500" cy="541.2" r="168.8" />
              </svg>

              <div class="ps-note-layer">
                {noteEntries.map((note) => (
                  <a
                    href={note.href}
                    class="ps-note"
                    style={
                      {
                        left: `${(note.x / 1000) * 100}%`,
                        top: `${(note.y / 1000) * 100}%`,
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
  return PhilosophersStone
}) satisfies QuartzComponentConstructor
