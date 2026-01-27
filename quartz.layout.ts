import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// 1. SHARED COMPONENTS
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/betrguy",
      "Quartz Discord": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// 2. STANDARD NOTE LAYOUT (For pages 1, 2, 3...)
export const defaultPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(), // Keep Title on inner notes for navigation context
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    // Graph is kept for NOTES only.
    Component.Graph(), 
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// 3. CONTENT PAGE LAYOUT
export const defaultContentPageLayout: PageLayout = defaultPageLayout

// 4. HOMEPAGE LAYOUT (THE CLEAN VERSION + LIST)
export const defaultIndexPageLayout: PageLayout = {
  beforeBody: [
    // No Title, No Meta. Just your manual # Home text.
    Component.Content(), 
  ],
  left: [
    // REMOVED: Component.PageTitle() -> This kills "Pegasus Garden" on the left
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [], // REMOVED: Graph -> This ensures the right side is empty
  afterBody: [
    // ADDED: This creates the list of notes you wanted!
    Component.RecentNotes({ 
      title: "Latest Notes", 
      limit: 10,
      showTags: false,
    }),
  ],
}

// 5. LIST LAYOUT
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