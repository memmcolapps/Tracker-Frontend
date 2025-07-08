import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface DeviceStatusChartProps {
  data: {
    online: number;
    offline: number;
    error: number;
  };
}

const COLORS = {
  online: '#4CAF50',
  offline: '#FF9800',
  error: '#F44336',
};

export function DeviceStatusChart({ data }: DeviceStatusChartProps) {
  const chartData = [
    { name: 'Online', value: data.online, color: COLORS.online },
    { name: 'Offline', value: data.offline, color: COLORS.offline },
    { name: 'Error', value: data.error, color: COLORS.error },
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
