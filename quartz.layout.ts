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
    },
  }),
}

// 2. STANDARD PAGE LAYOUT (For Notes 1, 2, 3...)
export const defaultPageLayout: PageLayout = {
  beforeBody: [
    Component.PageTitle(),
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
  right: [Component.DesktopOnly(Component.TableOfContents()), Component.Backlinks()],
}

// 3. FORCE CONTENT LAYOUT TO MATCH
export const defaultContentPageLayout: PageLayout = defaultPageLayout

// 4. HOMEPAGE LAYOUT (THE CLEAN FIX)
export const defaultIndexPageLayout: PageLayout = {
  beforeBody: [Component.PhilosophersStone()],
  left: [],
  right: [],
}

// 5. LIST LAYOUT
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.PageTitle(),
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
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
