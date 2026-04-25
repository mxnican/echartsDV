<template>
  <div class="overview-page">
    <section class="dashboard-layout">
      <div class="column">
        <ChartBox class="panel panel--tall" title="核心指标概览">
          <div class="core-metrics">
            <div
              v-for="item in coreMetrics"
              :key="item.label"
              class="core-metric"
              :style="{ '--metric-accent': item.accent }"
            >
              <div class="core-metric__icon">
                <el-icon>
                  <component :is="metricIconMap[item.icon]" />
                </el-icon>
              </div>
              <div class="core-metric__label">{{ item.label }}</div>
              <div class="core-metric__value">
                {{ item.value }}
              </div>
              <div class="core-metric__delta">
                <span class="core-metric__delta-label">较昨日</span>
                <span class="core-metric__delta-value">▲ {{ item.delta }}</span>
              </div>
            </div>
          </div>
        </ChartBox>

        <ChartBox class="panel panel--middle panel--trend" title="访问趋势分析" subtitle="">
          <div ref="pvUvTrendRef" class="chart-box__chart" />
        </ChartBox>

        <ChartBox class="panel panel--bottom" title="用户画像">
          <div class="user-profile-panel">
            <div ref="profileRef" class="chart-box__chart chart-box__chart--radar user-profile-panel__chart" />
            <div class="user-profile-panel__list">
              <div
                v-for="item in userProfileDetails"
                :key="item.title"
                class="user-profile-item"
              >
                <div class="user-profile-item__title">{{ item.title }}</div>
                <div class="user-profile-item__status">{{ item.status }}</div>
              </div>
            </div>
          </div>
        </ChartBox>
      </div>

      <div class="column column-center">
        <section class="center-map-panel">
          <img class="center-map-image" :src="centerBg" alt="center globe" />
        </section>

        <ChartBox class="panel panel--summary" title="">
          <div class="summary-grid">
            <div
              v-for="item in centerSummary"
              :key="item.label"
              class="summary-card"
              :style="{ '--summary-accent': item.accent }"
            >
              <div class="summary-card__icon">
                <el-icon>
                  <component :is="summaryIconMap[item.icon]" />
                </el-icon>
              </div>
              <div class="summary-card__label">{{ item.label }}</div>
              <div class="summary-card__value">{{ item.value }}</div>
              <div class="summary-card__delta">较昨日 <span>▲ {{ item.delta }}</span></div>
            </div>
          </div>
        </ChartBox>
      </div>

      <div class="column">
        <ChartBox class="panel panel--middle" title="销售额趋势分析">
          <div ref="salesTrendRef" class="chart-box__chart" />
        </ChartBox>

        <ChartBox class="panel panel--middle" title="渠道占比">
          <div ref="channelRef" class="chart-box__chart" />
        </ChartBox>

        <ChartBox class="panel panel--tall" title="实时交易动态">
          <div class="trade-table">
            <div class="trade-table__head">
              <span>时间</span>
              <span>用户</span>
              <span>地区</span>
              <span>订单金额</span>
            </div>
            <div class="trade-table__viewport">
              <div class="trade-table__track">
                <div v-for="(row, index) in tradeRows" :key="`${row.time}-${index}`" class="trade-table__row">
                  <span>{{ row.time }}</span>
                  <span>{{ row.user }}</span>
                  <span>{{ row.region }}</span>
                  <span class="trade-table__amount">{{ row.amount }}</span>
                </div>
                <div v-for="(row, index) in tradeRows" :key="`dup-${row.time}-${index}`" class="trade-table__row">
                  <span>{{ row.time }}</span>
                  <span>{{ row.user }}</span>
                  <span>{{ row.region }}</span>
                  <span class="trade-table__amount">{{ row.amount }}</span>
                </div>
              </div>
            </div>
          </div>
        </ChartBox>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { Coin, Document, UserFilled, View } from '@element-plus/icons-vue'
