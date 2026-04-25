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
          :style="{ '--menu-glow': `url(${guangxiao})` }"
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
        <div class="title-main">ECharts 可视化大屏展示</div>
      </div>

      <nav class="menu menu-right">
        <button
          v-for="item in rightMenus"
          :key="item.path"
          class="menu-item"
          :class="{ active: route.path === item.path }"
          :style="{ '--menu-glow': `url(${guangxiao})` }"
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
import guangxiao from '@/assets/images/guangxiao.png'

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
  height: vh(84);
  z-index: 20;
  pointer-events: none;
  overflow: hidden;
  background: var(--page-bg);
  margin-top: vh(10);
}

.header-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  object-position: center center;
}

.header-inner {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 vw(28) 0;
  box-sizing: border-box;
}

.header-title {
  text-align: center;
  margin-top: vh(-2);
}

.title-main {
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
  font-size: vw(40);
  font-weight: 600;
  line-height: 1;
  letter-spacing: vw(4);
  color: #f4fbff;
  text-shadow: 0 0 vh(22) rgba(54, 197, 255, 0.45);
}

.title-sub {
  margin-top: vh(4);
  font-size: vw(12);
  letter-spacing: vw(8);
  color: rgba(192, 231, 255, 0.72);
}

.menu {
  display: flex;
  gap: vw(14);
  pointer-events: auto;
  margin-top: vh(-2);
}

.menu-left {
  justify-content: flex-start;
}

.menu-right {
  justify-content: flex-end;
}

.menu-item {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: vw(10);
  min-width: vw(260);
  padding: vh(14) vw(18) vh(14);
  border: none;
  border-radius: 0;
  background: rgba(7, 23, 41, 0.12);
  color: rgba(224, 244, 255, 0.88);
  font-size: vw(24);
  cursor: pointer;
  transition: all 0.25s ease;
}

.menu-item.active {
  color: #f4fbff;
}

.menu-item.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: vh(-34);
  height: vh(70);
  background: var(--menu-glow) no-repeat center bottom / 100% 100%;
  pointer-events: none;
}

.menu-item.active .menu-icon {
  color: #2fe4ff;
}

.menu-icon {
  position: relative;
  z-index: 1;
  font-size: vw(24);
}

.menu-item span {
  position: relative;
  z-index: 1;
}
</style>
