import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDevices, useAttachDevice } from "@/hooks/use-Devices";
import { Device } from "@/types-and-interface/device.interface";
import { AssignDeviceModal } from "@/components/devices/AssignDeviceModal";
import { AssignDeviceFormData } from "@/schema/device-schemas";
import { DeviceStats } from "@/components/devices/DeviceStats";
import { DeviceActions } from "@/components/devices/DeviceActions";
import { DeviceTable } from "@/components/devices/DeviceTable";
import { getDeviceColumns } from "@/components/devices/DeviceTableColumns";
import { DevicesLoadingSkeleton } from "@/components/devices/DevicesLoadingSkeleton";
import { ViewdeviceModal } from "@/components/devices/ViewDeviceModal";

export default function Devices() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const queryClient = useQueryClient();
  const itemsPerPage = 10;

  const { data: devicesData, isLoading } = useDevices(searchTerm);
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

  const onViewDevice = (device: Device) => {
    console.log("View device:", device);
    setSelectedDevice(device);
    setViewModalOpen(true);
  };

  if (isLoading) {
    return <DevicesLoadingSkeleton />;
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
        <DeviceActions onAddDevice={() => {}} />
      </div>

      <DeviceStats
        online={deviceStats.online}
        offline={deviceStats.offline}
        total={totalDevices}
      />

      <Card>
        <DeviceTable
          data={paginatedData}
          columns={getDeviceColumns(onAttach, onViewDevice)}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={devicesData?.devices?.length || 0}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </Card>

      <AssignDeviceModal
        open={assignModalOpen}
        onOpenChange={setAssignModalOpen}
        onSubmit={handleAssignOrganization}
        isSubmitting={isSubmitting}
      />
      {selectedDevice && (
        <ViewdeviceModal
          open={viewModalOpen}
          onOpenChange={setViewModalOpen}
          device={selectedDevice}
        />
      )}
    </div>
  );
}
