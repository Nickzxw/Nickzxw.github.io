# 博客重构实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 Hexo 博客重构为 Astro + Tailwind CSS 的现代产品式博客，保留 30 篇文章，部署到 GitHub Pages

**Architecture:** 基于 Astro 静态站点生成器，使用 Tailwind CSS 实现产品式设计，通过内容集合管理文章，Pagefind 实现搜索，所有页面静态生成后部署

**Tech Stack:** Astro 4.x, Tailwind CSS 3.x, Pagefind, TypeScript

---

## 文件结构

```
blog-rebuild/                          # Astro 项目根目录
├── src/
│   ├── content/
│   │   └── posts/                     # 30 篇 Markdown 文章
│   │       ├── 2022-1-23-随笔-优秀的-PM.md
│   │       ├── 2022-1-26-点淘（淘宝直播）产品分析.md
│   │       └── ... (共 30 篇)
│   ├── layouts/
│   │   ├── BaseLayout.astro           # 基础布局 (html/head/meta)
│   │   └── PostLayout.astro           # 文章页布局
│   ├── components/
│   │   ├── Header.astro               # 顶部导航
│   │   ├── Footer.astro               # 页脚
│   │   ├── HeroSection.astro          # Hero 大图区域
│   │   ├── FeaturedCards.astro        # 精选双栏卡片
│   │   ├── PostCard.astro             # 文章卡片
│   │   ├── PostList.astro             # 文章瀑布流列表
│   │   ├── TableOfContents.astro       # 文章目录
│   │   ├── ReadingProgress.astro       # 阅读进度条
│   │   ├── DarkModeToggle.astro        # 深色模式切换
│   │   ├── SearchDialog.astro         # 搜索弹窗
│   │   ├── BackToTop.astro            # 回到顶部
│   │   └── PostNavigation.astro        # 上一篇/下一篇
│   ├── pages/
│   │   ├── index.astro                # 首页 /
│   │   ├── about.astro                 # 关于页 /about
│   │   └── posts/
│   │       └── [...slug].astro        # 文章页 /posts/[slug]
│   ├── styles/
│   │   └── global.css                 # 全局样式 (CSS 变量, Tailwind)
│   └── config.ts                      # 内容集合配置
├── public/
│   └── images/                        # 文章图片 (从 hexo-source 复制)
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── tsconfig.json
```

---

## 实施任务

### Task 1: 创建 Astro 项目基础结构

**Files:**
- Create: `blog-rebuild/package.json`
- Create: `blog-rebuild/astro.config.mjs`
- Create: `blog-rebuild/tailwind.config.mjs`
- Create: `blog-rebuild/tsconfig.json`
- Create: `blog-rebuild/src/config.ts`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "blog-rebuild",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "postbuild": "npx pagefind --site dist"
  },
  "dependencies": {
    "astro": "^4.5.0",
    "@astrojs/tailwind": "^5.1.0",
    "tailwindcss": "^3.4.1",
    "pagefind": "^1.0.4"
  }
}
```

- [ ] **Step 2: 创建 astro.config.mjs**

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  build: {
    assets: '_assets'
  }
});
```

- [ ] **Step 3: 创建 tailwind.config.mjs**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#667EEA',
        secondary: '#764BA2',
        background: '#FAFAFA',
        card: '#FFFFFF',
        border: '#E5E5E5',
        'dark-bg': '#1A1A2E',
        'dark-card': '#16213E',
        'dark-text': '#E5E5E5'
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    }
  },
  plugins: []
};
```

- [ ] **Step 4: 创建 tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

- [ ] **Step 5: 创建 src/config.ts**

```typescript
import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
    cover: z.string().optional()
  })
});

