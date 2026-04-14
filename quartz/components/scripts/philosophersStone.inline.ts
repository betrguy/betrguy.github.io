document.addEventListener("nav", () => {
  const shell = document.querySelector(".ps-shell") as HTMLElement | null
  if (!shell) return

  const shapeTargets = Array.from(shell.querySelectorAll("[data-shape-hover]")) as HTMLElement[]
  const titleToggle = shell.querySelector(".ps-title-toggle") as HTMLButtonElement | null

  const setReveal = (shape: string) => {
    shell.dataset.activeReveal = shape
  }

  const handleEnter = (event: Event) => {
    if (shell.dataset.lockedReveal === "all") return
    const target = event.currentTarget as HTMLElement
    setReveal(target.dataset.shapeHover ?? "none")
  }

  const handleLeave = () => {
    if (shell.dataset.lockedReveal === "all") return
    setReveal("none")
  }

  const handleToggleAll = () => {
    const locked = shell.dataset.lockedReveal === "all"
    shell.dataset.lockedReveal = locked ? "none" : "all"
    setReveal(locked ? "none" : "all")
    titleToggle?.classList.toggle("is-active", !locked)
  }

  shapeTargets.forEach((shape) => {
    shape.addEventListener("pointerenter", handleEnter)
    shape.addEventListener("pointerleave", handleLeave)
  })
  titleToggle?.addEventListener("click", handleToggleAll)
  setReveal("none")

  window.addCleanup(() => {
    shapeTargets.forEach((shape) => {
      shape.removeEventListener("pointerenter", handleEnter)
      shape.removeEventListener("pointerleave", handleLeave)
    })
    titleToggle?.removeEventListener("click", handleToggleAll)
  })
})
