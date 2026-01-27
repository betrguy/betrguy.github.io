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

// 2. STANDARD NOTE LAYOUT (For your Content Pages 1-7)
// We keep the "Standard" look here so navigation works on inner pages.
export const defaultPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(), // Keeps "Pegasus Garden" on inner notes (optional)
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

// 3. CONTENT PAGE LAYOUT
export const defaultContentPageLayout: PageLayout = defaultPageLayout

// 4. HOMEPAGE LAYOUT (THE CLEAN VERSION)
// This is the specific layout for your "Home" / "Index" page.
export const defaultIndexPageLayout: PageLayout = {
  beforeBody: [
    // STRIPPED: No Breadcrumbs (Small "Home")
    // STRIPPED: No ArticleTitle ("Betrguy is writing...")
    // STRIPPED: No ContentMeta (Dates/Read time)
    // RESULT: Only shows your manual "# Home" and text
    Component.Content(), 
  ],
  left: [
    // STRIPPED: No PageTitle ("Pegasus Garden")
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [], // STRIPPED: Empty Array = No Graph View
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