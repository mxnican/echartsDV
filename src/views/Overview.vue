<template>
  <div class="overview-page">
    <section class="dashboard-layout">
      <div class="column column-left">
        <ChartBox title="核心指标概览">
          <div class="core-metrics">
            <div
              v-for="item in coreMetrics"
              :key="item.label"
              class="core-metric"
              :style="{ '--metric-accent': item.accent }"
            >
              <div class="core-metric__icon">
                <span>{{ item.icon }}</span>
              </div>
              <div class="core-metric__label">{{ item.label }}</div>
              <div class="core-metric__value">
                {{ item.value }}<small>{{ item.unit }}</small>
              </div>
            </div>
          </div>
        </ChartBox>

        <ChartBox title="访问趋势分析" subtitle="PV / UV 双折线图">
          <div ref="pvUvTrendRef" class="chart-box__chart" />
        </ChartBox>

        <ChartBox title="用户画像" subtitle="五维雷达图">
          <div ref="profileRef" class="chart-box__chart" />
        </ChartBox>

        <ChartBox title="设备终端分布" subtitle="环形饼图">
          <div ref="deviceRef" class="chart-box__chart" />
        </ChartBox>
      </div>

      <div class="column column-center">
        <section class="center-map-panel">
          <img class="center-map-image" :src="centerBg" alt="center globe" />
        </section>

        <ChartBox title="中间概览">
          <div class="summary-grid">
            <div
              v-for="item in centerSummary"
              :key="item.label"
              class="summary-card"
              :style="{ '--summary-accent': item.accent }"
            >
              <div class="summary-card__label">{{ item.label }}</div>
              <div class="summary-card__value">{{ item.value }}</div>
            </div>
          </div>
        </ChartBox>

        <ChartBox title="最近活跃用户数" subtitle="柱状图">
          <div ref="activeUsersRef" class="chart-box__chart" />
        </ChartBox>
      </div>

      <div class="column column-right">
        <ChartBox title="销售额趋势分析" subtitle="销售额 + 增长率">
          <div ref="salesTrendRef" class="chart-box__chart" />
        </ChartBox>

        <ChartBox title="渠道占比" subtitle="环形饼图">
          <div ref="channelRef" class="chart-box__chart" />
        </ChartBox>

        <ChartBox title="实时交易动态" subtitle="滚动列表">
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

        <ChartBox title="系统运行状态" subtitle="四项环形进度">
          <div class="system-grid">
            <div v-for="(item, index) in systemUsage" :key="item.label" class="system-item">
              <div :ref="(el) => registerSystemRef(el, index)" class="system-item__chart" />
              <div class="system-item__label">{{ item.label }}</div>
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
import ChartBox from '@/components/ChartBox.vue'
import centerBg from '@/assets/images/center_bg.png'
import {
  activeUsersTrend,
  centerSummary,
  channelShare,
  coreMetrics,
  deviceDistribution,
  pvUvTrend,
  salesTrend,
  systemUsage,
  transactionRows,
  userProfileRadar,
} from '@/utils/mockDashboard'

const pvUvTrendRef = ref(null)
const profileRef = ref(null)
const deviceRef = ref(null)
const activeUsersRef = ref(null)
const salesTrendRef = ref(null)
const channelRef = ref(null)
const systemRefs = ref([])
const charts = []

const tradeRows = transactionRows

function registerSystemRef(el, index) {
  if (el) systemRefs.value[index] = el
}

function createChart(el, option) {
  if (!el) return null
  const chart = echarts.init(el)
  chart.setOption(option)
  charts.push(chart)
  return chart
}

function buildTrendOption() {
  return {
    grid: { left: 40, right: 20, top: 40, bottom: 25, containLabel: true },
    tooltip: { trigger: 'axis' },
    legend: {
      top: 4,
      right: 8,
      textStyle: { color: '#cfe7ff' },
      itemWidth: 12,
      itemHeight: 8,
    },
    xAxis: {
      type: 'category',
      data: pvUvTrend.days,
      axisLine: { lineStyle: { color: 'rgba(134, 198, 255, 0.35)' } },
      axisLabel: { color: '#9ec7ff' },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(134, 198, 255, 0.12)' } },
      axisLabel: { color: '#9ec7ff' },
    },
    series: [
      {
        name: 'PV',
        data: pvUvTrend.pv,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { width: 3, color: '#2fe4ff' },
        itemStyle: { color: '#2fe4ff' },
      },
      {
        name: 'UV',
        data: pvUvTrend.uv,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { width: 3, color: '#6af0c8' },
        itemStyle: { color: '#6af0c8' },
      },
    ],
  }
}

function buildRadarOption() {
  return {
    tooltip: { trigger: 'item' },
    radar: {
      indicator: userProfileRadar.indicator,
      axisName: { color: '#d9ebff', fontSize: 12 },
      axisLine: { lineStyle: { color: 'rgba(134, 198, 255, 0.16)' } },
      splitLine: {
        lineStyle: {
          color: ['rgba(134, 198, 255, 0.12)', 'rgba(134, 198, 255, 0.18)', 'rgba(134, 198, 255, 0.24)'],
        },
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(8, 20, 41, 0.12)', 'rgba(8, 20, 41, 0.24)'],
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
            areaStyle: { color: 'rgba(47, 228, 255, 0.18)' },
            lineStyle: { color: '#2fe4ff', width: 2 },
            itemStyle: { color: '#2fe4ff' },
          },
        ],
      },
    ],
  }
}

