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
    // 2. Standard Note Elements (Breadcrumbs, Title, Date)
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.Graph(), // Keeps graph on notes only
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// 3. EXPORT CONTENT LAYOUT
export const defaultContentPageLayout: PageLayout = defaultPageLayout

// 4. HOMEPAGE LAYOUT (THE CLEAN FIX)
// This is the layout your index.md WILL use once you delete "layout: page"
export const defaultIndexPageLayout: PageLayout = {
  beforeBody: [
    // 1. The "Home" Button (Big, Red, Clickable)
    Component.PageTitle(), 
    
    // 2. Your Content (No Title, No Date, No Metadata)
    Component.Content(), 
  ],
  left: [
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [], // Empty = No Graph View
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
  beforeBody: [Component.PageTitle(), Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
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