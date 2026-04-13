document.addEventListener("nav", () => {
  const shell = document.querySelector(".ps-shell") as HTMLElement | null
  if (!shell) return

  const notes = Array.from(shell.querySelectorAll("[data-note-slug]")) as HTMLElement[]
  const previews = Array.from(shell.querySelectorAll("[data-preview-slug]")) as HTMLElement[]
  const closeButton = shell.querySelector(".ps-detail-close") as HTMLButtonElement | null
  const defaultNote = shell.dataset.defaultNote

  const activateNote = (slug?: string | null, open = true) => {
    shell.dataset.detailOpen = open && slug ? "true" : "false"
    shell.dataset.activeNote = slug ?? ""
    notes.forEach((note) => {
      note.classList.toggle("is-active", note.dataset.noteSlug === slug)
    })
    previews.forEach((preview) => {
      preview.classList.toggle("is-active", preview.dataset.previewSlug === slug)
    })
  }

  const handleNote = (event: Event) => {
    const target = event.currentTarget as HTMLElement
    const slug = target.dataset.noteSlug
    const isActive = shell.dataset.activeNote === slug && shell.dataset.detailOpen === "true"
    activateNote(slug, !isActive)
  }

  const closeDetail = () => activateNote(shell.dataset.activeNote ?? defaultNote ?? null, false)

  notes.forEach((note) => {
    note.addEventListener("click", handleNote)
  })
  closeButton?.addEventListener("click", closeDetail)
  activateNote(defaultNote ?? previews[0]?.dataset.previewSlug ?? null, false)

  window.addCleanup(() => {
    notes.forEach((note) => {
      note.removeEventListener("click", handleNote)
    })
    closeButton?.removeEventListener("click", closeDetail)
  })
})
