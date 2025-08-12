import { Smartphone } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "@/components/ui/status-badge";
import { Device } from "@/types-and-interface/device.interface";
import { DeviceRowActions } from "./DeviceRowActions";

export const getDeviceColumns = (
  onAttach: (device: Device) => void,
  onView: (device: Device) => void
) => [
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
    render: (value: string) => (value ? new Date(value).toLocaleString() : "-"),
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
      <DeviceRowActions device={row} onAttach={onAttach} onView={onView} />
    ),
  },
];