import ChartBox from '@/components/ChartBox.vue'
import centerBg from '@/assets/images/center_bg.png'
import {
  centerSummary,
  channelShare,
  coreMetrics,
  pvUvTrend,
  salesTrend,
  userProfileDetails,
  transactionRows,
  userProfileRadar,
} from '@/utils/mockDashboard'

const pvUvTrendRef = ref(null)
const profileRef = ref(null)
const salesTrendRef = ref(null)
const channelRef = ref(null)
const charts = []

const tradeRows = transactionRows

const metricIconMap = {
  view: View,
  user: UserFilled,
  order: Document,
  money: Coin,
}

const summaryIconMap = {
  user: UserFilled,
  order: Document,
  money: Coin,
  active: UserFilled,
}

function createChart(el, option) {
  if (!el) return null
  const chart = echarts.init(el)
  chart.setOption(option)
  charts.push(chart)
  return chart
}

function buildTrendOption() {
  const pvColor = '#2f8cff'
  const uvColor = '#16e6b4'

  const formatWan = (value) => `${Number(value).toFixed(2)}万`

  return {
    backgroundColor: 'transparent',
    grid: { left: 46, right: 28, top: 58, bottom: 20, containLabel: true },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(5, 20, 54, 0.96)',
      borderColor: 'rgba(44, 145, 255, 0.46)',
      borderWidth: 1,
      padding: [12, 16],
      textStyle: {
        color: '#eaf6ff',
        fontSize: 14,
      },
      extraCssText: 'box-shadow: 0 0 18px rgba(25, 126, 255, 0.22); border-radius: 10px;',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: 'rgba(47, 140, 255, 0.72)',
          width: 1,
        },
      },
      formatter(params) {
        if (!params?.length) return ''
        const [pvItem, uvItem] = params
        const dot = (color) =>
          `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color};box-shadow:0 0 10px ${color};margin-right:8px;"></span>`

        return `
          <div style="min-width:140px;">
            <div style="font-size:16px;font-weight:700;margin-bottom:10px;color:#d9ecff;">${pvItem.axisValue}</div>
            <div style="display:flex;align-items:center;gap:6px;line-height:1.8;color:#dcecff;">
              ${dot(pvColor)}<span>PV: ${formatWan(pvItem.data)}</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px;line-height:1.8;color:#dcecff;">
              ${dot(uvColor)}<span>UV: ${formatWan(uvItem.data)}</span>
            </div>
          </div>
        `
      },
    },
    legend: {
      top: 12,
      right: 18,
      itemWidth: 12,
      itemHeight: 3,
      itemGap: 18,
      textStyle: {
        color: '#dcecff',
        fontSize: 14,
        fontWeight: 700,
      },
      icon: 'rect',
    },
    graphic: [
      {
        type: 'text',
        left: 14,
        top: 14,
        style: {
          text: '单位：万',
          fill: '#cfe4ff',
          fontSize: 14,
          fontWeight: 700,
        },
      },
    ],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: pvUvTrend.days,
      axisTick: { show: false },
      axisLine: { lineStyle: { color: 'rgba(56, 129, 255, 0.32)', width: 1 } },
      axisLabel: {
        color: '#d8e8ff',
        fontSize: 12,
        margin: 16,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(56, 129, 255, 0.08)',
          type: 'solid',
        },
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 150,
      interval: 50,
      axisTick: { show: false },
      axisLine: { lineStyle: { color: 'rgba(56, 129, 255, 0.32)', width: 1 } },
      axisLabel: {
        color: '#d8e8ff',
        fontSize: 12,
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(56, 129, 255, 0.15)',
          width: 1,
        },
      },
    },
    series: [
      {
        name: 'PV',
        data: pvUvTrend.pv,
        type: 'line',
        smooth: 0.38,
        symbol: 'circle',
        symbolSize: 7,
        showSymbol: true,
        lineStyle: {
          width: 2.5,
          color: pvColor,
          shadowBlur: 12,
          shadowColor: 'rgba(47, 140, 255, 0.42)',
        },
        itemStyle: {
          color: pvColor,
          borderColor: '#0f6ee6',
          borderWidth: 1,
        },
      },
      {
        name: 'UV',
        data: pvUvTrend.uv,
        type: 'line',
        smooth: 0.38,
        symbol: 'circle',
        symbolSize: 7,
        showSymbol: true,
        lineStyle: {
          width: 2.5,
          color: uvColor,
          shadowBlur: 12,
          shadowColor: 'rgba(22, 230, 180, 0.38)',
        },
        itemStyle: {
          color: uvColor,
          borderColor: '#11b98f',
          borderWidth: 1,
        },
      },
    ],
    animationDuration: 900,
    animationEasing: 'cubicOut',
  }
}

