import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";

export default function Sims() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data for SIMs
  type Sim = {
    simId: string;
    iccid: string;
    msisdn: string;
    status: string;
    networkProvider: string;
    id: number;
    currentUsage: number;
    dataLimit: number;
  };

  const [sims] = useState<Sim[]>([
    {
      simId: "SIM-001",
      iccid: "8986001234567890123",
      msisdn: "1234567890",
      status: "active",
      networkProvider: "AT&T",
      id: 1,
      currentUsage: 500,
      dataLimit: 1000,
    },
    {
      simId: "SIM-002",
      iccid: "8986009876543210987",
      msisdn: "0987654321",
      status: "inactive",
      networkProvider: "Verizon",
      id: 2,
      currentUsage: 200,
      dataLimit: 1000,
    },
    {
      simId: "SIM-003",
      iccid: "8986001122334455667",
      msisdn: "1122334455",
      status: "suspended",
      networkProvider: "T-Mobile",
      id: 3,
      currentUsage: 800,
      dataLimit: 1000,
    },
    // Add more mock SIMs as needed
  ]);
  const isLoading = false;

  const columns = [
    {
      key: "simId" as keyof Sim,
      label: "SIM ID",
      render: (value: string) => (
        <div className="text-sm font-medium text-gray-900">{value}</div>
      ),
    },
    {
      key: "iccid" as keyof Sim,
      label: "ICCID",
      render: (value: string) => (
        <div className="text-sm text-gray-900 font-mono">{value}</div>
      ),
    },
    {
      key: "msisdn" as keyof Sim,
      label: "MSISDN",
      render: (value: string) => (
        <div className="text-sm text-gray-900">{value}</div>
      ),
    },
    {
      key: "status" as keyof Sim,
      label: "Status",
      render: (value: string) => <StatusBadge status={value} />,
    },
    {
      key: "networkProvider" as keyof Sim,
      label: "Network",
      render: (value: string, row: Sim) => (
        <div className="flex items-center">
          <span className="text-sm text-gray-900">{value}</span>
          <span className="ml-2 text-xs text-gray-500">🇺🇸</span>
        </div>
      ),
    },
    {
      key: "id" as keyof Sim,
      label: "Device",
      render: (value: number) => (
        <div className="text-sm text-primary font-medium cursor-pointer hover:text-blue-700">
          DEV-001
        </div>
      ),
    },
    {
      key: "currentUsage" as keyof Sim,
      label: "Data Usage",
      render: (value: number, row: Sim) => {
        const usageGB = (value / 1000).toFixed(1);
        const limitGB = (row.dataLimit / 1000).toFixed(1);
        const percentage = Math.round((value / row.dataLimit) * 100);

        return (
          <div className="w-32">
            <div className="text-sm text-gray-900">
              {usageGB} GB / {limitGB} GB
            </div>
            <Progress value={percentage} className="w-full mt-1" />
          </div>
        );
      },
    },
    {
      key: "id" as keyof Sim,
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
            Sync
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

  const totalPages = Math.ceil((sims?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData =
    sims?.slice(startIndex, startIndex + itemsPerPage) || [];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">SIMs</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Register SIM
        </Button>
      </div>

      <DataTable
        data={paginatedData}
        columns={columns}
        pagination={{
          currentPage,
          totalPages,
          totalItems: sims?.length || 0,
          itemsPerPage,
          onPageChange: setCurrentPage,
        }}
      />
    </div>
  );
}
