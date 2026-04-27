export const coreMetrics = [
  {
    label: '总访问量',
    value: '1,345,678',
    icon: 'view',
    accent: '#2fe4ff',
    delta: '12.45%',
  },
  {
    label: '总用户数',
    value: '85,678',
    icon: 'user',
    accent: '#4ea5ff',
    delta: '8.21%',
  },
  {
    label: '订单总数',
    value: '56,789',
    icon: 'order',
    accent: '#6af0c8',
    delta: '6.72%',
  },
  {
    label: '销售额 (元)',
    value: '8,765,432',
    icon: 'money',
    accent: '#ffd86b',
    delta: '11.23%',
  },
]

export const pvUvTrend = {
  days: [
    '05-01', '05-02', '05-03', '05-04', '05-05', '05-06',
    '05-07', '05-08', '05-09', '05-10', '05-11', '05-12',
    '05-13', '05-14', '05-15', '05-16', '05-17', '05-18',
    '05-19', '05-20', '05-21', '05-22', '05-23', '05-24',
  ],
  pv: [
    88.2, 92.5, 101.3, 97.8, 110.6, 123.4, 118.9, 130.2,
    126.5, 119.8, 133.1, 141.6, 137.4, 129.2, 124.9, 132.8,
    138.5, 146.2, 143.7, 136.1, 128.4, 122.6, 131.9, 140.7,
  ],
  uv: [
    28.4, 30.1, 32.8, 31.2, 36.6, 41.8, 39.5, 44.2,
    42.6, 40.1, 45.9, 49.3, 47.8, 46.2, 43.7, 45.5,
    48.1, 51.7, 50.4, 47.9, 44.8, 42.1, 46.5, 49.8,
  ],
}

export const userProfileRadar = {
  indicator: [
    { name: '活跃用户数', max: 100 },
    { name: '支付转化率', max: 100 },
    { name: '复购率', max: 100 },
    { name: '客单价', max: 100 },
    { name: '新增用户增长', max: 100 },
  ],
  value: [85, 78, 72, 65, 90],
}

export const userProfileDetails = [
  { title: '活跃用户数', score: 85, status: '优秀', statusType: 'excellent' },
  { title: '支付转化率', score: 78, status: '良好', statusType: 'good' },
  { title: '复购率', score: 72, status: '良好', statusType: 'good' },
  { title: '客单价', score: 65, status: '中等', statusType: 'medium' },
  { title: '新增用户增长', score: 90, status: '优秀', statusType: 'excellent' },
]

export const centerSummary = [
  {
    label: '今日新增用户',
    value: '23,456',
    accent: '#2fe4ff',
    icon: 'user',
    delta: '12.35%',
  },
  {
    label: '今日新增订单',
    value: '1,234',
    accent: '#4ea5ff',
    icon: 'order',
    delta: '9.21%',
  },
  {
    label: '今日成交额',
    value: '567,890',
    accent: '#6af0c8',
    icon: 'money',
    delta: '8.65%',
  },
  {
    label: '活跃用户数',
    value: '678,901',
    accent: '#ffd86b',
    icon: 'active',
    delta: '7.32%',
  },
]

export const salesTrend = {
  days: ['05-10', '05-11', '05-12', '05-13', '05-14', '05-15', '05-16'],
  sales: [820, 980, 840, 1150, 930, 1180, 1320],
  growth: [16, 22, 7, 18, 11, 9, 6],
}

export const channelShare = [
  { name: '线上商城', value: 35.42 },
  { name: 'APP', value: 25.11 },
  { name: '线下门店', value: 18.33 },
  { name: '小程序', value: 11.23 },
  { name: '合作渠道', value: 9.91 },
]

export const transactionRows = [
  { time: '10:24:53', user: '用户A****', region: '广东省深圳市', amount: '¥2,345' },
  { time: '10:24:45', user: '用户B****', region: '江苏省南京市', amount: '¥1,234' },
  { time: '10:24:38', user: '用户C****', region: '浙江省杭州市', amount: '¥3,456' },
  { time: '10:24:31', user: '用户D****', region: '山东省济南市', amount: '¥987' },
  { time: '10:24:24', user: '用户E****', region: '四川省成都市', amount: '¥2,222' },
  { time: '10:24:17', user: '用户F****', region: '河南省郑州市', amount: '¥1,665' },
]
