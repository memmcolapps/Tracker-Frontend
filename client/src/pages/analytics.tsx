import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UsageChart } from "@/components/charts/usage-chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download } from "lucide-react";
import { mockChartData, networkProviders, systemHealth } from "@/lib/mock-data";

export default function Analytics() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Analytics</h3>
        <div className="flex items-center space-x-3">
          <Select defaultValue="30">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="180">Last 6 months</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Device Registration Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData.deviceTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="devices" fill="#1976D2" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Usage Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <UsageChart data={mockChartData.dataUsageWeekly} />
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">TechCorp Solutions</span>
                <span className="text-sm font-medium text-gray-800">247 devices</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Global Industries</span>
                <span className="text-sm font-medium text-gray-800">156 devices</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">StartupXYZ</span>
                <span className="text-sm font-medium text-gray-800">45 devices</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Network Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {networkProviders.map((provider, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{provider.name}</span>
                  <span className="text-sm font-medium text-gray-800">{provider.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemHealth.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.metric}</span>
                  <span className={`text-sm font-medium ${
                    item.status === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
