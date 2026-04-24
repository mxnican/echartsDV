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