export const collections = {
  posts: postsCollection
};
```

---

### Task 2: 创建基础布局组件

**Files:**
- Create: `blog-rebuild/src/layouts/BaseLayout.astro`
- Create: `blog-rebuild/src/styles/global.css`

- [ ] **Step 1: 创建 src/styles/global.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-bg: #FAFAFA;
  --color-card: #FFFFFF;
  --color-text: #1A1A1A;
  --color-primary: #667EEA;
  --color-secondary: #764BA2;
}

.dark {
  --color-bg: #1A1A2E;
  --color-card: #16213E;
  --color-text: #E5E5E5;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: 'Inter', 'Noto Sans SC', system-ui, sans-serif;
}

@layer components {
  .btn-primary {
    @apply bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-medium transition-transform hover:scale-105;
  }
  .card {
    @apply bg-[var(--color-card)] rounded-xl border border-[#E5E5E5] dark:border-[#2a2a4a] transition-shadow hover:shadow-lg;
  }
}
```

- [ ] **Step 2: 创建 src/layouts/BaseLayout.astro**

```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description = 'X.Zhang Blog - I CAN DO ALL THING' } = Astro.props;
---

<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet" />
</head>
<body class="min-h-screen flex flex-col">
  <slot />
</body>
</html>
```

---

### Task 3: 创建 Header 和 Footer 组件

**Files:**
- Create: `blog-rebuild/src/components/Header.astro`
- Create: `blog-rebuild/src/components/Footer.astro`

- [ ] **Step 1: 创建 src/components/Header.astro**

```astro
---
const navLinks = [
  { href: '/', label: '首页' },
  { href: '/about', label: '关于' }
];
---

<header class="sticky top-0 z-50 bg-[var(--color-card)]/80 backdrop-blur-md border-b border-[#E5E5E5] dark:border-[#2a2a4a]">
  <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
    <a href="/" class="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      X.Zhang's Blog.
    </a>
    <nav class="flex items-center gap-8">
      {navLinks.map(link => (
        <a href={link.href} class="text-[var(--color-text)] hover:text-primary transition-colors font-medium">
          {link.label}
        </a>
      ))}
      <DarkModeToggle client:load />
    </nav>
  </div>
</header>
```

- [ ] **Step 2: 创建 src/components/Footer.astro**

```astro
---
const currentYear = new Date().getFullYear();
---

<footer class="mt-auto py-8 border-t border-[#E5E5E5] dark:border-[#2a2a4a]">
  <div class="max-w-6xl mx-auto px-6 text-center text-sm text-[var(--color-text)]/60">
    <p>&copy; {currentYear} Xuewei Zhang. Built with Astro.</p>
  </div>
</footer>
```

---

### Task 4: 创建深色模式切换组件

**Files:**
- Create: `blog-rebuild/src/components/DarkModeToggle.astro`

- [ ] **Step 1: 创建 src/components/DarkModeToggle.astro**

```astro
---
---

<button id="darkModeToggle" class="p-2 rounded-lg hover:bg-[#E5E5E5] dark:hover:bg-[#2a2a4a] transition-colors" aria-label="Toggle dark mode">
  <svg id="sunIcon" class="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
  <svg id="moonIcon" class="w-5 h-5 block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
</button>

<script>
  const toggle = document.getElementById('darkModeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');

  const isDark = localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    document.documentElement.classList.add('dark');
    sunIcon?.classList.remove('hidden');
    moonIcon?.classList.add('hidden');
  }

  toggle?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const dark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    sunIcon?.classList.toggle('hidden');
    moonIcon?.classList.toggle('hidden');
  });
</script>
```

---

### Task 5: 创建首页组件 (Hero + 精选 + 列表)

**Files:**
- Create: `blog-rebuild/src/components/HeroSection.astro`
- Create: `blog-rebuild/src/components/FeaturedCards.astro`
- Create: `blog-rebuild/src/components/PostCard.astro`
- Create: `blog-rebuild/src/components/PostList.astro`

- [ ] **Step 1: 创建 src/components/HeroSection.astro**

