document.addEventListener("nav", () => {
  const shell = document.querySelector(".ps-shell") as HTMLElement | null
  if (!shell) return

  shell.dataset.notesReady = "true"
  if (shell.dataset.bound === "true") return
  shell.dataset.bound = "true"

  const trigger = shell.querySelector(".ps-subtitle-trigger") as HTMLButtonElement | null
  const card = shell.querySelector(".ps-word-card") as HTMLElement | null
  const imageButtons = Array.from(
    shell.querySelectorAll(".ps-backdrop-image"),
  ) as HTMLButtonElement[]
  const viewer = shell.querySelector(".ps-image-viewer") as HTMLElement | null
  const viewerBackdrop = shell.querySelector(".ps-image-viewer-backdrop") as HTMLButtonElement | null
  const viewerClose = shell.querySelector(".ps-image-viewer-close") as HTMLButtonElement | null
  const viewerImage = shell.querySelector(".ps-image-viewer-full") as HTMLImageElement | null

  const closeCard = () => {
    if (!trigger || !card) return
    trigger.setAttribute("aria-expanded", "false")
    card.setAttribute("aria-hidden", "true")
    shell.dataset.wordCardOpen = "false"
  }

  const openCard = () => {
    if (!trigger || !card) return
    trigger.setAttribute("aria-expanded", "true")
    card.setAttribute("aria-hidden", "false")
    shell.dataset.wordCardOpen = "true"
  }

  const closeViewer = () => {
    if (!viewer || !viewerImage) return
    shell.dataset.imageViewerOpen = "false"
    viewer.setAttribute("aria-hidden", "true")
    viewerImage.removeAttribute("src")
    viewerImage.alt = ""
  }

  const openViewer = (src: string, alt: string) => {
    if (!viewer || !viewerImage) return
    shell.dataset.imageViewerOpen = "true"
    viewer.setAttribute("aria-hidden", "false")
    viewerImage.src = src
    viewerImage.alt = alt
  }

  if (trigger && card) {
    trigger.addEventListener("click", (event) => {
      event.stopPropagation()
      if (shell.dataset.wordCardOpen === "true") {
        closeCard()
        return
      }

      openCard()
    })
  }

  imageButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation()
      const src = button.dataset.fullImage
      const alt = button.dataset.fullImageAlt ?? ""
      if (!src) return
      openViewer(src, alt)
    })
  })

  viewerBackdrop?.addEventListener("click", closeViewer)
  viewerClose?.addEventListener("click", closeViewer)

  document.addEventListener("click", (event) => {
    const target = event.target as Node | null
    if (!target) return
    if (trigger && card && (trigger.contains(target) || card.contains(target))) return
    closeCard()
  })

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCard()
      closeViewer()
    }
  })
})
