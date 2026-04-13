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
                <polygon class="ps-triangle" points="500,80 136.27,710 863.73,710" />
                <rect class="ps-inner-square" x="331.2" y="372.4" width="337.6" height="337.6" />
                <circle class="ps-core-circle" cx="500" cy="541.2" r="168.8" />
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
