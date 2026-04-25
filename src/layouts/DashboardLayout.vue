<template>
  <div class="dashboard-shell">
    <DashboardHeader />
    <main class="dashboard-main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import DashboardHeader from '@/components/DashboardHeader.vue'
</script>

<style lang="scss" scoped>
.dashboard-shell {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--page-bg);
  display: flex;
  flex-direction: column;
}

.dashboard-main {
  position: relative;
  width: 100%;
  flex: 1;
  min-height: 0;
  height: auto;
  padding-top: 0;
  box-sizing: border-box;
  overflow: hidden;
  background: var(--page-bg);
}
</style>