function buildRadarOption() {
  const radarColor = '#28d7ff'
  const radarFill = 'rgba(45, 119, 255, 0.52)'
  const radarEdge = 'rgba(58, 164, 255, 0.92)'

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(5, 20, 54, 0.96)',
      borderColor: 'rgba(44, 145, 255, 0.46)',
      borderWidth: 1,
      textStyle: { color: '#eaf6ff' },
    },
    radar: {
      indicator: userProfileRadar.indicator,
      center: ['50%', '60%'],
      radius: '68%',
      startAngle: 90,
      shape: 'polygon',
      axisName: {
        color: '#dcecff',
        fontSize: 13,
        fontWeight: 700,
        formatter: (name) => name,
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(45, 177, 255, 0.42)',
          width: 1,
        },
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(45, 177, 255, 0.22)',
          width: 1,
        },
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(10, 28, 61, 0.06)', 'rgba(10, 28, 61, 0.1)'],
        },
      },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: userProfileRadar.value,
            name: '用户画像',
            areaStyle: { color: radarFill },
            lineStyle: {
              color: radarColor,
              width: 2.5,
              shadowBlur: 20,
              shadowColor: 'rgba(40, 215, 255, 0.45)',
            },
            itemStyle: {
              color: '#eafaff',
              borderColor: radarEdge,
              borderWidth: 1.5,
            },
            symbol: 'circle',
            symbolSize: 7,
          },
        ],
      },
    ],
    animationDuration: 800,
    animationEasing: 'cubicOut',
  }
}

function buildSalesTrendOption() {
  return {
    grid: { left: 46, right: 46, top: 38, bottom: 26, containLabel: true },
    tooltip: { trigger: 'axis' },
    legend: {
      top: 6,
      right: 12,
      textStyle: { color: '#cfe7ff' },
    },
    xAxis: {
      type: 'category',
      data: salesTrend.days,
      axisLine: { lineStyle: { color: 'rgba(134, 198, 255, 0.35)' } },
      axisLabel: { color: '#9ec7ff' },
    },
    yAxis: [
      {
        type: 'value',
        name: '万元',
        nameTextStyle: { color: '#9ec7ff' },
        axisLabel: { color: '#9ec7ff' },
        splitLine: { lineStyle: { color: 'rgba(134, 198, 255, 0.12)' } },
      },
      {
        type: 'value',
        name: '%',
        nameTextStyle: { color: '#9ec7ff' },
        axisLabel: { color: '#9ec7ff' },
      },
    ],
    series: [
      {
        name: '销售额',
        type: 'bar',
        data: salesTrend.sales,
        barWidth: 14,
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2f8cff' },
            { offset: 1, color: '#143b6b' },
          ]),
        },
      },
      {
        name: '增长率',
        type: 'line',
        yAxisIndex: 1,
        data: salesTrend.growth,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { width: 3, color: '#39e7c8' },
        itemStyle: { color: '#39e7c8' },
      },
    ],
  }
}

