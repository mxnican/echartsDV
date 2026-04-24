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
import topBar from '../../image/top_bar.png'

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
  margin-top: 15px;
}
</style>
