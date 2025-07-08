export const mockChartData = {
  usageOverTime: [
    { month: 'Jan', usage: 720 },
    { month: 'Feb', usage: 856 },
    { month: 'Mar', usage: 934 },
    { month: 'Apr', usage: 1045 },
    { month: 'May', usage: 1156 },
    { month: 'Jun', usage: 1234 },
  ],
  deviceTrends: [
    { month: 'Jan', devices: 45 },
    { month: 'Feb', devices: 52 },
    { month: 'Mar', devices: 38 },
    { month: 'Apr', devices: 67 },
    { month: 'May', devices: 42 },
    { month: 'Jun', devices: 58 },
  ],
  dataUsageWeekly: [
    { week: 'Week 1', usage: 185 },
    { week: 'Week 2', usage: 210 },
    { week: 'Week 3', usage: 234 },
    { week: 'Week 4', usage: 218 },
  ],
};

export const networkProviders = [
  { name: 'Verizon', percentage: 45 },
  { name: 'AT&T', percentage: 32 },
  { name: 'T-Mobile', percentage: 23 },
];

export const systemHealth = [
  { metric: 'API Response Time', value: '245ms', status: 'success' },
  { metric: 'System Uptime', value: '99.9%', status: 'success' },
  { metric: 'Error Rate', value: '0.1%', status: 'success' },
];