function buildChannelOption() {
  return {
    tooltip: { trigger: 'item' },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'middle',
      textStyle: { color: '#d9ebff' },
    },
    series: [
      {
        type: 'pie',
        radius: ['38%', '68%'],
        center: ['33%', '50%'],
        label: { color: '#fff' },
        itemStyle: { borderColor: '#081429', borderWidth: 4 },
        data: channelShare,
      },
    ],
    color: ['#2f8cff', '#35d4ff', '#ffb86b', '#8f67ff', '#39e7c8'],
  }
}

function resizeCharts() {
  charts.forEach((chart) => chart.resize())
}

onMounted(() => {
  createChart(pvUvTrendRef.value, buildTrendOption())
  createChart(profileRef.value, buildRadarOption())
  createChart(salesTrendRef.value, buildSalesTrendOption())
  createChart(channelRef.value, buildChannelOption())
  window.addEventListener('resize', resizeCharts)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCharts)
  charts.forEach((chart) => chart.dispose())
})
</script>

<style lang="scss" scoped>
.overview-page {
  position: relative;
  width: 100%;
  height: 100%;
  padding: vh(10) vw(12) vh(12);
  box-sizing: border-box;
}

.dashboard-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.94fr) minmax(0, 1.12fr) minmax(0, 0.94fr);
  gap: vw(12);
  width: 100%;
  height: 100%;
  min-height: 0;
  align-items: stretch;
}

.column {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: vw(12);
  min-height: 0;
}

.column-center {
  justify-content: space-between;
  gap: vw(12);
}

.panel {
  min-height: 0;
}

.panel--middle {
  flex: 1.15;
}

.panel--trend {
  flex: 1.35;
}

.panel--tall {
  flex: 1.15;
}
.panel--bottom {
  flex: 1.25;
}

.panel--summary {
  flex: 0.9;
}

.chart-box__chart {
  width: 100%;
  height: 100%;
  min-height: 0;
}

.chart-box__chart--radar {
  padding-top: vh(10);
  box-sizing: border-box;
}

.user-profile-panel {
  display: grid;
  grid-template-columns: minmax(0, 1.32fr) minmax(0, 0.68fr);
  gap: vw(8);
  width: 100%;
  height: 100%;
  min-height: 0;
}

.user-profile-panel__chart {
  min-height: 0;
}

.user-profile-panel__list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: vh(10);
  min-height: 0;
  padding: vh(10) vw(6) vh(20) vw(14);
  box-sizing: border-box;
}

.user-profile-item {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: vh(38);
  padding: 0 0 0 vw(12);
}

.user-profile-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: vw(4);
  height: vh(18);
  transform: translateY(-50%);
  border-radius: vw(999);
  background: linear-gradient(180deg, #38deff 0%, #2f8cff 100%);
  box-shadow: 0 0 vw(10) rgba(47, 140, 255, 0.35);
}

.user-profile-item__title {
  font-size: vw(15);
  color: rgba(228, 240, 255, 0.9);
  line-height: 1.2;
}

.user-profile-item__status {
  font-size: vw(16);
  font-weight: 700;
  line-height: 1;
  color: #1fe0a0;
  padding-left: vw(4);
}

.core-metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: vw(12);
  height: 100%;
  padding: 0 vw(12) vh(12);
  box-sizing: border-box;
}

.core-metric {
  position: relative;
  border: vw(1) solid rgba(49, 80, 255, 0.58);
  border-radius: vw(10);
  background:
    linear-gradient(180deg, rgba(6, 28, 69, 0.95), rgba(4, 17, 45, 0.98)),
    linear-gradient(180deg, rgba(13, 47, 104, 0.35), rgba(7, 22, 52, 0.18));
  box-shadow:
    0 0 0 vw(1) rgba(44, 171, 255, 0.12) inset,
    0 0 vw(18) rgba(17, 112, 255, 0.16);
  padding: vh(16) vw(12) vh(12);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: vh(12);
  overflow: hidden;
}

