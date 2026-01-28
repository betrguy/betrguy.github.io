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
    // THIS IS YOUR CLICKABLE "HOME" BUTTON
    Component.PageTitle(), 
    
    // Standard elements for notes
    Component.Breadcrumbs(),
    Component.ArticleTitle(), // Keeps the note name (e.g. "7 - New World Grid")
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    // REMOVED: PageTitle from sidebar (It's at the top now)
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// 3. EXPORT CONTENT LAYOUT
export const defaultContentPageLayout: PageLayout = defaultPageLayout

// 4. HOMEPAGE LAYOUT (Cleaned Up)
export const defaultIndexPageLayout: PageLayout = {
  beforeBody: [
    // 1. CLICKABLE "HOME" BUTTON (Replaces your manual text)
    Component.PageTitle(), 
    
    // 2. CONTENT (Your body text)
    // REMOVED: Breadcrumbs, ArticleTitle ("Betrguy is writing"), ContentMeta (Date)
    Component.Content(), 
  ],
  left: [
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [], 
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