```astro
---
interface Props {
  title: string;
  description: string;
  cover?: string;
  slug: string;
}

const { title, description, cover, slug } = Astro.props;
---

<div class="relative h-[400px] rounded-2xl overflow-hidden mb-8 group">
  {cover ? (
    <img src={cover} alt={title} class="absolute inset-0 w-full h-full object-cover" />
  ) : (
    <div class="absolute inset-0 bg-gradient-to-br from-primary to-secondary"></div>
  )}
  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
  <div class="absolute bottom-0 left-0 right-0 p-8">
    <span class="inline-block px-3 py-1 bg-white/20 backdrop-blur rounded-full text-white text-sm mb-3">精选</span>
    <h2 class="text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
      <a href={`/posts/${slug}`}>{title}</a>
    </h2>
    <p class="text-white/80 line-clamp-2">{description}</p>
  </div>
</div>
```

- [ ] **Step 2: 创建 src/components/FeaturedCards.astro**

```astro
---
interface Post {
  slug: string;
  title: string;
  description: string;
  cover?: string;
  date: string;
}

interface Props {
  posts: Post[];
}

const { posts } = Astro.props;
---

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  {posts.slice(0, 2).map(post => (
    <a href={`/posts/${post.slug}`} class="card overflow-hidden group">
      <div class="h-48 overflow-hidden">
        {post.cover ? (
          <img src={post.cover} alt={post.title} class="w-full h-full object-cover transition-transform group-hover:scale-105" />
        ) : (
          <div class="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20"></div>
        )}
      </div>
      <div class="p-6">
        <h3 class="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
        <p class="text-sm text-[var(--color-text)]/60">{post.description}</p>
        <time class="text-xs text-[var(--color-text)]/40 mt-3 block">{post.date}</time>
      </div>
    </a>
  ))}
</div>
```

- [ ] **Step 3: 创建 src/components/PostCard.astro**

```astro
---
interface Props {
  slug: string;
  title: string;
  description: string;
  cover?: string;
  date: string;
  categories?: string[];
}

const { slug, title, description, cover, date, categories } = Astro.props;
---

<a href={`/posts/${slug}`} class="card overflow-hidden group">
  <div class="h-40 overflow-hidden">
    {cover ? (
      <img src={cover} alt={title} class="w-full h-full object-cover transition-transform group-hover:scale-105" />
    ) : (
      <div class="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10"></div>
    )}
  </div>
  <div class="p-5">
    <h3 class="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">{title}</h3>
    <p class="text-sm text-[var(--color-text)]/60 line-clamp-2 mb-3">{description}</p>
    <div class="flex items-center justify-between">
      <time class="text-xs text-[var(--color-text)]/40">{date}</time>
      {categories && categories[0] && (
        <span class="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{categories[0]}</span>
      )}
    </div>
  </div>
</a>
```

- [ ] **Step 4: 创建 src/components/PostList.astro**

```astro
---
import PostCard from './PostCard.astro';

interface Post {
  slug: string;
  title: string;
  description: string;
  cover?: string;
  date: string;
  categories?: string[];
}

interface Props {
  posts: Post[];
}

const { posts } = Astro.props;
---

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {posts.map(post => (
    <PostCard {...post} />
  ))}
</div>
```

---

### Task 6: 创建首页页面

**Files:**
- Create: `blog-rebuild/src/pages/index.astro`

- [ ] **Step 1: 创建 src/pages/index.astro**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '@layouts/BaseLayout.astro';
import Header from '@components/Header.astro';
import Footer from @components/Footer.astro';
import HeroSection from '@components/HeroSection.astro';
import FeaturedCards from '@components/FeaturedCards.astro';
import PostList from '@components/PostList.astro';
import BackToTop from '@components/BackToTop.astro';

const allPosts = await getCollection('posts');
const sortedPosts = allPosts.sort((a, b) =>
  new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
);

