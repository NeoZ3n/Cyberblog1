# Cybersecurity Blog Setup Documentation & Content Workflow

## Part 1: Complete Setup Walkthrough

### Project Overview
This documentation covers the complete setup of a static cybersecurity blog using Astro, Spectre theme, and Cloudflare Pages deployment.

**Tech Stack:**
- Astro (static site generator)
- Spectre theme (dark terminal-inspired design)
- Tailwind CSS
- Markdown content with Astro collections
- Cloudflare Pages (deployment)
- GitHub (version control)

---

## STEP 1: Project Analysis

### Goal
Analyze the existing Astro project structure and understand the Spectre theme implementation.

### Commands Executed
```bash
ls -la projects/spectre
find projects/spectre/src -type f -name "*.astro" -o -name "*.tsx" -o -name "*.ts" -o -name "*.md" | head -20
tree projects/spectre/src  # (tree not available, used find instead)
find projects/spectre/src -type d
```

### Results
- **Project Structure Identified:**
  ```
  src/
  ├── components/ (Card, Icon, Navbar, Background, etc.)
  ├── layouts/ (Layout.astro)
  ├── pages/ (index.astro, blog/, about.astro)
  ├── content/ (config.ts, blog/, other/)
  ├── styles/ (CSS files)
  ├── scripts/ (client-side JS)
  └── assets/ (static files)
  ```

- **Blog System Status:** Already implemented with content collections
- **Theme Components:** Spectre theme fully integrated
- **Navigation:** Navbar with active state detection

### Key Findings
- Content collections configured in `src/content/config.ts`
- Blog routes: `/blog` (index) and `/blog/[slug]` (posts)
- RSS feed at `/rss.xml`
- Search powered by Pagefind

---

## STEP 2: Blog Post Creation

### Goal
Create the first cybersecurity-focused blog post using the established content schema.

### Files Modified
- `src/content/blog/first-post.md` (created)

### Content Schema Used
```yaml
---
title: "Implementing Detection-as-Code with Microsoft Sentinel"
description: "A practical guide to building scalable detection rules using code-based approaches in Microsoft Sentinel."
pubDate: 2024-12-29
draft: false
featured: true
tags: ["detection-engineering", "microsoft-sentinel", "siem", "detection-as-code", "kql"]
category: "Detection Engineering"
author: "Ayoub R."
---
```

### Results
- Professional cybersecurity content created
- Covers Detection-as-Code, KQL queries, CI/CD integration
- Technical depth appropriate for the audience
- Includes code examples and practical implementation steps

---

## STEP 3: Homepage Customization

### Goal
Transform the generic portfolio homepage into a cybersecurity-focused landing page.

### Files Modified
- `src/pages/index.astro` (major updates)
- `src/content/other/about.mdx` (content update)
- `src/content/info.json` (quick info update)
- `astro.config.ts` (OpenGraph updates)

### Key Changes Made

#### Homepage Structure (`src/pages/index.astro`)
- Updated hero section: "Ayoub R. Cybersecurity Engineer"
- Changed collection reference from "posts" to "blog"
- Added featured posts section (3 latest featured posts)
- Added topics section with tag filtering
- Replaced projects/work experience with About section
- Updated social links section to "Connect"

#### About Content (`src/content/other/about.mdx`)
```mdx
I am a cybersecurity engineer specializing in detection engineering, SOC operations, threat hunting, and digital forensics and incident response (DFIR). My expertise focuses on Microsoft security technologies and building robust defenses against cyber threats.

This blog shares practical insights, technical guides, and experiences from the field of cybersecurity. Topics include detection rule development, SIEM implementation, threat hunting methodologies, and security operations best practices.

Whether you're building detection capabilities, managing a SOC, or hunting for threats, you'll find actionable content to enhance your security operations.
```

#### Quick Info (`src/content/info.json`)
```json
[
  {
    "id": 1,
    "icon": { "type": "lucide", "name": "shield" },
    "text": "Detection Engineering"
  },
  {
    "id": 2,
    "icon": { "type": "lucide", "name": "search" },
    "text": "Threat Hunting"
  },
  {
    "id": 3,
    "icon": { "type": "lucide", "name": "database" },
    "text": "SIEM & SOC"
  },
  {
    "id": 4,
    "icon": { "type": "simple-icons", "name": "microsoft" },
    "text": "Microsoft Security"
  }
]
```

### Results
- Homepage now showcases cybersecurity expertise
- Featured content highlights latest blog posts
- Professional branding and messaging
- Responsive design maintained

---

## STEP 4: About Page Verification

### Status
About page was already implemented and required no changes.

### Existing Content
- Professional background as Cybersecurity Engineer
- Technical focus areas: Detection Engineering, SOC, Threat Hunting, DFIR, Microsoft Security
- Blog purpose and audience description

---

## STEP 5: Blog System Verification

### Status
Blog display logic was already fully implemented.

### Features Verified
- Content loading from `src/content/blog/`
- Post filtering (drafts excluded)
- Sorting by publication date
- Theme component integration (Card components)
- Tag-based filtering functionality
- RSS feed generation

---

## STEP 6: Git Setup and Repository Management

### Goal
Initialize Git repository and prepare for deployment.

### Commands Executed
```bash
git init
git config user.name "Ayoub R."
git config user.email "ayoub@example.com"
git add .
git commit -m "Initial commit: Cybersecurity blog setup with Spectre theme"
git remote add origin https://github.com/NeoZ3n/Cyberblog1.git
git remote set-url origin https://github.com/NeoZ3n/Cyberblog1.git
git push -u origin master
```

