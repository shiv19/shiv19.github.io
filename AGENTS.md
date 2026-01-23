# Agent Guide for Jekyll Blog

This document provides essential information for agents working on this Jekyll-based personal blog repository.

## Project Overview

This is a **Jekyll 4.3** static site generator project for a personal blog hosted on GitHub Pages. The site uses:
- Ruby 3.4.7
- Jekyll with plugins: jekyll-sitemap, jekyll-feed, jekyll-paginate, jemoji
- Liquid templating
- Kramdown Markdown with Rouge syntax highlighting
- SCSS/SASS for CSS preprocessing
- Vanilla JavaScript (no frameworks for core functionality)

## Essential Commands

### Development
```bash
# Install dependencies
bundle install

# Start local development server
bundle exec jekyll serve

# Build the site
bundle exec jekyll build

# Build with production environment
JEKYLL_ENV=production bundle exec jekyll build
```

### Creating New Posts
```bash
# Use the helper script for micro posts
sh write_micro.sh <post_name>

# Example:
sh write_micro.sh my_first_micro
# Creates: _posts/YYYY-MM-DD-my-first-micro.md with micro layout
```

### Deployment
Deployment is automatic via GitHub Actions when pushing to the `master` branch. No manual deployment commands needed.

## Code Organization

### Directory Structure
```
/
├── _posts/          # Blog posts (YYYY-MM-DD-title.md)
├── _layouts/        # Jekyll templates (default.html, post.html, micro.html, category.html, etc.)
├── _includes/       # Reusable partials (navigation, meta, disqus, svg-icons, analytics)
├── _sass/          # SCSS partials (variables, reset, highlights, svg-icons)
├── _data/          # Data files (navigation.yml, apps.yml)
├── _category/      # Category index pages
├── assets/         # Static assets
│   ├── css/        # Main style.scss (compiled to style.css)
│   ├── js/         # JavaScript files (theme-toggle, super-search, holiday)
│   └── img/        # Images organized by topic
├── .github/workflows/  # CI/CD (jekyll.yml)
└── _config.yml     # Jekyll configuration
```

### Key Files
- `_config.yml`: Site configuration, plugins, settings
- `Gemfile`: Ruby dependencies
- `index.html`: Homepage with timeline layout
- `write_micro.sh`: Script to scaffold micro posts
- `_data/navigation.yml`: Site navigation structure
- `_data/apps.yml`: Apps directory data
- `assets/css/style.scss`: Main stylesheet with theme variables

## Content Types

### 1. Micro Posts (Short Updates)
**Layout**: `micro`

Use `write_micro.sh` script to create micro posts. These are short notes, links, or quick thoughts.

**Front Matter**:
```yaml
---
layout: micro
title: ""
date: YYYY-MM-DD HH:MM:SS +13:00
author: multishiv19
link: https://example.com              # Optional external link
link_title: "Link Display Text"        # Optional, defaults to host
published: true                       # Set to false to hide
---
```

**Example**: `2025-11-29-restart-log.md`

### 2. Full Blog Posts (Articles)
**Layout**: `post`

Standard long-form blog posts with comments, reading time, and table of contents.

**Front Matter**:
```yaml
---
layout: post
title: Post Title
date: 'YYYY-MM-DD HH:MM'
author: multishiv19
comments: true
category:
  - nativescript
tags:
  - nativescript
  - optimization
description: Post description for meta tags
published: true
---
```

**Example**: `2017-12-25-nativescript-do-something-when-user-stops-typing.md`

## Naming Conventions

### Post Files
- **Format**: `YYYY-MM-DD-title-slug.md`
- **Timezone**: Pacific/Auckland (UTC+13)
- **Time format**: `YYYY-MM-DD HH:MM:SS +13:00`
- **Slugs**: Use hyphens, convert underscores to hyphens, lowercase

### URLs and Permalinks
- **Permalink style**: `/:title`
- **Categories**: `/category/<category-name>`
- **Pagination**: `/page:num/`
- **Base URL**: Empty (root domain)

### Author
- Always use `author: multishiv19` in front matter

## Code Patterns

### SCSS/CSS

**Architecture**: Modular SCSS with CSS variables for theming

```scss
// Use CSS custom properties (variables)
--color-blue: #4183C4;
--color-accent: #e81c4f;

// SCSS mixins for mobile responsiveness
@mixin mobile {
  @media screen and (max-width: 640px) {
    @content;
  }
}

// Usage
.container {
  max-width: 54em;
  @include mobile {
    padding: 0 15px;
  }
}
```

**Theming**: Dark/light mode via `data-theme` attribute on `<html>`:
- Light: `html[data-theme="light"]`
- Dark: `html[data-theme="dark"]`
- System preference: No attribute, uses `@media (prefers-color-scheme: dark)`

