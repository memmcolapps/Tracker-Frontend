import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/ui/stats-card";
import { DeviceStatusChart } from "@/components/charts/device-status-chart";
import { UsageChart } from "@/components/charts/usage-chart";
import { 
  Smartphone, 
  Building, 
  Users, 
  BarChart3,
  Plus,
  UserPlus,
  CreditCard
} from "lucide-react";
import { mockChartData } from "@/lib/mock-data";

export default function Dashboard() {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['/api/analytics/dashboard'],
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-24 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const deviceStats = analytics?.deviceStats || { online: 0, offline: 0, error: 0 };

  return (
    <div className="p-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Devices"
          value={analytics?.totalDevices || 0}
          change="+12% from last month"
          changeType="increase"
          icon={Smartphone}
          iconColor="text-primary"
        />
        <StatsCard
          title="Organizations"
          value={analytics?.totalOrganizations || 0}
          change="+8% from last month"
          changeType="increase"
          icon={Building}
          iconColor="text-green-600"
        />
        <StatsCard
          title="Active Users"
          value={analytics?.totalUsers || 0}
          change="-3% from last month"
          changeType="decrease"
          icon={Users}
          iconColor="text-orange-600"
        />
        <StatsCard
          title="Data Usage"
          value={`${Math.round((analytics?.totalDataUsage || 0) / 1000)} GB`}
          change="+24% from last month"
          changeType="increase"
          icon={BarChart3}
          iconColor="text-gray-600"
        />
      </div>

      {/* Dashboard Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Status Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">Device Status</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              View Details
            </Button>
          </CardHeader>
          <CardContent>
            <DeviceStatusChart data={deviceStats} />
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Online</span>
                </div>
                <span className="text-sm font-medium">{deviceStats.online}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Offline</span>
                </div>
                <span className="text-sm font-medium">{deviceStats.offline}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Error</span>
                </div>
                <span className="text-sm font-medium">{deviceStats.error}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {analytics?.recentActivity?.map((activity: any, index: number) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'device' ? 'bg-green-100' :
                    activity.type === 'user' ? 'bg-blue-100' :
                    activity.type === 'organization' ? 'bg-orange-100' :
                    'bg-red-100'
                  }`}>
                    {activity.type === 'device' && <Plus className="w-4 h-4 text-green-600" />}
                    {activity.type === 'user' && <UserPlus className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'organization' && <Building className="w-4 h-4 text-orange-600" />}
                    {activity.type === 'error' && <span className="text-red-600">!</span>}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.time).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-center" variant="default">
                <Plus className="w-4 h-4 mr-2" />
                Add New Device
              </Button>
              <Button className="w-full justify-center" variant="default" style={{ backgroundColor: '#4CAF50' }}>
                <Building className="w-4 h-4 mr-2" />
                Create Organization
              </Button>
              <Button className="w-full justify-center" variant="default" style={{ backgroundColor: '#FF9800' }}>
                <CreditCard className="w-4 h-4 mr-2" />
                Register SIM
              </Button>
              <Button className="w-full justify-center" variant="default" style={{ backgroundColor: '#424242' }}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Analytics */}
      <Card className="mt-8">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">Usage Analytics</CardTitle>
          <div className="flex items-center space-x-2">
            <select className="border border-gray-300 rounded px-3 py-1 text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
            <Button variant="ghost" size="sm" className="text-primary">
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <UsageChart data={mockChartData.usageOverTime} />
        </CardContent>
      </Card>
    </div>
  );
}
