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

// 2. STANDARD CONTENT LAYOUT (Used for Notes 1, 2, 3...)
// I have REMOVED PageTitle (Sidebar) and Graph (Right) from here too.
const standardLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(), // Keeps "3 - 3D Printing..." title on notes
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    // REMOVED: Component.PageTitle(), 
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    // REMOVED: Component.Graph(), 
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// 3. EXPORT THE CONTENT LAYOUT
// This tells Quartz: "Use this layout for all standard notes"
export const defaultContentPageLayout: PageLayout = standardLayout

// 4. HOMEPAGE LAYOUT (The Clean Version)
// This tells Quartz: "Use this layout ONLY for the Index/Home"
export const defaultIndexPageLayout: PageLayout = {
  beforeBody: [
    // CLEAN: No ArticleTitle, No Meta.
    Component.Content(), 
  ],
  left: [
    // REMOVED: Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [], // Empty = No Graph
  afterBody: [
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
    Component.MobileOnly(Component.Spacer()), // REMOVED PageTitle here too
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