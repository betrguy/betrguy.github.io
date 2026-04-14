document.addEventListener("nav", () => {
  const shell = document.querySelector(".ps-shell") as HTMLElement | null
  if (!shell) return

  shell.dataset.notesReady = "true"

  const trigger = shell.querySelector(".ps-subtitle-trigger") as HTMLButtonElement | null
  const card = shell.querySelector(".ps-word-card") as HTMLElement | null
  if (!trigger || !card) return

  const closeCard = () => {
    trigger.setAttribute("aria-expanded", "false")
    card.setAttribute("aria-hidden", "true")
    shell.dataset.wordCardOpen = "false"
  }

  const openCard = () => {
    trigger.setAttribute("aria-expanded", "true")
    card.setAttribute("aria-hidden", "false")
    shell.dataset.wordCardOpen = "true"
  }

  trigger.addEventListener("click", (event) => {
    event.stopPropagation()
    if (shell.dataset.wordCardOpen === "true") {
      closeCard()
      return
    }

    openCard()
  })

  document.addEventListener("click", (event) => {
    const target = event.target as Node | null
    if (!target) return
    if (trigger.contains(target) || card.contains(target)) return
    closeCard()
  })

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCard()
    }
  })
})
