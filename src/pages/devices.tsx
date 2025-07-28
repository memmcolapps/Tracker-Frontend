import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { StatsCard } from "@/components/ui/stats-card";
import { Checkbox } from "@/components/ui/checkbox";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  Plus,
  Smartphone,
  Circle,
  Eye,
  Pencil,
  UserPlus,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Device } from "@/types-and-interface/device.interface";
import {
  useDevices,
  useCreateDevice,
  useAttachDevice,
} from "@/hooks/use-Devices";
import { AddDeviceModal } from "@/components/devices/AddDeviceModal";
import { AssignDeviceModal } from "@/components/devices/AssignDeviceModal";
import { AssignDeviceFormData } from "@/schema/device-schemas";

export default function Devices() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const queryClient = useQueryClient();
  const itemsPerPage = 10;

  const { data: devicesData, isLoading } = useDevices(searchTerm);
  const createDeviceMutation = useCreateDevice();
  const attachDeviceMutation = useAttachDevice();

  const deviceStats = devicesData?.devices
    ? {
        online: devicesData.onlineDevices,
        offline: devicesData.offlineDevices,
        error: devicesData.devices.filter((d) => d.status === "error").length,
      }
    : {
        online: 0,
        offline: 0,
        error: 0,
      };

  const onAttach = (device: Device) => {
    setSelectedDevice(device);
    setAssignModalOpen(true);
  };

  const handleAssignOrganization = async (data: AssignDeviceFormData) => {
    if (!selectedDevice?.id) return;
    setIsSubmitting(true);
    try {
      await attachDeviceMutation.mutateAsync({
        deviceId: selectedDevice.id,
        organizationId: data.organizationId,
      });

      toast.success("Device assigned successfully");
      await queryClient.invalidateQueries({ queryKey: ["devices"] });
      setAssignModalOpen(false);
      setSelectedDevice(null);
    } catch (error) {
      console.error("Error assigning device:", error);
      toast.error("Failed to assign device");
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    {
      key: "checkbox" as keyof Device,
      label: "",
      render: () => <Checkbox />,
    },
    {
      key: "name" as keyof Device,
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
            {row.type === "CAR" ? (
              <svg
                className={`w-5 h-5 ${
                  row.status === "online"
                    ? "text-green-600"
                    : row.status === "offline"
                    ? "text-orange-600"
                    : "text-red-600"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="11" width="18" height="5" rx="2" />
                <path d="M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" />
                <circle cx="7.5" cy="16.5" r="1.5" />
                <circle cx="16.5" cy="16.5" r="1.5" />
              </svg>
            ) : (
              <Smartphone
                className={`w-5 h-5 ${
                  row.status === "online"
                    ? "text-green-600"
                    : row.status === "offline"
                    ? "text-orange-600"
                    : "text-red-600"
                }`}
              />
            )}
          </div>
          <div className="ml-4">
            <div className="text-xs font-medium text-gray-900">{value}</div>
            <div className="text-xs text-gray-500">SIM: {row.simNumber}</div>
          </div>
        </div>
      ),
    },
    {
      key: "status" as keyof Device,
      label: "Status",
      render: (value: string) => (
        <div className="flex items-center">
          <StatusBadge status={value || "unknown"} />
        </div>
      ),
    },
    {
      key: "organizationName" as keyof Device,
      label: "Organization",
      render: (value: string, row: Device) => (
        <div className="flex items-center">
          {row?.organizationName || "Unassigned"}
        </div>
      ),
    },
    {
      key: "simType" as keyof Device,
      label: "SIM Type",
      render: (value: string, row: Device) => (
        <div className="flex items-center">
          <StatusBadge status={row.simType} />
        </div>
      ),
    },
    {
      key: "lastOnlineAt" as keyof Device,
      label: "Last Online",
      render: (value: string) =>
        value ? new Date(value).toLocaleString() : "-",
    },
    {
      key: "usage" as keyof Device,
      label: "Data Usage",
      render: (value: number, row: Device) => (
        <div>
          <div className="text-sm text-gray-900">
            {Math.round(value / 1024 / 1024)} MB
          </div>
          {row.usageLimit && (
            <div className="text-xs text-gray-500">
              of {Math.round(row.usageLimit.total / 1024 / 1024)} MB
            </div>
          )}
        </div>
      ),
    },
    {
      key: "actions" as keyof Device,
      label: "Actions",
      render: (value: string, row: Device) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground focus:outline-none focus:ring-0 hover:bg-transparent hover:text-sidebar-foreground"
              style={{ boxShadow: "none", background: "none" }}
            >
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-more-vertical"
              >
                <circle cx="9" cy="4" r="1" />
                <circle cx="9" cy="9" r="1" />
                <circle cx="9" cy="14" r="1" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => alert(`View device ${row.name}`)}>
              <Eye className="w-4 h-4 mr-2" /> View
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => alert(`Edit device ${row.name}`)}>
              <Pencil className="w-4 h-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => onAttach(row)}>
              <UserPlus className="w-4 h-4 mr-2" /> Assign
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600"
              onSelect={() => alert(`Delete device ${row.name}`)}
            >
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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

  const totalDevices =
    deviceStats.online + deviceStats.offline + deviceStats.error;

  const totalPages = Math.ceil(
    (devicesData?.devices?.length || 0) / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData =
    devicesData?.devices?.slice(startIndex, startIndex + itemsPerPage) || [];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Devices</h3>
        <div className="flex items-center space-x-3">
          {/* <Button variant="secondary">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Import
          </Button> */}
          <Button onClick={() => setAddModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Device
          </Button>

          <AddDeviceModal
            open={addModalOpen}
            onOpenChange={setAddModalOpen}
            onSubmit={async (data) => {
              setIsSubmitting(true);
              try {
                await createDeviceMutation.mutateAsync(data, {
                  onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["devices"] });
                    setAddModalOpen(false);
                    toast.success("Device created successfully");
                  },
                  onError: (error) => {
                    toast.error("Failed to create device");
                  },
                });
              } finally {
                setIsSubmitting(false);
              }
            }}
            isSubmitting={isSubmitting}
          />
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
            totalItems: devicesData?.devices?.length || 0,
            itemsPerPage,
            onPageChange: setCurrentPage,
          }}
        />
      </Card>
      <AssignDeviceModal
        open={assignModalOpen}
        onOpenChange={setAssignModalOpen}
        onSubmit={handleAssignOrganization}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
