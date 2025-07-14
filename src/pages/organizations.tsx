import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/status-badge";
import { Plus, Building, Upload } from "lucide-react";

export interface Organization {
  id: number;
  name: string;
  email: string;
  status: string;
  createdAt: Date;
  lastActive: Date;
}

export default function Organizations() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data for organizations
  const [organizations] = useState<Organization[]>([
    {
      id: 1,
      name: "Nigeria Police",
      email: "npf@acme.com",
      status: "active",
      createdAt: new Date("2023-01-15"),
      lastActive: new Date("2024-06-01"),
    },
    {
      id: 2,
      name: "Nigeira Army",
      email: "migeriaarmedforce@nfa.com",
      status: "inactive",
      createdAt: new Date("2022-11-10"),
      lastActive: new Date("2024-05-20"),
    },
    {
      id: 3,
      name: "Nigeria customs",
      email: "npcf@acme.com",
      status: "suspended",
      createdAt: new Date("2023-03-05"),
      lastActive: new Date("2024-04-18"),
    },
    {
      id: 4,
      name: "Nigeira Navy",
      email: "nigeiranavy@nfa.com",
      status: "active",
      createdAt: new Date("2023-02-22"),
      lastActive: new Date("2024-06-02"),
    },
    {
      id: 5,
      name: "Nigeria Air Force",
      email: "nigeriaairforce@nfa.com",
      status: "active",
      createdAt: new Date("2023-05-30"),
      lastActive: new Date("2024-06-03"),
    },
  ]);
  const isLoading = false;

  const columns = [
    {
      key: "name" as keyof Organization,
      label: "Organization",
      render: (value: string, row: Organization) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-primary" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "status" as keyof Organization,
      label: "Status",
      render: (value: string) => <StatusBadge status={value} />,
    },
    {
      key: "id" as keyof Organization,
      label: "Devices",
      render: () => (
        <div>
          <div className="text-sm font-medium text-gray-900">247</div>
          <div className="text-sm text-gray-500">devices</div>
        </div>
      ),
    },
    {
      key: "id" as keyof Organization,
      label: "Users",
      render: () => (
        <div>
          <div className="text-sm font-medium text-gray-900">18</div>
          <div className="text-sm text-gray-500">users</div>
        </div>
      ),
    },
    {
      key: "createdAt" as keyof Organization,
      label: "Created",
      render: (value: Date) =>
        value ? new Date(value).toLocaleDateString() : "-",
    },
    {
      key: "lastActive" as keyof Organization,
      label: "Last Active",
      render: (value: Date) =>
        value ? new Date(value).toLocaleDateString() : "-",
    },
    {
      key: "id" as keyof Organization,
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
            className="text-red-600 hover:text-red-700"
          >
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
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil((organizations?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData =
    organizations?.slice(startIndex, startIndex + itemsPerPage) || [];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Organizations</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Organization
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label
                htmlFor="status"
                className="text-sm font-medium text-gray-700"
              >
                Status
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="date"
                className="text-sm font-medium text-gray-700"
              >
                Created Date
              </Label>
              <Input type="date" />
            </div>
            <div>
              <Label
                htmlFor="devices"
                className="text-sm font-medium text-gray-700"
              >
                Device Count
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="1-10">1-10</SelectItem>
                  <SelectItem value="11-50">11-50</SelectItem>
                  <SelectItem value="51+">51+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="search"
                className="text-sm font-medium text-gray-700"
              >
                Search
              </Label>
              <Input type="text" placeholder="Search organizations..." />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Organizations Table */}
      <DataTable
        data={paginatedData}
        columns={columns}
        pagination={{
          currentPage,
          totalPages,
          totalItems: organizations?.length || 0,
          itemsPerPage,
          onPageChange: setCurrentPage,
        }}
      />
    </div>
  );
}
