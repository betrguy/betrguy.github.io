import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/philosophersStone.scss"
import { classNames } from "../util/lang"

export default (() => {
  const PhilosophersStone: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    if (fileData.slug !== "index") {
      return null
    }

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
            <div class="ps-map">
              <div class="ps-core-glow" />
              <svg class="ps-symbol" viewBox="0 0 1000 1000" aria-hidden="true">
                <circle class="ps-outer-circle" cx="500" cy="500" r="420" />
                <polygon class="ps-triangle" points="500,170 235,640 765,640" />
                <rect class="ps-inner-square" x="380" y="380" width="240" height="240" rx="22" />
                <circle class="ps-core-circle" cx="500" cy="500" r="56" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    )
  }

  PhilosophersStone.css = style
  return PhilosophersStone
}) satisfies QuartzComponentConstructor
