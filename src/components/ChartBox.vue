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
