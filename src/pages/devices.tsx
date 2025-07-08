import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { StatsCard } from "@/components/ui/stats-card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Upload, Smartphone, Circle } from "lucide-react";

export interface Device {
  id: number;
  label: string;
  status: string;
  imei: string;
  simId: number;
  lastOnline: Date;
  organizationId: number;
}

export default function Devices() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // Mock device data
  const [devices] = useState<Device[]>([
    {
      id: 1,
      label: "Device A",
      status: "online",
      imei: "123456789012345",
      simId: 101,
      lastOnline: new Date(),
      organizationId: 1,
    },
    {
      id: 2,
      label: "Device B",
      status: "offline",
      imei: "987654321098765",
      simId: 0,
      lastOnline: new Date(Date.now() - 1000 * 60 * 60),
      organizationId: 1,
    },
    {
      id: 3,
      label: "Device C",
      status: "error",
      imei: "555555555555555",
      simId: 102,
      lastOnline: new Date(Date.now() - 1000 * 60 * 60 * 24),
      organizationId: 0,
    },
  ]);

  // Mock analytics data
  const analytics = {
    deviceStats: {
      online: 1,
      offline: 1,
      error: 1,
    },
  };

  const isLoading = false;

  const columns = [
    {
      key: "id" as keyof Device,
      label: "",
      render: () => <Checkbox />,
    },
    {
      key: "label" as keyof Device,
      label: "Device",
      render: (value: string, row: Device) => (
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              row.status === "online"
                ? "bg-green-100"
                : row.status === "offline"
                ? "bg-orange-100"
                : "bg-red-100"
            }`}
          >
            <Smartphone
              className={`w-5 h-5 ${
                row.status === "online"
                  ? "text-green-600"
                  : row.status === "offline"
                  ? "text-orange-600"
                  : "text-red-600"
              }`}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">IMEI: {row.imei}</div>
          </div>
        </div>
      ),
    },
    {
      key: "status" as keyof Device,
      label: "Status",
      render: (value: string) => (
        <div className="flex items-center">
          <Circle
            className={`w-2 h-2 mr-2 ${
              value === "online"
                ? "text-green-500"
                : value === "offline"
                ? "text-orange-500"
                : "text-red-500"
            }`}
          />
          <StatusBadge status={value} />
        </div>
      ),
    },
    {
      key: "organizationId" as keyof Device,
      label: "Organization",
      render: (value: number) => (value ? "TechCorp Solutions" : "-"),
    },
    {
      key: "simId" as keyof Device,
      label: "SIM Status",
      render: (value: number) =>
        value ? (
          <StatusBadge status="active" />
        ) : (
          <StatusBadge status="inactive" />
        ),
    },
    {
      key: "lastOnline" as keyof Device,
      label: "Last Online",
      render: (value: Date) => (value ? new Date(value).toLocaleString() : "-"),
    },
    {
      key: "id" as keyof Device,
      label: "Data Usage",
      render: () => (
        <div>
          <div className="text-sm text-gray-900">2.4 GB</div>
          <div className="text-xs text-gray-500">of 10 GB</div>
        </div>
      ),
    },
    {
      key: "id" as keyof Device,
      label: "Actions",
      render: () => (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-blue-700"
          >
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-orange-600 hover:text-orange-700"
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-700"
          >
            Assign
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const deviceStats = analytics?.deviceStats || {
    online: 0,
    offline: 0,
    error: 0,
  };
  const totalDevices =
    deviceStats.online + deviceStats.offline + deviceStats.error;

  const totalPages = Math.ceil((devices?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData =
    devices?.slice(startIndex, startIndex + itemsPerPage) || [];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Devices</h3>
        <div className="flex items-center space-x-3">
          <Button variant="secondary">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Import
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Device
          </Button>
        </div>
      </div>

      {/* Device Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Online"
          value={deviceStats.online}
          icon={Circle}
          iconColor="text-green-500"
        />
        <StatsCard
          title="Offline"
          value={deviceStats.offline}
          icon={Circle}
          iconColor="text-orange-500"
        />
        <StatsCard
          title="Error"
          value={deviceStats.error}
          icon={Circle}
          iconColor="text-red-500"
        />
        <StatsCard
          title="Total"
          value={totalDevices}
          icon={Smartphone}
          iconColor="text-gray-600"
        />
      </div>

      {/* Devices Table */}
      <Card>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox />
                <span className="text-sm text-gray-600">Select All</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-blue-700"
              >
                Bulk Actions
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                Export
              </Button>
              <Button variant="ghost" size="sm">
                Filter
              </Button>
            </div>
          </div>
        </div>
        <DataTable
          data={paginatedData}
          columns={columns}
          pagination={{
            currentPage,
            totalPages,
            totalItems: devices?.length || 0,
            itemsPerPage,
            onPageChange: setCurrentPage,
          }}
        />
      </Card>
    </div>
  );
}
