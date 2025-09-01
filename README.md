# Personal Portfolio

This repository contains the source code for my interactive portfolio, presenting both **personal** and **professional** projects in a consistent and documented format.

## Project Structure

### Markdown Files

Each project is described in a **Markdown (.md)** file.
Front-matter metadata is used to configure how the project appears on the site:

```yaml
---
title: "Project Title"
agence: "Client or Agency if there is"
year: 2025
cover: "cover.webp"
images:
  - 1.webp
  - 2.webp
video: "link of video"
link: "link for more details"
---
Followed by a Markdown description that can include:
  - Project introduction.
  - My specific role and responsibilities.
  - Technical details.
```

### Images (`/public/img`)

Optimized project images are served from `/public/img`.
Each project has its own subfolder:

```
public/img/
  cover/            # 700px wide cover images (thumbnails)
  project/              # project images, optimized at 1400px
  ...
```

### Originals (`/originals`)

To preserve image quality, all **source images** are kept in `/originals`.
This folder is **git-ignored** (not pushed to the repo), except for an empty `.gitkeep` to keep the directory visible.

```
originals/
  cover/            # unoptimized source covers
  project/              # full-res source project images
  ...
```

The optimization script reads from `/originals` and writes optimized `.webp` files into `/public/img`.

## Image Optimization Workflow

The repository includes a script `scripts/optimize.mjs` to process all images:

- **Covers** → resized to **700px wide**, saved in `/public/img/cover/*.webp`.
- **Project images** → resized to **1400px wide**, saved in `/public/img/[project]/*.webp`.
- Format: `.webp` (quality: 80).
- Works recursively on all subfolders inside `/originals`.

### Usage

```bash
# Run optimization
npm run optimize
# or
yarn optimize
```

### Example CLI Output

```
✅ cover/project.jpg → cover/project.webp (700px)
✅ project/1.png → project/1.webp (1400px)
✨ Done.
```

## Development Notes

- Built with **Next.js** + **Tailwind CSS**.
- Markdown rendered with `react-markdown` + `remark-gfm`.
- Optimized images served directly from `/public/img`.

## Best Practices

- Always drop **new source images** into `/originals`.
- Never commit raw/unoptimized images — only `.webp` in `/public/img` should be tracked.
- Run `yarn run optimize` whenever you add or update images.
- Keep project markdowns **short and precise**: 2–3 paragraphs max, plus lists for key tasks/roles.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
