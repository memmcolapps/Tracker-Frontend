import { Organization } from "@/types-and-interface/org.interface";
import { Button } from "@/components/ui/button";
import { Building, MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrganizationColumnsProps {
  onView: (org: Organization) => void;
  onEdit: (org: Organization) => void;
  onDelete: (org: Organization) => void;
}

export function getOrganizationColumns({
  onView,
  onEdit,
  onDelete,
}: OrganizationColumnsProps) {
  return [
    {
      key: "organization" as keyof Organization,
      label: "Organization",
      render: (value: string, row: Organization) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-primary" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{row.name}</div>
            <div className="text-sm text-gray-500">{row.adminEmail}</div>
          </div>
        </div>
      ),
    },
    {
      key: "devices" as keyof Organization,
      label: "Devices",
      render: (value: string, row: Organization) => (
        <div>
          <div className="text-sm font-medium text-gray-900">
            {row?.devices?.length}
          </div>
          <div className="text-sm text-gray-500">devices</div>
        </div>
      ),
    },
    {
      key: "users" as keyof Organization,
      label: "Users",
      render: (value: string, row: Organization) => (
        <div>
          <div className="text-sm font-medium text-gray-900">
            {row?.users?.length}
          </div>
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
      key: "actions" as keyof Organization,
      label: "Actions",
      render: (value: number, row: Organization) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(row)}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(row)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(row)}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
}
