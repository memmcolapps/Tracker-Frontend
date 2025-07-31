import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InteractiveMap } from "@/components/locations/InteractiveMap";
import { Plus, Smartphone } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useDevices } from "@/hooks/use-Devices";

const getStatusColor = (status: string) => {
  switch (status) {
    case "ONLINE":
      return "bg-green-100 text-green-600";
    case "warning":
      return "bg-yellow-100 text-yellow-600";
    case "OFFLINE":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function Locations() {
  const { data: devicesData, isLoading } = useDevices("");

  return (
    <div>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">
              Device Locations
            </h2>
            <div className="flex items-center space-x-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Devices</SelectItem>
                  <SelectItem value="online">Online Only</SelectItem>
                  <SelectItem value="offline">Offline Only</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Geofence
              </Button>
            </div>
          </div>
        </div>

        {/* Map and Device List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <InteractiveMap />
          </div>

          {/* Device List */}
          <Card>
            <CardHeader>
              <CardTitle>Devices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-hide">
                {devicesData?.devices.map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(
                          device.status || "OFFLINE"
                        )}`}
                      >
                        <Smartphone className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">
                          {device.name || "Unknown Device"}
                        </p>
                        <p className="text-xs text-slate-500">
                          {device.model || "Unknown Model"}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-slate-500">
                      {formatDistanceToNow(
                        new Date(device.lastOnlineAt || ""),
                        {
                          addSuffix: true,
                        }
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
