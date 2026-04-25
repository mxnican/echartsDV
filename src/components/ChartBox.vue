<template>
  <section class="chart-box" :class="toneClass">
    <div class="chart-box__header">
      <div class="chart-box__title">{{ title }}</div>
      <div v-if="subtitle" class="chart-box__subtitle">{{ subtitle }}</div>
    </div>
    <div class="chart-box__body">
      <slot />
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  toneClass: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
.chart-box {
  min-height: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--panel-border);
  border-radius: 18px;
  background: var(--panel-bg);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.02) inset,
    0 0 28px rgba(47, 228, 255, 0.05),
    0 18px 30px rgba(0, 0, 0, 0.22);
  overflow: hidden;
}

.chart-box__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 12px 14px 10px;
}

.chart-box__title {
  font-size: 18px;
  letter-spacing: 1px;
}

.chart-box__subtitle {
  font-size: 12px;
  color: var(--text-sub);
}

.chart-box__body {
  flex: 1 1 auto;
  min-height: 0;
  padding: 0 10px 10px;
  box-sizing: border-box;
}
</style>