function buildDeviceOption() {
  return {
    tooltip: { trigger: 'item' },
    legend: {
      bottom: 0,
      textStyle: { color: '#d9ebff' },
    },
    series: [
      {
        type: 'pie',
        radius: ['42%', '66%'],
        center: ['50%', '44%'],
        label: { color: '#fff' },
        itemStyle: { borderColor: '#081429', borderWidth: 4 },
        data: deviceDistribution,
      },
    ],
    color: ['#2fe4ff', '#4ea5ff', '#6af0c8', '#ffd86b'],
  }
}

function buildActiveUsersOption() {
  return {
    grid: { left: 36, right: 18, top: 30, bottom: 20, containLabel: true },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: activeUsersTrend.days,
      axisLine: { lineStyle: { color: 'rgba(134, 198, 255, 0.35)' } },
      axisLabel: { color: '#9ec7ff' },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(134, 198, 255, 0.12)' } },
      axisLabel: { color: '#9ec7ff' },
    },
    series: [
      {
        data: activeUsersTrend.values,
        type: 'bar',
        barWidth: 16,
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2fe4ff' },
            { offset: 1, color: '#143b6b' },
          ]),
        },
      },
    ],
  }
}

function buildSalesTrendOption() {
  return {
    grid: { left: 46, right: 46, top: 40, bottom: 28, containLabel: true },
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

function buildSystemOption(item) {
  return {
    tooltip: { trigger: 'item' },
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '43%',
        style: {
          text: `${item.value}%`,
          fill: '#ecf7ff',
          fontSize: 26,
          fontWeight: 700,
          fontFamily: 'Microsoft YaHei',
        },
      },
    ],
    series: [
      {
        type: 'pie',
        radius: ['72%', '88%'],
        center: ['50%', '52%'],
        silent: true,
        label: { show: false },
        data: [
          { value: item.value, itemStyle: { color: item.color } },
          { value: 100 - item.value, itemStyle: { color: 'rgba(255,255,255,0.08)' } },
        ],
      },
    ],
  }
}

function buildGaugeCharts() {
  systemRefs.value.forEach((el, index) => {
    if (!el) return
    createChart(el, buildSystemOption(systemUsage[index]))
  })
}

function resizeCharts() {
  charts.forEach((chart) => chart.resize())
}

onMounted(() => {
  createChart(pvUvTrendRef.value, buildTrendOption())
  createChart(profileRef.value, buildRadarOption())
  createChart(deviceRef.value, buildDeviceOption())
  createChart(activeUsersRef.value, buildActiveUsersOption())
  createChart(salesTrendRef.value, buildSalesTrendOption())
  createChart(channelRef.value, buildChannelOption())
  buildGaugeCharts()
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
  padding: 10px 12px 12px;
  box-sizing: border-box;
}

.dashboard-layout {
  display: flex;
  gap: 12px;
  width: 100%;
  height: 100%;
  min-height: 0;
}

.column {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
}

.column-left,
.column-right {
  flex: 1;
}

.column-center {
  flex: 1.06;
}

.chart-box__chart {
  width: 100%;
  height: 100%;
  min-height: 0;
}

.core-metrics {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  height: 100%;
  padding: 0 8px 8px;
  box-sizing: border-box;
}

.core-metric {
  border: 1px solid rgba(88, 183, 255, 0.18);
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(10, 28, 50, 0.92), rgba(7, 22, 41, 0.84));
  padding: 12px 12px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}

.core-metric__icon {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--metric-accent);
  background: color-mix(in srgb, var(--metric-accent) 18%, transparent);
  border: 1px solid color-mix(in srgb, var(--metric-accent) 35%, transparent);
  font-size: 11px;
}

.core-metric__label {
  font-size: 13px;
  color: var(--text-sub);
}

.core-metric__value {
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
  font-size: 24px;
  line-height: 1;
  color: var(--metric-accent);
}

.core-metric__value small {
  margin-left: 6px;
  font-family: 'Microsoft YaHei', sans-serif;
  font-size: 12px;
  color: rgba(231, 245, 255, 0.72);
}

.center-map-panel {
  flex: 1.5;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: transparent;
}

.center-map-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  height: 100%;
  padding: 0 8px 8px;
  box-sizing: border-box;
}

.summary-card {
  border: 1px solid rgba(88, 183, 255, 0.18);
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(10, 28, 50, 0.9), rgba(7, 22, 41, 0.8));
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 12px 14px;
}

.summary-card__label {
  font-size: 12px;
  color: var(--text-sub);
}

.summary-card__value {
  margin-top: 8px;
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
  font-size: 24px;
  line-height: 1;
  color: var(--summary-accent);
}

.trade-table {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  padding: 0 8px 10px;
  box-sizing: border-box;
}

.trade-table__head {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.3fr 0.8fr;
  gap: 10px;
  padding: 0 6px 8px;
  color: var(--text-sub);
  font-size: 12px;
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
  gap: 10px;
  align-items: center;
  padding: 10px 6px;
  border-bottom: 1px solid rgba(131, 181, 231, 0.12);
  font-size: 12px;
}

.trade-table__amount {
  color: #39e7c8;
  font-weight: 700;
}

.system-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  height: 100%;
  padding: 0 8px 8px;
  box-sizing: border-box;
}

.system-item {
  border: 1px solid rgba(88, 183, 255, 0.16);
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(10, 28, 50, 0.88), rgba(7, 22, 41, 0.78));
  padding: 8px 8px 6px;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.system-item__chart {
  flex: 1;
  min-height: 110px;
}

.system-item__label {
  text-align: center;
  margin-top: 4px;
  font-size: 12px;
  color: var(--text-sub);
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
