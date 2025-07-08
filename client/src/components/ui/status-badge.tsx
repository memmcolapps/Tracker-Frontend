import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'online':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'inactive':
      case 'offline':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'suspended':
      case 'error':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'super_admin':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'admin':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-100';
      case 'user':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case 'super_admin':
        return 'Super Admin';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <Badge 
      variant="secondary" 
      className={cn(getStatusColor(status), className)}
    >
      {formatStatus(status)}
    </Badge>
  );
}