**Entry Point**: `assets/css/style.scss` imports partials:
- `_reset.scss`
- `_variables.scss`
- `_highlights.scss`
- `_svg-icons.scss`

**Compilation**: Jekyll builds SCSS to `assets/css/style.css` (compressed)

### JavaScript

**Pattern**: IIFE (Immediately Invoked Function Expression) wrapper for isolation

```javascript
(function() {
  // Code here
  window.functionName = function() {
    // Export to global scope if needed
  };
})();
```

**Files**:
- `assets/js/theme-toggle.js`: Dark/light mode toggle with localStorage
- `assets/js/super-search.js`: Site-wide search (XML-based, searches feed.xml)
- `assets/js/holiday.js`: Snowfall effect for holiday mode

**Loading**: All scripts loaded in `default.html` with cache-busting `?v={{ site.time | date: '%s' }}`

### Liquid Templates

**Navigation** (`_includes/navigation.html`):
- Uses `_data/navigation.yml` for structure
- Supports dropdown menus with `sublinks`
- Active state detection

**Post Layout** (`_layouts/post.html`):
- Table of contents (auto-generated from headings)
- Reading time calculation (180 words/min)
- Disqus comments
- Next/Prev navigation

**Homepage** (`index.html`):
- Unified timeline of posts and micro posts
- Sorted by date, descending
- Paginated (10 items per page)

### Data Files

**Navigation** (`_data/navigation.yml`):
```yaml
- title: Home
  url: /
- title: Categories
  url: /category/
  sublinks:
    - title: NativeScript
      url: /category/nativescript
```

**Apps** (`_data/apps.yml`):
```yaml
apps:
  - name: "App Name"
    description: "Description"
    url: "https://example.com"
    category: "productivity"
    selfhosted: true  # Optional flag

categories:
  productivity:
    name: "Productivity"
    color: "blue"
```

## Front Matter Reference

### Common Fields
- `layout`: `post` or `micro`
- `title`: Post title
- `date`: `YYYY-MM-DD HH:MM:SS +13:00` (micro) or `'YYYY-MM-DD HH:MM'` (post)
- `author`: Always `multishiv19`
- `published`: `true` or `false` (false hides from timeline)

### Post-Specific Fields
- `category`: Array (e.g., `['nativescript']`)
- `tags`: Array (e.g., `['nativescript', 'optimization']`)
- `comments`: `true` or `false`
- `description`: Meta description for SEO

### Micro-Specific Fields
- `link`: External URL (optional)
- `link_title`: Display text for link (defaults to hostname)

## Theme and Styling

### CSS Variables (Root)
```css
--color-blue: #4183C4;
--color-accent: #e81c4f;
--color-bg: #ffffff;
--color-text-primary: #111111;
--color-text-secondary: #444444;
--color-text-muted: #666666;
--color-border: #eeeeee;
```

### Fonts
- **Main**: Inter (via Google Fonts)
- **Monospace**: JetBrains Mono (via Google Fonts)
- **System fallbacks**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`

### Responsive Breakpoints
- **Mobile**: `max-width: 640px` (via `@mixin mobile`)
- **Desktop TOC**: `min-width: 1200px`

## Important Gotchas

### Post Publishing
- Set `published: false` to hide posts without deleting
- Date format is critical for sorting
- Timezone is Pacific/Auckland (UTC+13)

### Micro Posts
- Must use `layout: micro`
- Created via `write_micro.sh` script for proper date formatting
- Show preview content on homepage
- External links use `link` and `link_title` fields

### Categories
- Defined in `_category/` directory (minimal front matter)
- Also referenced in `_prose.yml` for Prose.io editor
- Categories in posts should match existing category files

### Navigation
- Edit `_data/navigation.yml` to update site menu
- Dropdowns use `sublinks` array
- Active page detection is automatic based on URL matching

### Apps Page
- Data in `_data/apps.yml`
- Self-hosted apps may be offline (documented in callout)
- Category filtering uses JavaScript

### Build Artifacts
- `_site/` is the built site (gitignored)
- `.jekyll-cache/` and `.sass-cache/` are cache directories (gitignored)
- Do not edit files in `_site/`

### Image Paths
- Always use `{{ site.baseurl }}/assets/img/...` for images in Markdown
- Images organized by topic in `assets/img/`

### JavaScript Cache Busting
- Scripts include `?v={{ site.time | date: '%s' }}` parameter
- Forces browser refresh after changes

### TOC (Table of Contents)
- Auto-generated from h1-h6 headings
- Only visible on desktop (min-width: 1200px)
- JavaScript generates IDs for headings that don't have them

### Search
- Uses `feed.xml` as search index
- Requires site to be built/accessible
- Triggered via '/' key, closed via ESC

## Deployment

### GitHub Actions
- **File**: `.github/workflows/jekyll.yml`
- **Trigger**: Push to `master` branch
- **Ruby version**: 3.4.7
- **Steps**: Setup Ruby → Bundle install → Jekyll build → Deploy to Pages
- **Build command**: `bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"`

