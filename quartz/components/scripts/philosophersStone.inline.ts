document.addEventListener("nav", () => {
  const shell = document.querySelector(".ps-shell") as HTMLElement | null
  if (!shell) return

  shell.dataset.notesReady = "true"
  if (shell.dataset.bound === "true") return
  shell.dataset.bound = "true"

  const trigger = shell.querySelector(".ps-subtitle-trigger") as HTMLButtonElement | null
  const card = shell.querySelector(".ps-word-card") as HTMLElement | null

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

  document.addEventListener("click", (event) => {
    const target = event.target as Node | null
    if (!target) return
    if (trigger && card && (trigger.contains(target) || card.contains(target))) return
    closeCard()
  })

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCard()
    }
  })
})
