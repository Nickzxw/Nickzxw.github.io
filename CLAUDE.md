# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a **Hexo blog** (v5.4.2) personal website deployed to GitHub Pages. The site uses the **NexT theme** and includes a Live2D interactive mascot widget.

## Common Commands

```bash
hexo server          # Start local dev server (http://localhost:4000)
hexo generate        # Generate static files to public/
hexo clean           # Clean cache and public folder
hexo deploy          # Deploy to GitHub Pages
```

Or via npm scripts: `npm run build`, `npm run clean`, `npm run deploy`, `npm run server`

## Project Structure

- **source/_posts/** — Blog posts in Markdown format (some with co-located images in subfolders)
- **source/images/** — Shared images used across posts
- **themes/next/** — NexT theme files
- **scaffolds/** — Post/page draft templates
- **_config.yml** — Hexo configuration (site metadata, deploy settings, Live2D config)

## Key Configuration

- `post_asset_folder: true` — Images for a post go in a subfolder named after the post
- Theme: **next** (configured in _config.yml)
- Deploy: git to `git@github.com:Nickzxw/Nickzxw.github.io.git` on branch `master`
- Live2D: enabled with `nipsilon` model, positioned right, hidden on mobile

## Architecture Notes

- Posts use frontmatter with `title`, `date`, `tags`, `categories`
- The NexT theme provides the visual design and layout
- Static site is generated into `public/` and deployed via `hexo-deployer-git`