const heroPost = sortedPosts[0];
const featuredPosts = sortedPosts.slice(1, 3);
const remainingPosts = sortedPosts.slice(3);
---

<BaseLayout title="X.Zhang's Blog.">
  <Header />
  <main class="flex-1 max-w-6xl mx-auto px-6 py-8">
    <HeroSection
      title={heroPost.data.title}
      description={heroPost.data.description || ''}
      slug={heroPost.slug}
    />
    <FeaturedCards posts={featuredPosts.map(p => ({
      slug: p.slug,
      title: p.data.title,
      description: p.data.description || '',
      cover: p.data.cover,
      date: p.data.date
    }))} />
    <section>
      <h2 class="text-2xl font-bold mb-6">全部文章</h2>
      <PostList posts={remainingPosts.map(p => ({
        slug: p.slug,
        title: p.data.title,
        description: p.data.description || '',
        cover: p.data.cover,
        date: p.data.date,
        categories: p.data.categories
      }))} />
    </section>
  </main>
  <Footer />
  <BackToTop client:load />
</BaseLayout>
```

---

### Task 7: 创建文章页组件

**Files:**
- Create: `blog-rebuild/src/components/TableOfContents.astro`
- Create: `blog-rebuild/src/components/ReadingProgress.astro`
- Create: `blog-rebuild/src/components/PostNavigation.astro`
- Create: `blog-rebuild/src/layouts/PostLayout.astro`

- [ ] **Step 1: 创建 src/components/ReadingProgress.astro**

```astro
---
---

<div id="reading-progress" class="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary z-[100] w-0 transition-all duration-100"></div>

<script>
  const progressBar = document.getElementById('reading-progress');

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
  }

  window.addEventListener('scroll', updateProgress);
  updateProgress();
</script>
```

- [ ] **Step 2: 创建 src/components/TableOfContents.astro**

```astro
---
interface Heading {
  depth: number;
  text: string;
  slug: string;
}

interface Props {
  headings: Heading[];
}

const { headings } = Astro.props;
const filteredHeadings = headings.filter(h => h.depth <= 3);
---

