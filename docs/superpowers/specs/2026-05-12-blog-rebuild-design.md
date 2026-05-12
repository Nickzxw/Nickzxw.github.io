# 博客重构设计规格书

## 项目概述

- **项目名称**: Nickzxw.github.io Blog Rebuilt
- **时间**: 2026-05-12
- **目标**: 将现有 Hexo 博客重构为现代产品式博客
- **技术栈**: Astro + Tailwind CSS
- **部署**: GitHub Pages (master 分支)

---

## 设计方向

### 视觉风格
- **方向**: 大图+精选，产品式设计
- **特点**: 大量留白，卡片承载内容，图文交错，层次分明

### 首页布局: Hero + 瀑布流
1. **Hero 区域** — 顶部大图 Banner，突出最新/精选文章
2. **精选区** — 双栏卡片，2篇精选内容配图
3. **文章列表** — 瀑布流展示所有文章，带封面图和摘要

### 功能清单 (全部实现)
- 阅读进度条
- 文章目录 (侧边)
- 深色模式切换
- 站内搜索 (Pagefind)
- 文章导航 (上一篇/下一篇)
- 回到顶部按钮

---

## 技术架构

```
Astro 项目 (源码目录)
├── src/
│   ├── content/posts/     ← 30篇 Markdown 文章 (从 hexo-source 迁移)
│   ├── layouts/           ← 基础布局组件
│   │   └── BaseLayout.astro
│   ├── components/        ← UI 组件
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── PostCard.astro
│   │   ├── HeroSection.astro
│   │   ├── TableOfContents.astro
│   │   ├── ReadingProgress.astro
│   │   ├── DarkModeToggle.astro
│   │   ├── SearchDialog.astro
│   │   └── BackToTop.astro
│   ├── pages/             ← 路由页面
│   │   ├── index.astro
│   │   ├── about.astro
│   │   └── posts/[slug].astro
│   └── styles/
│       └── global.css
├── public/                ← 静态资源 (图片等)
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

### 部署流程
```bash
npx astro build  →  dist/ 目录
→ 复制到 GitHub 仓库 master 分支
```

---

## 文章迁移

### 迁移源
- 路径: `/Users/a1-6/Documents/MyProject/hexo-source/source/_posts/`
- 数量: 30 篇 Markdown 文件
- 图片: 存放在同目录，通过相对路径引用

### 迁移策略
- 复制所有 .md 文件到 `src/content/posts/`
- 保持文件名前缀 (日期格式: YYYY-MM-DD)
- Front matter 格式保持兼容
- 图片路径保持相对路径

---

## 页面结构

### 首页 `/`
- Hero 大图区域 (精选文章)
- 双栏精选卡片
- 文章瀑布流列表
- 分页 (每页 10 篇)

### 文章页 `/posts/[slug]/`
- 阅读进度条 (顶部固定)
- 文章标题 + 摘要 + 日期
- 正文内容
- 文章目录 (右侧固定)
- 上一篇/下一篇导航
- 回到顶部按钮

### 关于页 `/about/`
- 个人介绍
- 简洁单页式

---

## 设计规范

### 颜色 (亮色模式)
- 背景: `#FAFAFA`
- 文字: `#1A1A1A`
- 主色: `#667EEA` (渐变起点)
- 辅色: `#764BA2` (渐变终点)
- 卡片: `#FFFFFF`
- 边框: `#E5E5E5`

### 深色模式
- 背景: `#1A1A2E`
- 文字: `#E5E5E5`
- 卡片: `#16213E`
- 主色保持渐变

### 字体
- 标题: `Inter` 或系统字体
- 正文: `Noto Sans SC` (中文支持)
- 代码: `JetBrains Mono`

### 间距系统
- 基础单位: 4px
- 卡片圆角: 12px
- 按钮圆角: 8px

---

## 实现步骤

1. 创建 Astro 项目
2. 配置 Tailwind CSS
3. 迁移 30 篇文章到 content/posts
4. 实现基础布局组件
5. 实现首页 Hero + 瀑布流
6. 实现文章页组件 (目录、进度条、导航)
7. 实现深色模式
8. 集成 Pagefind 搜索
9. 本地测试验证
10. 部署到 GitHub Pages

---

## 验证清单

- [ ] 30 篇文章全部迁移完成
- [ ] 首页 Hero + 精选 + 瀑布流正常显示
- [ ] 文章页目录、进度条、导航正常工作
- [ ] 深色模式切换正常
- [ ] 搜索功能可用
- [ ] GitHub Pages 部署成功
- [ ] 访问 https://nickzxw.github.io/ 正常