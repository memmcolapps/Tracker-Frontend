import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AddDeviceModal } from "@/components/devices/AddDeviceModal";
import { useCreateDevice } from "@/hooks/use-Devices";

interface DeviceActionsProps {
  onAddDevice: () => void;
}

export const DeviceActions = ({ onAddDevice }: DeviceActionsProps) => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const createDeviceMutation = useCreateDevice();

  return (
    <div className="flex items-center space-x-3">
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
                onAddDevice();
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
  );
};