### Results
- Git repository initialized
- All project files committed
- Repository connected to GitHub
- Code successfully pushed to `master` branch

---

## STEP 7: Cloudflare Pages Deployment

### Configuration
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Deployment Method:** Static site generation

### Issues Encountered & Solutions

#### Issue 1: Import Path Errors
**Problem:** Incorrect relative imports in blog pages
```
Error: Could not resolve "../components/Card.astro"
```

**Solution:**
```bash
# Fixed imports in src/pages/blog/index.astro
import "../../components/Card.astro";
import "../../components/Icon.astro";
import "../../layouts/Layout.astro";
```

#### Issue 2: Server-Rendered Pages in Static Build
**Problem:** Giscus CSS endpoint had `prerender = false`
```
Cannot use server-rendered pages without an adapter
```

**Solution:**
```typescript
// src/pages/styles/giscus.ts
export const prerender = true;
```

#### Issue 3: Dependency Conflicts
**Problem:** `astro-expressive-code` incompatible with Astro 6.0.0
```
peer astro@"^4.0.0-beta || ^5.0.0-beta || ^3.3.0" from astro-expressive-code
```

**Solution:**
```json
// package.json
"astro-expressive-code": "^0.39.0"
```

#### Issue 4: Lockfile Mismatch
**Problem:** Cloudflare using pnpm but we used npm
```
ERR_PNPM_OUTDATED_LOCKFILE
```

**Solution:**
```bash
rm pnpm-lock.yaml package-lock.json
npm install --legacy-peer-deps
```

#### Issue 5: Missing Microsoft Icon
**Problem:** "microsoft" icon not found in lucide icons

**Solution:**
```json
// src/content/info.json
{
  "icon": {
    "type": "simple-icons",
    "name": "microsoft"
  }
}
```

#### Issue 6: Cloudflare Dashboard Issues
**Problem:** Internal error preventing form submission

**Solution:** Used Wrangler CLI instead
```bash
npm install -g wrangler
wrangler login
wrangler pages deploy dist --project-name cyberblog1
```

### Final Deployment
- **Site URL:** https://cyberblog1.pages.dev
- **Status:** Successfully deployed
- **Build Status:** All tests passing

---

## Part 2: Content Creation & Editing Workflow

### Recommended Workflow for Blog Posts

#### 1. Local Development Setup
```bash
# Start development server
npm run dev
# Visit http://localhost:4321
```

#### 2. Create New Blog Post
```bash
# Create new markdown file
touch src/content/blog/your-post-slug.md
```

#### 3. Post Template Structure
```yaml
---
title: "Your Post Title"
description: "Brief description for SEO and previews"
pubDate: 2024-12-29
updatedDate: 2024-12-30  # Optional
draft: false
featured: true  # Show on homepage
tags: ["tag1", "tag2", "tag3"]
category: "Detection Engineering"  # Optional
cover: "../assets/your-image.png"  # Optional
coverAlt: "Alt text for image"  # Required if cover present
author: "Ayoub R."
---

# Your Post Title

## Introduction

Your content here...

## Section 1

More content...

## Conclusion

Final thoughts...
```

#### 4. Content Writing Best Practices
- **Technical Focus:** Detection engineering, SOC operations, threat hunting, DFIR, Microsoft security
- **Tone:** Professional, practical, technical, minimal marketing
- **Structure:** Clear headings, code examples, practical implementations
- **Length:** 800-2000 words for comprehensive coverage
- **Code Blocks:** Use proper syntax highlighting
- **Links:** Reference external resources and internal posts

#### 5. Preview and Test
```bash
# Build locally
npm run build

# Preview build output
npm run preview
```

#### 6. Publish Process
```bash
# Stage changes
git add src/content/blog/your-post-slug.md

# Commit with descriptive message
git commit -m "Add: [Post Title] - [Brief description]"

# Push to trigger deployment
git push origin master
```

### Content Editing Tools

#### 1. VS Code Extensions Recommended
- **Markdown All in One:** Enhanced Markdown editing
- **Prettier:** Code formatting
- **GitLens:** Git integration
- **Code Spell Checker:** Writing assistance

#### 2. Image Management
```bash
# Place images in src/content/assets/
# Reference in posts: ../assets/your-image.png
```

#### 3. Frontmatter Validation
The content schema automatically validates:
- Required fields (title, description, pubDate)
- Data types (dates, booleans)
- Tag format (string arrays)

#### 4. SEO Optimization
- **Titles:** Under 60 characters
- **Descriptions:** 150-160 characters
- **Tags:** 3-5 relevant keywords
- **Featured Images:** 1200x630px recommended

### Maintenance Workflow

#### Monthly Tasks
1. **Review Analytics:** Check popular posts and topics
2. **Update Dependencies:** `npm update` quarterly
3. **Content Audit:** Review and update outdated posts
4. **Backup:** Ensure GitHub repository is current

#### Content Pipeline
1. **Idea Generation:** Document post ideas in issues/todos
2. **Research:** Gather sources and examples
3. **Drafting:** Write first draft
4. **Review:** Self-review for technical accuracy
5. **Publishing:** Follow git workflow above

### Quick Commands Reference
```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview build locally

# Git workflow
git add .               # Stage all changes
git commit -m "msg"     # Commit changes
git push origin master  # Deploy to production

# Content creation
# 1. Create src/content/blog/slug.md
# 2. Add frontmatter + content
# 3. Preview with npm run dev
# 4. Commit and push
```

This workflow ensures efficient content creation while maintaining code quality and deployment reliability. The static nature of the blog makes it fast, secure, and easy to maintain.