.core-metric__icon {
  width: vw(58);
  height: vw(58);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00a4f5;
  background:
    radial-gradient(circle at 50% 50%, rgba(47, 130, 255, 0.22), rgba(47, 68, 255, 0.02) 68%, transparent 70%),
    rgba(6, 28, 69, 0.68);
  border: vw(1) solid rgba(47, 120, 255, 0.35);
  font-size: vw(32);
  box-shadow:
    0 0 0 vw(1) rgba(47, 113, 255, 0.08) inset,
    0 0 vw(16) rgba(47, 95, 255, 0.22);
  position: relative;
  z-index: 1;
}

.summary-card__icon {
  width: vw(34);
  height: vw(34);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--metric-accent);
  background: color-mix(in srgb, var(--metric-accent) 18%, transparent);
  border: vw(1) solid color-mix(in srgb, var(--metric-accent) 35%, transparent);
  font-size: vw(16);
}

.core-metric__label {
  position: relative;
  z-index: 1;
  font-size: vw(18);
  color: rgba(214, 228, 245, 0.82);
  letter-spacing: vw(1);
  text-align: center;
  padding-bottom: vh(12);
}

.summary-card__label {
  font-size: vw(13);
  color: var(--text-sub);
}

.core-metric__value {
  position: relative;
  z-index: 1;
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
  line-height: 1;
  color: #f4fbff;
  text-shadow: 0 0 vh(10) rgba(47, 228, 255, 0.18);
}

.core-metric__value {
  font-size: vw(24);
  letter-spacing: vw(1);
}

.summary-card__value {
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
  line-height: 1;
  color: var(--metric-accent);
  font-size: vw(26);
}

.core-metric__delta {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: vw(12);
  margin-top: auto;
  font-size: vw(12);
  padding-bottom: vh(10);
  color: rgba(214, 228, 245, 0.78);
}

.core-metric__delta-label {
  color: rgba(214, 228, 245, 0.72);
  white-space: nowrap;
}

.core-metric__delta-value {
  color: #39e7c8;
  font-weight: 700;
  letter-spacing: vw(1);
  white-space: nowrap;
}

.summary-card__value {
  margin-top: vh(8);
}

.summary-card__delta {
  font-size: vw(12);
  color: var(--text-sub);
}

.summary-card__delta span {
  color: #39e7c8;
  font-weight: 700;
}

.center-map-panel {
  flex: 0 0 vh(620);
  min-height: 0;
  overflow: hidden;
  background: transparent;
  position: relative;
}

.center-map-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  object-position: center top;
  display: block;
}

.summary-grid {
  flex: 1 1 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: vw(10);
  padding: 0 vw(8) vh(8);
  box-sizing: border-box;
}

.summary-card {
  border: vw(1) solid rgba(88, 183, 255, 0.18);
  border-radius: vw(12);
  background: linear-gradient(180deg, rgba(10, 28, 50, 0.9), rgba(7, 22, 41, 0.8));
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: vh(12) vw(14);
}

.trade-table {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  padding: 0 vw(8) vh(10);
  box-sizing: border-box;
}

.trade-table__head {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.3fr 0.8fr;
  gap: vw(10);
  padding: 0 vw(6) vh(8);
  color: var(--text-sub);
  font-size: vw(12);
}

.trade-table__viewport {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  position: relative;
}

.trade-table__track {
  display: flex;
  flex-direction: column;
  animation: tradeScroll 16s linear infinite;
}

.trade-table__row {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.3fr 0.8fr;
  gap: vw(10);
  align-items: center;
  padding: vh(10) vw(6);
  border-bottom: vw(1) solid rgba(131, 181, 231, 0.12);
  font-size: vw(12);
}

.trade-table__amount {
  color: #39e7c8;
  font-weight: 700;
}

@keyframes tradeScroll {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-50%);
  }
}
</style>
