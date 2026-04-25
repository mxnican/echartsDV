<template>
  <section class="chart-box" :class="toneClass">
    <div v-if="title || subtitle" class="chart-box__header">
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
  border: vw(1) solid var(--panel-border);
  border-radius: vw(18);
  background: var(--panel-bg);
  box-shadow:
    0 0 0 vw(1) rgba(255, 255, 255, 0.02) inset,
    0 0 vw(28) rgba(47, 228, 255, 0.05),
    0 vh(18) vw(30) rgba(0, 0, 0, 0.22);
  overflow: hidden;
}

.chart-box__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: vh(12) vw(14) vh(10);
  position: relative;
}

.chart-box__title {
  font-size: vh(18);
  letter-spacing: vw(1);
  padding-left: vw(14);
}

.chart-box__title::before {
  content: '';
  position: absolute;
  left: vw(14);
  top: vh(15);
  width: vw(4);
  height: vh(18);
  border-radius: vw(999);
  background: linear-gradient(180deg, #2fe4ff, #2f8cff);
}

.chart-box__subtitle {
  font-size: vh(12);
  color: var(--text-sub);
}

.chart-box__body {
  flex: 1 1 auto;
  min-height: 0;
  padding: 0 vw(10) vh(10);
  box-sizing: border-box;
}
</style>
