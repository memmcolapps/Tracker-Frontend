import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Plus, User } from "lucide-react";
import type { User as UserType } from "@shared/schema";

export default function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: users, isLoading } = useQuery({
    queryKey: ['/api/users'],
  });

  const columns = [
    {
      key: 'username' as keyof UserType,
      label: 'User',
      render: (value: string, row: UserType) => (
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            row.role === 'super_admin' ? 'bg-red-100' : 
            row.role === 'admin' ? 'bg-orange-100' : 'bg-blue-100'
          }`}>
            <User className={`w-5 h-5 ${
              row.role === 'super_admin' ? 'text-red-600' : 
              row.role === 'admin' ? 'text-orange-600' : 'text-blue-600'
            }`} />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{row.fullName || value}</div>
            <div className="text-sm text-gray-500">{value}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'email' as keyof UserType,
      label: 'Email',
      render: (value: string) => (
        <div className="text-sm text-gray-900">{value}</div>
      ),
    },
    {
      key: 'role' as keyof UserType,
      label: 'Role',
      render: (value: string) => <StatusBadge status={value} />,
    },
    {
      key: 'organizationId' as keyof UserType,
      label: 'Organization',
      render: (value: number) => (
        <div className="text-sm text-gray-900">
          {value ? 'TechCorp Solutions' : '-'}
        </div>
      ),
    },
    {
      key: 'status' as keyof UserType,
      label: 'Status',
      render: (value: string) => <StatusBadge status={value} />,
    },
    {
      key: 'lastLogin' as keyof UserType,
      label: 'Last Login',
      render: (value: Date) => (
        <div className="text-sm text-gray-900">
          {value ? new Date(value).toLocaleString() : 'Never'}
        </div>
      ),
    },
    {
      key: 'id' as keyof UserType,
      label: 'Actions',
      render: () => (
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-primary hover:text-blue-700">
            View
          </Button>
          <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
            Edit
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
            Reset
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

  const totalPages = Math.ceil((users?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = users?.slice(startIndex, startIndex + itemsPerPage) || [];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Users</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <DataTable
        data={paginatedData}
        columns={columns}
        pagination={{
          currentPage,
          totalPages,
          totalItems: users?.length || 0,
          itemsPerPage,
          onPageChange: setCurrentPage,
        }}
      />
    </div>
  );
}
