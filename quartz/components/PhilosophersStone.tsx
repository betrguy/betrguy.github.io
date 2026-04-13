import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import style from "./styles/philosophersStone.scss"
import { classNames } from "../util/lang"

export default (() => {
  const PhilosophersStone: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
  }: QuartzComponentProps) => {
    if (fileData.slug !== "index") {
      return null
    }

    const categories = {
      universe: allFiles.filter(f => 
        f.slug?.includes("Iran") || 
        f.slug?.includes("Canada") || 
        f.slug?.includes("Nuclear") || 
        f.slug?.includes("Aquarius") ||
        f.slug?.includes("Trade") ||
        f.slug?.includes("War")
      ),
      mind: allFiles.filter(f => 
        f.slug?.includes("self-hosted") || 
        f.slug?.includes("Building-small") || 
        f.slug?.includes("Local-AI") || 
        f.slug?.includes("meaningful") ||
        f.slug?.includes("brain-blast") ||
        f.slug?.includes("Goals") ||
        f.slug?.includes("What-to-do")
      ),
      material: allFiles.filter(f => 
        f.slug?.includes("New-World-Grid") || 
        f.slug?.includes("Local-info") || 
        f.slug?.includes("3D-Printing") ||
        f.slug?.includes("Troubleshooting") ||
        f.slug?.includes("Shadow-GDP") ||
        f.slug?.includes("Building-self")
      ),
      soul: allFiles.filter(f => 
        f.slug?.includes("Know-Yourself") || 
        f.slug?.includes("Change-Yourself") || 
        f.slug?.includes("Being-A-Freak") || 
        f.slug?.includes("William-Donahue") ||
        f.slug?.includes("context") ||
        f.slug?.includes("reflections")
      ),
    }

    const center = { x: 250, y: 250 }
    const circleRadius = 240
    const triangleRadius = 200
    const t1 = { x: 250, y: 250 - triangleRadius }
    const t2 = { x: 250 + triangleRadius * 0.866, y: 250 + triangleRadius * 0.5 }
    const t3 = { x: 250 - triangleRadius * 0.866, y: 250 + triangleRadius * 0.5 }
    const squareSide = 120
    const s_top = 250 - squareSide / 2
    const s_left = 250 - squareSide / 2
    const innerCircleRadius = 50

    return (
      <div class={classNames(displayClass, "philosophers-stone-container")}>
        <svg viewBox="0 0 500 500" class="ps-svg">
          <g class="ps-node universe">
            <circle cx={center.x} cy={center.y} r={circleRadius} class="ps-shape ps-animate-rotate" />
            <text x={center.x} y={center.y - circleRadius - 10} class="ps-label">The Universe</text>
            {categories.universe.map((f, i) => {
              const angle = (i / categories.universe.length) * 2 * Math.PI - Math.PI / 2
              const x = center.x + (circleRadius + 25) * Math.cos(angle)
              const y = center.y + (circleRadius + 25) * Math.sin(angle)
              const title = f.frontmatter?.title ?? f.name
              const textAnchor = x > center.x ? "start" : "end"
              return (
                <a href={resolveRelative(fileData.slug!, f.slug!)}>
                  <text x={x} y={y} class="ps-label small-label" style={{ textAnchor }}>
                    {title.length > 20 ? title.substring(0, 17) + "..." : title}
                  </text>
                </a>
              )
            })}
          </g>

          <g class="ps-node mind">
            <path d={"M " + t1.x + " " + t1.y + " L " + t2.x + " " + t2.y + " L " + t3.x + " " + t3.y + " Z"} class="ps-shape" />
            <text x={center.x} y={t1.y - 10} class="ps-label">The Mind</text>
            {categories.mind.map((f, i) => {
              let x, y;
              if (i === 0) { x = (t1.x + t2.x) / 2; y = (t1.y + t2.y) / 2 }
              else if (i === 1) { x = (t2.x + t3.x) / 2; y = (t2.y + t3.y) / 2 }
              else if (i === 2) { x = (t3.x + t1.x) / 2; y = (t3.y + t1.y) / 2 }
              else { x = center.x; y = t2.y + 15 + (i * 15) }
              const title = f.frontmatter?.title ?? f.name
              const textAnchor = x > center.x ? "start" : x === center.x ? "middle" : "end"
              return (
                <a href={resolveRelative(fileData.slug!, f.slug!)}>
                  <text x={x + (x > center.x ? 15 : -15)} y={y} class="ps-label small-label" style={{ textAnchor }}>
                    {title.length > 20 ? title.substring(0, 17) + "..." : title}
                  </text>
                </a>
              )
            })}
          </g>

          <g class="ps-node material">
            <rect x={s_left} y={s_top} width={squareSide} height={squareSide} class="ps-shape" />
            <text x={center.x} y={s_top - 5} class="ps-label">The Material</text>
            {categories.material.map((f, i) => {
              let x, y;
              if (i === 0) { x = s_left - 10; y = 250 }
              else if (i === 1) { x = s_left + squareSide + 10; y = 250 }
              else if (i === 2) { x = 250; y = s_top + squareSide + 15 }
              else { x = 250; y = s_top + squareSide + 30 + (i * 15) }
              const title = f.frontmatter?.title ?? f.name
              const textAnchor = x > center.x ? "start" : x === center.x ? "middle" : "end"
              return (
                <a href={resolveRelative(fileData.slug!, f.slug!)}>
                  <text x={x} y={y} class="ps-label small-label" style={{ textAnchor }}>
                    {title.length > 20 ? title.substring(0, 17) + "..." : title}
                  </text>
                </a>
              )
            })}
          </g>

          <g class="ps-node soul">
            <circle cx={center.x} cy={center.y} r={innerCircleRadius} class="ps-shape ps-animate-pulse" />
            <text x={center.x} y={center.y + 5} class="ps-label">The Soul</text>
             {categories.soul.map((f, i) => {
              const angle = (i / categories.soul.length) * 2 * Math.PI - Math.PI / 2
              const x = center.x + (innerCircleRadius - 15) * Math.cos(angle)
              const y = center.y + (innerCircleRadius - 15) * Math.sin(angle)
              const title = f.frontmatter?.title ?? f.name
              return (
                <a href={resolveRelative(fileData.slug!, f.slug!)}>
                  <text x={x} y={y} class="ps-label small-label" style={{ fontSize: "7px", textAnchor: "middle" }}>
                    {title.length > 10 ? title.substring(0, 8) + "..." : title}
                  </text>
                </a>
              )
            })}
          </g>
        </svg>
      </div>
    )
  }

  PhilosophersStone.css = style
  return PhilosophersStone
}) satisfies QuartzComponentConstructor
