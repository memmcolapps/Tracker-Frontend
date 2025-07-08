import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/status-badge";
import { Plus, Download, Eye, Trash2 } from "lucide-react";

export interface Report {
  id: number;
  name: string;
  type: string;
  generatedAt: Date;
  status: string;
  fileSize: number;
  organizationId: number;
}

export default function Reports() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data for reports
  const [reports] = useState<Report[]>([
    {
      id: 1,
      name: "Usage Report June",
      type: "usage",
      generatedAt: new Date("2024-06-01T10:00:00"),
      status: "completed",
      fileSize: 10485760,
      organizationId: 1,
    },
    {
      id: 2,
      name: "Device Report Q2",
      type: "device",
      generatedAt: new Date("2024-06-05T14:30:00"),
      status: "processing",
      fileSize: 5242880,
      organizationId: 0,
    },
    {
      id: 3,
      name: "Organization Report",
      type: "organization",
      generatedAt: new Date("2024-05-28T09:15:00"),
      status: "failed",
      fileSize: 0,
      organizationId: 2,
    },
    {
      id: 4,
      name: "User Activity May",
      type: "user_activity",
      generatedAt: new Date("2024-05-31T16:45:00"),
      status: "completed",
      fileSize: 2097152,
      organizationId: 3,
    },
  ]);
  const isLoading = false;

  const columns = [
    {
      key: "name" as keyof Report,
      label: "Report Name",
      render: (value: string, row: Report) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">
            {row.organizationId ? "Organization specific" : "All organizations"}
          </div>
        </div>
      ),
    },
    {
      key: "type" as keyof Report,
      label: "Type",
      render: (value: string) => (
        <div className="text-sm text-gray-900 capitalize">
          {value.replace("_", " ")}
        </div>
      ),
    },
    {
      key: "generatedAt" as keyof Report,
      label: "Generated",
      render: (value: Date) => (
        <div className="text-sm text-gray-900">
          {value ? new Date(value).toLocaleString() : "-"}
        </div>
      ),
    },
    {
      key: "status" as keyof Report,
      label: "Status",
      render: (value: string) => <StatusBadge status={value} />,
    },
    {
      key: "fileSize" as keyof Report,
      label: "Size",
      render: (value: number) => (
        <div className="text-sm text-gray-900">
          {value ? `${(value / 1024 / 1024).toFixed(1)} MB` : "-"}
        </div>
      ),
    },
    {
      key: "id" as keyof Report,
      label: "Actions",
      render: () => (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-blue-700"
          >
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-700"
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
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
          <div className="h-32 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil((reports?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData =
    reports?.slice(startIndex, startIndex + itemsPerPage) || [];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Reports</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Report Generation */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="type">Report Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usage">Usage Report</SelectItem>
                  <SelectItem value="device">Device Report</SelectItem>
                  <SelectItem value="organization">
                    Organization Report
                  </SelectItem>
                  <SelectItem value="user_activity">
                    User Activity Report
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="range">Date Range</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="organization">Organization</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select organization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Organizations</SelectItem>
                  <SelectItem value="1">TechCorp Solutions</SelectItem>
                  <SelectItem value="2">Global Industries</SelectItem>
                  <SelectItem value="3">StartupXYZ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="format">Format</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-3">
            <Button>Generate Report</Button>
            <Button variant="secondary">Schedule Report</Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={paginatedData}
            columns={columns}
            pagination={{
              currentPage,
              totalPages,
              totalItems: reports?.length || 0,
              itemsPerPage,
              onPageChange: setCurrentPage,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
