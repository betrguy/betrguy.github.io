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
// We keep navigation tools here so individual notes are still easy to use.
export const defaultPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(), // We keep "Pegasus Garden" on notes for context
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    // Graph is kept for NOTES only. If you want it gone everywhere, delete this line.
    Component.Graph(), 
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// 3. CONTENT PAGE LAYOUT
export const defaultContentPageLayout: PageLayout = defaultPageLayout

// 4. HOMEPAGE LAYOUT (THE CLEAN VERSION)
export const defaultIndexPageLayout: PageLayout = {
  beforeBody: [
    // CLEAN: No Breadcrumbs, No Titles, No Metadata.
    // Only your manual Markdown content will show.
    Component.Content(), 
  ],
  left: [
    // CLEAN: "Pegasus Garden" title removed.
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [], // CLEAN: Empty array = No Graph View.
  afterBody: [
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