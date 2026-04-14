document.addEventListener("nav", () => {
  const shell = document.querySelector(".ps-shell") as HTMLElement | null
  if (!shell) return

  const shapeTargets = Array.from(shell.querySelectorAll("[data-shape-select]")) as HTMLElement[]
  const titleToggle = shell.querySelector(".ps-title-toggle") as HTMLButtonElement | null

  const setReveal = (shape: string) => {
    shell.dataset.activeReveal = shape
  }

  const handleToggleAll = () => {
    const nextReveal = shell.dataset.activeReveal === "all" ? "none" : "all"
    setReveal(nextReveal)
    titleToggle?.classList.toggle("is-active", nextReveal === "all")
  }

  const handleSelectShape = (event: Event) => {
    const target = event.currentTarget as HTMLElement
    const shape = target.dataset.shapeSelect ?? "none"
    const nextReveal = shell.dataset.activeReveal === shape ? "none" : shape
    setReveal(nextReveal)
    titleToggle?.classList.toggle("is-active", nextReveal === "all")
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setReveal("none")
      titleToggle?.classList.remove("is-active")
    }
  }

  shapeTargets.forEach((shape) => shape.addEventListener("click", handleSelectShape))
  titleToggle?.addEventListener("click", handleToggleAll)
  document.addEventListener("keydown", handleKeydown)
  setReveal("none")

  window.addCleanup(() => {
    shapeTargets.forEach((shape) => shape.removeEventListener("click", handleSelectShape))
    titleToggle?.removeEventListener("click", handleToggleAll)
    document.removeEventListener("keydown", handleKeydown)
  })
})
