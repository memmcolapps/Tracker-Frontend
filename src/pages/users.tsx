import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAdmins } from "@/hooks/use-Admins";
import { Admin } from "@/types-and-interface/auth.interface";

export default function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { data, isLoading, error } = useAdmins();

  if (error) {
    return <div className="p-6">Error: {(error as Error).message}</div>;
  }
  if (data && "success" in data && !data.success) {
    return <div className="p-6">Error: {data.error}</div>;
  }

  // Only show admins if data is an array
  const admins = Array.isArray(data) ? data : [];

  const columns = [
    {
      key: "email" as keyof Admin,
      label: "Email",
      render: (value: string, row: Admin) => (
        <div className="text-sm text-gray-900">{row.email}</div>
      ),
    },
    {
      key: "adminType" as keyof Admin,
      label: "Type",
      render: (value: string, row: Admin) => (
        <span className="px-2 py-1 rounded bg-gray-100 text-xs text-gray-700">
          {row.adminType}
        </span>
      ),
    },
    {
      key: "createdAt" as keyof Admin,
      label: "Date Added",
      render: (value: string, row: Admin) => (
        <div className="text-sm text-gray-900">
          {row.createdAt ? new Date(row.createdAt).toDateString() : "N/A"}
        </div>
      ),
    },
    {
      key: "id" as keyof Admin,
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

  const totalPages = Math.ceil((admins?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData =
    admins?.slice(startIndex, startIndex + itemsPerPage) || [];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Admins</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Admin
        </Button>
      </div>

      <DataTable
        data={paginatedData}
        columns={columns}
        pagination={{
          currentPage,
          totalPages,
          totalItems: admins?.length || 0,
          itemsPerPage,
          onPageChange: setCurrentPage,
        }}
      />
    </div>
  );
}
