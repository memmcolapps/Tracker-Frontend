import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface UsageChartProps {
  data: Array<{
    month: string;
    usage: number;
  }>;
}

export function UsageChart({ data }: UsageChartProps) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="usage" 
            stroke="#1976D2" 
            strokeWidth={2}
            dot={{ fill: '#1976D2' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
