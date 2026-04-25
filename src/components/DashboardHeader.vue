<template>
  <header class="dashboard-header">
    <img class="header-bg" :src="topBar" alt="" />
    <div class="header-inner">
      <nav class="menu menu-left">
        <button
          v-for="item in leftMenus"
          :key="item.path"
          class="menu-item"
          :class="{ active: route.path === item.path }"
          type="button"
          @click="router.push(item.path)"
        >
          <el-icon class="menu-icon">
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.label }}</span>
        </button>
      </nav>

      <div class="header-title">
        <div class="title-main">智慧大屏数据总览</div>
        <div class="title-sub">ECharts Visualization Dashboard</div>
      </div>

      <nav class="menu menu-right">
        <button
          v-for="item in rightMenus"
          :key="item.path"
          class="menu-item"
          :class="{ active: route.path === item.path }"
          type="button"
          @click="router.push(item.path)"
        >
          <el-icon class="menu-icon">
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.label }}</span>
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DataLine, Monitor, Operation, House } from '@element-plus/icons-vue'
import topBar from '@/assets/images/top_bar.png'

const route = useRoute()
const router = useRouter()

const menus = [
  { label: '首页总览', path: '/overview', icon: House },
  { label: '数据分析', path: '/analysis', icon: DataLine },
  { label: '业务监控', path: '/monitor', icon: Monitor },
  { label: '系统管理', path: '/system', icon: Operation },
]

const leftMenus = computed(() => menus.slice(0, 2))
const rightMenus = computed(() => menus.slice(2))
</script>

<style lang="scss" scoped>
.dashboard-header {
  position: relative;
  inset: auto;
  height: var(--header-height);
  z-index: 20;
  pointer-events: none;
  overflow: hidden;
  background: var(--page-bg);
  margin-top: 15px;
}

.header-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

.header-inner {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: flex-start;
  padding: 8px 28px 0;
  box-sizing: border-box;
}

.header-title {
  text-align: center;
  margin-top: -2px;
}

.title-main {
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
  font-size: 38px;
  line-height: 1;
  letter-spacing: 4px;
  color: #f4fbff;
  text-shadow: 0 0 22px rgba(54, 197, 255, 0.45);
}

.title-sub {
  margin-top: 4px;
  font-size: 12px;
  letter-spacing: 8px;
  color: rgba(192, 231, 255, 0.72);
}

.menu {
  display: flex;
  gap: 14px;
  pointer-events: auto;
  margin-top: -2px;
}

.menu-left {
  justify-content: flex-start;
}

.menu-right {
  justify-content: flex-end;
}

.menu-item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 160px;
  padding: 14px 18px 13px;
  border: 1px solid transparent;
  border-radius: 999px;
  background: rgba(7, 23, 41, 0.12);
  color: rgba(224, 244, 255, 0.88);
  font-size: 18px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.menu-item:hover {
  transform: translateY(-1px);
  color: #ffffff;
}

.menu-item.active {
  border-color: rgba(47, 228, 255, 0.46);
  background: linear-gradient(180deg, rgba(47, 228, 255, 0.18), rgba(78, 165, 255, 0.08));
  box-shadow: 0 0 0 1px rgba(47, 228, 255, 0.12) inset, 0 0 22px rgba(47, 228, 255, 0.12);
  color: #ffffff;
}

.menu-icon {
  font-size: 18px;
}
</style>
