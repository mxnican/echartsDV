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
                {{ item.value }}<small>{{ item.unit }}</small>
              </div>
              <div class="core-metric__delta">较昨日 <span>▲ {{ item.delta }}</span></div>
            </div>
          </div>
        </ChartBox>

        <ChartBox class="panel panel--middle" title="访问趋势分析" subtitle="PV / UV 双折线图">
          <div ref="pvUvTrendRef" class="chart-box__chart" />
        </ChartBox>

        <ChartBox class="panel panel--tall" title="用户画像" subtitle="五维雷达图">
          <div ref="profileRef" class="chart-box__chart" />
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
        <ChartBox class="panel panel--middle" title="销售额趋势分析" subtitle="销售额 + 环比增长率">
          <div ref="salesTrendRef" class="chart-box__chart" />
        </ChartBox>

        <ChartBox class="panel panel--middle" title="渠道占比" subtitle="环形饼图">
          <div ref="channelRef" class="chart-box__chart" />
        </ChartBox>

        <ChartBox class="panel panel--tall" title="实时交易动态" subtitle="滚动列表">
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
import { Coin, Document, TrendCharts, User, UserFilled } from '@element-plus/icons-vue'
import ChartBox from '@/components/ChartBox.vue'
import centerBg from '@/assets/images/center_bg.png'
import {
  centerSummary,
  channelShare,
  coreMetrics,
  pvUvTrend,
  salesTrend,
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
  'trend-up': TrendCharts,
  user: User,
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
  return {
    grid: { left: 40, right: 20, top: 36, bottom: 24, containLabel: true },
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: vw(12);
  width: 100%;
  height: 100%;
  min-height: 0;
}

.column {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: vw(12);
  min-height: 0;
}

.column-center {
  justify-content: flex-start;
  gap: vw(12);
}

.panel {
  min-height: 0;
}

.panel--middle {
  flex: 1.05;
}

.panel--tall {
  flex: 1.25;
}

.panel--summary {
  flex: 0.95;
}

.chart-box__chart {
  width: 100%;
  height: 100%;
  min-height: 0;
}

.core-metrics {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: vw(10);
  height: 100%;
  padding: 0 vw(8) vh(8);
  box-sizing: border-box;
}

.core-metric {
  border: vw(1) solid rgba(88, 183, 255, 0.18);
  border-radius: vw(12);
  background: linear-gradient(180deg, rgba(10, 28, 50, 0.92), rgba(7, 22, 41, 0.84));
  padding: vh(12) vw(12) vh(10);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: vw(8);
}

.core-metric__icon,
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
  font-size: vh(16);
}

.core-metric__label,
.summary-card__label {
  font-size: vh(13);
  color: var(--text-sub);
}

.core-metric__value,
.summary-card__value {
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
  line-height: 1;
  color: var(--metric-accent);
}

.core-metric__value {
  font-size: vh(24);
}

.summary-card__value {
  font-size: vh(26);
}

.core-metric__value small {
  margin-left: vw(6);
  font-family: 'Microsoft YaHei', sans-serif;
  font-size: vh(12);
  color: rgba(231, 245, 255, 0.72);
}

.summary-card__value {
  margin-top: vh(8);
}

.core-metric__delta,
.summary-card__delta {
  font-size: vh(12);
  color: var(--text-sub);
}

.core-metric__delta span,
.summary-card__delta span {
  color: #39e7c8;
  font-weight: 700;
}

.center-map-panel {
  flex: 0 0 vh(520);
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
  font-size: vh(12);
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
  font-size: vh(12);
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