### Domain
- **Custom domain**: shiv19.com
- **CNAME file**: Configured for GitHub Pages

### Environment
- **Production**: `JEKYLL_ENV=production`
- **Development**: Default (no environment set)

## Testing

This project does not have automated tests. Manual testing:
1. Run `bundle exec jekyll serve`
2. Visit `http://localhost:4000`
3. Test navigation, theme toggle, search, and responsive behavior
4. Check console for JavaScript errors

## External Dependencies

### Ruby Gems (Gemfile)
- `jekyll ~> 4.3`
- `jekyll-sitemap` - Sitemap generation
- `jekyll-feed` - RSS/Atom feed
- `jekyll-paginate` - Post pagination
- `jemoji` - Emoji support
- `webrick` - Ruby 3.0+ compatibility

### CDNs
- Google Fonts (Inter, JetBrains Mono)
- @pwabuilder/pwaupdate (PWA updates)

### Third-Party Services
- Disqus: Comments
- Google Analytics: Tracking (UA-114649787-1)

## Common Tasks

### Add a New Category
1. Create `_<category-name>.md` in `_category/` with front matter:
   ```yaml
   ---
   category: <category-name>
   permalink: "/category/<category-name>"
   ---
   ```
2. Add to `_prose.yml` categories options
3. Optionally add to `_data/navigation.yml` sublinks

### Update Navigation
Edit `_data/navigation.yml`:
- Add items to top level
- Add `sublinks` for dropdowns
- Categories must exist in `_category/` directory

### Add/Update an App
Edit `_data/apps.yml`:
- Add to `apps` array with required fields
- Add category definition if new

### Change Theme Colors
Edit `assets/css/style.scss` CSS variables in `:root` and `@mixin dark-theme`.

### Create a Regular Blog Post
1. Create file in `_posts/` with format: `YYYY-MM-DD-title.md`
2. Add front matter with `layout: post`
3. Write content in Markdown
4. Commit and push (auto-deploys)

## File Exclusions (.gitignore)
```
.DS_Store
_site/              # Built site
.sass-cache/        # Sass cache
.jekyll-cache/      # Jekyll cache
.jekyll-metadata    # Jekyll metadata
.bundle/            # Bundler cache
vendor/             # Bundled gems
```

## Key Configuration Values

**_config.yml**:
- `name`: Shiv19
- `url`: https://shiv19.com
- `baseurl`: "" (empty)
- `timezone`: Pacific/Auckland
- `permalink`: "/:title"
- `paginate`: 10
- `paginate_path`: "/page:num/"
- `strict_front_matter`: true

## Prose.io Integration

The `_prose.yml` file configures Prose.io (GitHub-based editor):
- Posts edited in `_posts/`
- Media uploaded to `assets/img`
- Metadata fields match front matter structure
- Supports both `micro` and `post` layouts
- Default author: `multishiv19`

## Special Features

### Holiday Mode
- Activates snowfall effect in December
- Adds Santa cap to site name
- Toggle via JavaScript or can be removed
- Respects `prefers-reduced-motion`

### PWA Support
- Service worker: `pwabuilder-sw.js`
- Manifest: `manifest.json`
- Update notifications via @pwabuilder/pwaupdate
- Offline support

### Theme Toggle
- Button in navigation
- Persists in localStorage
- Respects system preference
- Smooth transitions

### Reading Time
- Auto-calculated: 180 words per minute
- Shows on post pages
- "1 min read" for posts under 360 words

## Troubleshooting

### Build Errors
- Run `bundle install` if gem issues
- Check `_config.yml` syntax (no tabs, proper indentation)
- Verify time in post dates is valid

### Styles Not Updating
- Check browser cache (hard refresh)
- Verify SCSS syntax
- Jekyll should auto-compile during `jekyll serve`

### Feed Not Updating
- Wait for rebuild on GitHub Actions
- Check `_config.yml` for `url` and `baseurl`
- Verify feed.xml is accessible

### Images 404
- Use `{{ site.baseurl }}` prefix in Markdown
- Check image file names (case-sensitive)
- Verify image exists in `assets/img/`

## Notes for Agents

- **Don't** edit files in `_site/` - they're regenerated on build
- **Don't** modify `.jekyll-cache` - it's regenerated
- **Do** use `write_micro.sh` for micro posts to ensure proper date format
- **Do** follow existing front matter patterns when creating posts
- **Do** test locally before pushing to master (triggers deployment)
- **Do** use `{{ site.baseurl }}` for all asset URLs
- **Do** check responsive behavior on mobile (max-width: 640px)
- **Do** respect the timezone (Pacific/Auckland) when dating posts
- **Don't** add new Ruby gems without updating Gemfile
- **Do** keep JavaScript in IIFE wrappers to avoid global namespace pollution
