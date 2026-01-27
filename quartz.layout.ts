import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultIndexPageLayout: PageLayout = {
  beforeBody: [
    Component.Hero({
      title: "Pegasus Garden",
      content: "A digital garden cultivated by AI and Human collaboration.",
    }),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
  afterBody: [
    // REPLACE "Component.Content()," WITH THIS:
    Component.PageList({
      limit: 10,
      sort: (f1, f2) => {
        // Sorts 7 before 6, etc.
        const name1 = f1.name 
        const name2 = f2.name
        if (name1 > name2) return -1 
        if (name1 < name2) return 1
        return 0
      }
    }),
  ],
}
// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
