<template>
  <div class="center-summary-grid">
    <div
      v-for="item in items"
      :key="item.label"
      class="center-summary-card"
      :style="{ '--summary-accent': item.accent }"
    >
      <div class="center-summary-card__icon">
        <el-icon>
          <component :is="iconMap[item.icon]" />
        </el-icon>
      </div>
      <div class="center-summary-card__label">{{ item.label }}</div>
      <div class="center-summary-card__value">{{ item.value }}</div>
      <div class="center-summary-card__delta">较昨日 <span>▲ {{ item.delta }}</span></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Coin, Document, UserFilled } from '@element-plus/icons-vue'

defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const iconMap = computed(() => ({
  user: UserFilled,
  order: Document,
  money: Coin,
  active: UserFilled,
}))
</script>

<style lang="scss" scoped>
.center-summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  border: vw(1) solid rgba(47, 140, 255, 0.28);
  border-radius: vw(14);
  background: linear-gradient(180deg, rgba(6, 24, 52, 0.96), rgba(4, 17, 41, 0.98));
  box-shadow:
    0 0 0 vw(1) rgba(44, 171, 255, 0.08) inset,
    0 0 vw(18) rgba(17, 112, 255, 0.08);
}

.center-summary-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: vh(6);
  padding: vh(12) vw(10);
  height: 100%;
}

.center-summary-card + .center-summary-card {
  border-left: vw(1) solid rgba(77, 152, 255, 0.28);
}

.center-summary-card__icon {
  width: vw(60);
  height: vw(60);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2fe4ff;
  background:
    radial-gradient(circle at 50% 50%, rgba(47, 228, 255, 0.2), rgba(47, 140, 255, 0.04) 68%, transparent 70%),
    rgba(6, 28, 69, 0.68);
  border: vw(1) solid rgba(47, 140, 255, 0.35);
  font-size: vw(30);
  box-shadow:
    0 0 0 vw(1) rgba(47, 140, 255, 0.08) inset,
    0 0 vw(14) rgba(47, 140, 255, 0.18);
    margin-bottom: vh(15);
}

.center-summary-card__label {
  font-size: vw(14);
  color: rgba(214, 228, 245, 0.76);
  text-align: center;
  margin-bottom: vh(15);
}

.center-summary-card__value {
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
  line-height: 1;
  color: #f4fbff;
  font-size: vw(28);
  letter-spacing: vw(1);
  text-shadow: 0 0 vh(10) rgba(47, 228, 255, 0.14);
  margin-bottom: vh(15);
}

.center-summary-card__delta {
  display: flex;
  align-items: center;
  gap: vw(6);
  font-size: vw(14);
  color: rgba(214, 228, 245, 0.76);
  white-space: nowrap;
}

.center-summary-card__delta span {
  color: #39e7c8;
  font-weight: 700;
}
</style>
