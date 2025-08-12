import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Device } from "@/types-and-interface/device.interface";

interface ViewDeviceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  device: Device | null;
}

export function ViewdeviceModal({
  open,
  onOpenChange,
  device,
}: ViewDeviceModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>device Details</DialogTitle>
          <DialogDescription>View details for {device?.name}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Name</Label>
              <div className="mt-1 text-sm text-gray-900">{device?.name}</div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Model</Label>
              <div className="mt-1 text-sm text-gray-900">{device?.model}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Sim Number
              </Label>
              <div className="mt-1 text-sm text-gray-900">
                {device?.simNumber}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Organization Name
              </Label>
              <div className="mt-1 text-sm text-gray-900">
                {device?.organizationName}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Status
              </Label>
              <div className="mt-1 text-sm text-gray-900">{device?.status}</div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Type</Label>
              <div className="mt-1 text-sm text-gray-900">{device?.type}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Usage</Label>
              <div className="mt-1 text-sm text-gray-900">
                {device?.usage
                  ? `${Math.round(device.usage / 1024 / 1024)} MB`
                  : "-"}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Usage Limit
              </Label>
              <div className="mt-1 text-sm text-gray-900">
                {device?.usageLimit
                  ? `${Math.round(device.usageLimit.total / 1024 / 1024)} MB`
                  : "No limit"}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Coordinates (Lat / Lon)
              </Label>
              <div className="mt-1 text-sm text-gray-900">
                {device?.coordinates?.latitude || "-"} /{" "}
                {device?.coordinates?.longitude || "-"}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Last Online
              </Label>
              <div className="mt-1 text-sm text-gray-900">
                {device?.lastOnlineAt}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Created
              </Label>
              <div className="mt-1 text-sm text-gray-900">
                {device?.createdAt
                  ? new Date(device?.createdAt).toLocaleDateString()
                  : "-"}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
