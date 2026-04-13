document.addEventListener("nav", () => {
  const shell = document.querySelector(".ps-shell") as HTMLElement | null
  if (!shell) return

  const filters = Array.from(shell.querySelectorAll("[data-ps-quadrant]")) as HTMLButtonElement[]
  const notes = Array.from(shell.querySelectorAll("[data-note-slug]")) as HTMLElement[]
  const previews = Array.from(shell.querySelectorAll("[data-preview-slug]")) as HTMLElement[]
  const defaultNote = shell.dataset.defaultNote

  const activateNote = (slug?: string | null) => {
    if (!slug) return

    shell.dataset.activeNote = slug
    notes.forEach((note) => {
      note.classList.toggle("is-active", note.dataset.noteSlug === slug)
    })
    previews.forEach((preview) => {
      preview.classList.toggle("is-active", preview.dataset.previewSlug === slug)
    })
  }

  const activateQuadrant = (quadrant: string) => {
    shell.dataset.activeQuadrant = quadrant
    filters.forEach((filter) => {
      filter.classList.toggle("is-active", filter.dataset.psQuadrant === quadrant)
    })
  }

  const handleQuadrant = (event: Event) => {
    const target = event.currentTarget as HTMLButtonElement
    activateQuadrant(target.dataset.psQuadrant ?? "all")
  }

  const handleNote = (event: Event) => {
    const target = event.currentTarget as HTMLElement
    activateNote(target.dataset.noteSlug)
  }

  filters.forEach((filter) => filter.addEventListener("click", handleQuadrant))
  notes.forEach((note) => {
    note.addEventListener("pointerenter", handleNote)
    note.addEventListener("focus", handleNote)
  })

  activateQuadrant(shell.dataset.activeQuadrant ?? "all")
  activateNote(defaultNote ?? previews[0]?.dataset.previewSlug ?? null)

  window.addCleanup(() => {
    filters.forEach((filter) => filter.removeEventListener("click", handleQuadrant))
    notes.forEach((note) => {
      note.removeEventListener("pointerenter", handleNote)
      note.removeEventListener("focus", handleNote)
    })
  })
})
