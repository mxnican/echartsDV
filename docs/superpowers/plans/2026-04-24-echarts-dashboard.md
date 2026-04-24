# ECharts 大屏首页 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在当前空目录下搭建一个 Vue 3 + ECharts 大屏页面，顶部四个菜单可切换，首页总览完整展示图表，其余页面先置空。

**Architecture:** 用 `Vite + Vue Router` 组织页面路由，`DashboardLayout` 负责统一的顶部导航和内容区背景，`Overview` 负责首页总览的图表与中心地球主视觉。图表逻辑收敛在小型可复用组件中，所有数据使用本地 mock，避免依赖后端。

**Tech Stack:** Vue 3, Vue Router, Element Plus, ECharts, Sass, Vite

---

### Task 1: Project Skeleton

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.js`
- Create: `src/App.vue`

- [ ] **Step 1: Define project entry and dependencies**

```json
{
  "name": "echarts-dv",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

- [ ] **Step 2: Verify the app boots with Vue Router and Element Plus**

Run: `npm run dev`
Expected: Vite serves the app without missing-entry errors.

### Task 2: Layout and Navigation

**Files:**
- Create: `src/layouts/DashboardLayout.vue`
- Create: `src/components/DashboardHeader.vue`
- Create: `src/router/index.js`

- [ ] **Step 1: Build the fixed top navigation and route table**

```vue
<template>
  <DashboardHeader />
  <router-view />
</template>
```

- [ ] **Step 2: Verify menu switching**

Run: `npm run dev`
Expected: Clicking each menu updates the active state and route.

### Task 3: Overview Page and Charts

**Files:**
- Create: `src/views/Overview.vue`
- Create: `src/components/ChartBox.vue`
- Create: `src/utils/mockDashboard.js`

- [ ] **Step 1: Add mock dashboard data and ECharts options**

```js
export const overviewMock = {
  leftTrend: [...],
  rightStatus: [...],
}
```

- [ ] **Step 2: Render the center globe and surrounding chart cards**

Run: `npm run dev`
Expected: Homepage shows six chart blocks, KPI cards, and the supplied center globe image.

### Task 4: Empty Route Pages and Global Styling

**Files:**
- Create: `src/views/EmptyPage.vue`
- Create: `src/styles/global.scss`

- [ ] **Step 1: Add blank placeholder pages for non-home menus**

```vue
<template>
  <div class="empty-page" />
</template>
```

- [ ] **Step 2: Apply the dashboard background, typography, and responsive layout**

Run: `npm run build`
Expected: Production build succeeds and the layout remains full screen.