{filteredHeadings.length > 0 && (
  <nav id="toc" class="sticky top-24 p-4 bg-[var(--color-card)] rounded-xl border border-[#E5E5E5] dark:border-[#2a2a4a]">
    <h4 class="font-semibold mb-3 text-sm">目录</h4>
    <ul class="space-y-2 text-sm">
      {filteredHeadings.map(heading => (
        <li style={`padding-left: ${(heading.depth - 2) * 12}px`}>
          <a href={`#${heading.slug}`} class="text-[var(--color-text)]/60 hover:text-primary transition-colors line-clamp-2">
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  </nav>
)}
```

- [ ] **Step 3: 创建 src/components/PostNavigation.astro**

```astro
---
interface Props {
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
}

const { prev, next } = Astro.props;
---

{(prev || next) && (
  <nav class="flex justify-between items-center py-8 border-t border-[#E5E5E5] dark:border-[#2a2a4a] mt-8">
    {prev ? (
      <a href={`/posts/${prev.slug}`} class="flex flex-col items-start p-4 rounded-lg hover:bg-[#f5f5f5] dark:hover:bg-[#16213E] transition-colors max-w-[45%]">
        <span class="text-xs text-[var(--color-text)]/40 mb-1">← 上一篇</span>
        <span class="font-medium line-clamp-2 text-left">{prev.title}</span>
      </a>
    ) : <div />}
    {next ? (
      <a href={`/posts/${next.slug}`} class="flex flex-col items-end p-4 rounded-lg hover:bg-[#f5f5f5] dark:hover:bg-[#16213E] transition-colors max-w-[45%]">
        <span class="text-xs text-[var(--color-text)]/40 mb-1">下一篇 →</span>
        <span class="font-medium line-clamp-2 text-right">{next.title}</span>
      </a>
    ) : <div />}
  </nav>
)}
```

- [ ] **Step 4: 创建 src/layouts/PostLayout.astro**

```astro
---
import type { CollectionEntry } from 'astro:content';
import BaseLayout from './BaseLayout.astro';
import Header from '@components/Header.astro';
import Footer from '@components/Footer.astro';
import TableOfContents from '@components/TableOfContents.astro';
import ReadingProgress from '@components/ReadingProgress.astro';
import PostNavigation from '@components/PostNavigation.astro';
import BackToTop from '@components/BackToTop.astro';

interface Props {
  post: CollectionEntry<'posts'>;
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
  headings: { depth: number; text: string; slug: string }[];
}

const { post, prev, next, headings } = Astro.props;
---

<BaseLayout title={post.data.title} description={post.data.description}>
  <ReadingProgress />
  <Header />
  <main class="flex-1 max-w-6xl mx-auto px-6 py-8">
    <article class="flex gap-8">
      <div class="flex-1">
        <header class="mb-8">
          <h1 class="text-4xl font-bold mb-4">{post.data.title}</h1>
          <div class="flex items-center gap-4 text-sm text-[var(--color-text)]/60">
            <time>{post.data.date}</time>
            {post.data.categories?.map(cat => (
              <span class="px-2 py-1 bg-primary/10 text-primary rounded-full">{cat}</span>
            ))}
          </div>
          {post.data.description && (
            <p class="mt-4 text-lg text-[var(--color-text)]/70">{post.data.description}</p>
          )}
        </header>
        <div class="prose prose-lg max-w-none" set:html={post.body} />
        <PostNavigation prev={prev} next={next} />
      </div>
      <aside class="hidden lg:block w-64 flex-shrink-0">
        <TableOfContents headings={headings} />
      </aside>
    </article>
  </main>
  <Footer />
  <BackToTop client:load />
</BaseLayout>
```

---

### Task 8: 创建文章页路由

**Files:**
- Create: `blog-rebuild/src/pages/posts/[...slug].astro`

- [ ] **Step 1: 创建 src/pages/posts/[...slug].astro`

```astro
---
import { getCollection } from 'astro:content';
import PostLayout from '@layouts/PostLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  const sorted = posts.sort((a, b) =>
    new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return sorted.map((post, index) => ({
    params: { slug: post.slug },
    props: {
      post,
      prev: index < sorted.length - 1 ? { slug: sorted[index + 1].slug, title: sorted[index + 1].data.title } : undefined,
      next: index > 0 ? { slug: sorted[index - 1].slug, title: sorted[index - 1].data.title } : undefined
    }
  }));
}

const { post, prev, next } = Astro.props;
const { Content, headings } = await post.render();
---

<PostLayout post={post} prev={prev} next={next} headings={headings}>
  <Content />
</PostLayout>
```

---

### Task 9: 创建关于页和回到顶部组件

**Files:**
- Create: `blog-rebuild/src/pages/about.astro`
- Create: `blog-rebuild/src/components/BackToTop.astro`

- [ ] **Step 1: 创建 src/pages/about.astro`

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
import Header from '@components/Header.astro';
import Footer from @components/Footer.astro';
---

<BaseLayout title="关于 - X.Zhang's Blog.">
  <Header />
  <main class="flex-1 max-w-3xl mx-auto px-6 py-16">
    <h1 class="text-4xl font-bold mb-6">关于我</h1>
    <div class="prose prose-lg">
      <p>我是张雪薇（Xuewei Zhang），一名产品经理。</p>
      <p>这个博客用于记录我在产品管理、技术学习和深度学习等领域的思考。</p>
      <p>「I CAN DO ALL THING」</p>
    </div>
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 2: 创建 src/components/BackToTop.astro**

```astro
---
---

<button id="backToTop" class="fixed bottom-8 right-8 p-3 bg-primary text-white rounded-full shadow-lg opacity-0 translate-y-4 transition-all duration-300 hover:scale-110 z-50" aria-label="Back to top">
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
</button>

<script>
  const btn = document.getElementById('backToTop');

  function toggleVisibility() {
    if (btn) {
      if (window.scrollY > 300) {
        btn.classList.remove('opacity-0', 'translate-y-4');
        btn.classList.add('opacity-100', 'translate-y-0');
      } else {
        btn.classList.add('opacity-0', 'translate-y-4');
        btn.classList.remove('opacity-100', 'translate-y-0');
      }
    }
  }

  btn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', toggleVisibility);
  toggleVisibility();
</script>
```

---

### Task 10: 迁移 30 篇文章

**Files:**
- Copy from: `hexo-source/source/_posts/*.md`
- To: `blog-rebuild/src/content/posts/`

- [ ] **Step 1: 创建 src/content/posts/ 目录**

```bash
mkdir -p blog-rebuild/src/content/posts
```

- [ ] **Step 2: 复制所有文章**

```bash
cp /Users/a1-6/Documents/MyProject/hexo-source/source/_posts/*.md /Users/a1-6/Documents/MyProject/Nickzxw.github.io/blog-rebuild/src/content/posts/
```

- [ ] **Step 3: 复制文章图片**

```bash
cp -r /Users/a1-6/Documents/MyProject/hexo-source/source/_posts/*.{jpg,jpeg,png,gif,webp} /Users/a1-6/Documents/MyProject/Nickzxw.github.io/blog-rebuild/public/images/ 2>/dev/null || true
# 如有图片，整理到 public/images/
```

---

### Task 11: 安装依赖并构建

**Files:**
- Modify: `blog-rebuild/src/pages/index.astro` (修复导入路径)
- Run: `npm install && npm run build`

- [ ] **Step 1: 修复 src/pages/index.astro 导入路径**

```astro
// 确认所有导入路径正确，参考 Task 6 代码
```

- [ ] **Step 2: 安装依赖**

```bash
cd /Users/a1-6/Documents/MyProject/Nickzxw.github.io/blog-rebuild
npm install
```

- [ ] **Step 3: 构建项目**

```bash
npm run build
```

- [ ] **Step 4: 如有构建错误，根据错误修复**

常见问题: 导入路径、TypeScript 类型错误、内容集合配置错误

---

### Task 12: 部署到 GitHub Pages

**Files:**
- Modify: `blog-rebuild/package.json` (添加部署脚本)
- Run: 复制 dist/ 到 GitHub 仓库

- [ ] **Step 1: 本地验证 dist/ 内容**

```bash
ls -la blog-rebuild/dist/
```

- [ ] **Step 2: 复制构建结果到 GitHub 仓库**

```bash
# 方式一: 手动复制
cp -r blog-rebuild/dist/* /Users/a1-6/Documents/MyProject/Nickzxw.github.io/

# 方式二: 使用 GitHub Actions (推荐)
# 在 .github/workflows/deploy.yml 配置自动化部署
```

---

## 验证清单

- [ ] 30 篇文章全部迁移到 src/content/posts/
- [ ] npm install 成功，无依赖错误
- [ ] npm run build 成功，无构建错误
- [ ] 首页 Hero + 精选 + 瀑布流正常显示
- [ ] 文章页目录、进度条、导航正常工作
- [ ] 深色模式切换正常
- [ ] GitHub Pages 部署成功
- [ ] 访问 https://nickzxw.github.io/ 正常

---

## 实施顺序

1. Task 1 → 创建项目基础结构
2. Task 2 → 创建基础布局
3. Task 3 → Header 和 Footer
4. Task 4 → 深色模式
5. Task 5 → 首页组件
6. Task 6 → 首页页面
7. Task 7 → 文章页组件
8. Task 8 → 文章页路由
9. Task 9 → 关于页 + 回到顶部
10. Task 10 → 迁移文章
11. Task 11 → 安装依赖并构建
12. Task 12 → 部署