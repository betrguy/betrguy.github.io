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

// 2. STANDARD PAGE LAYOUT (For Notes 1, 2, 3...)
// We keep navigation here so your inner notes are easy to read.
export const defaultPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(), // Keeps "Pegasus Garden" context on inner notes
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// 3. THIS PREVENTS THE BUILD CRASH
export const defaultContentPageLayout: PageLayout = defaultPageLayout

// 4. HOMEPAGE LAYOUT (THE CLEAN VERSION)
// This applies ONLY to your Home/Index page.
export const defaultIndexPageLayout: PageLayout = {
  beforeBody: [
    // STRIPPED: No ArticleTitle (Removes "Betrguy is writing...")
    // STRIPPED: No ContentMeta (Removes "Jan 27, 1 min read")
    Component.Content(), // Only shows your manual "# Home" text
  ],
  left: [
    // STRIPPED: No PageTitle (Removes "Pegasus Garden" from sidebar)
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [], // STRIPPED: Empty Array = No Graph View
  afterBody: [
    // LIST: Shows your notes in reverse order
    Component.RecentNotes({ 
      title: "Latest Notes", 
      limit: 10, 
      showTags: false 
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