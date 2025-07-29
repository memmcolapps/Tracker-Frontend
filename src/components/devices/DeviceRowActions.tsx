import { Eye, Pencil, UserPlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Device } from "@/types-and-interface/device.interface";

interface DeviceRowActionsProps {
  device: Device;
  onAttach: (device: Device) => void;
  onView?: (device: Device) => void;
}

export const DeviceRowActions = ({
  device,
  onAttach,
  onView,
}: DeviceRowActionsProps) => {
  return (
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
        <DropdownMenuItem onSelect={() => onView?.(device)}>
          <Eye className="w-4 h-4 mr-2" /> View
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => alert(`Edit device ${device.name}`)}>
          <Pencil className="w-4 h-4 mr-2" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onAttach(device)}>
          <UserPlus className="w-4 h-4 mr-2" /> Assign
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600"
          onSelect={() => alert(`Delete device ${device.name}`)}
        >
          <Trash2 className="w-4 h-4 mr-2" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
