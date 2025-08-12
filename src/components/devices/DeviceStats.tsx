import { Circle, Smartphone } from "lucide-react";
import { StatsCard } from "@/components/ui/stats-card";

interface DeviceStatsProps {
  online: number;
  offline: number;
  total: number;
}

export const DeviceStats = ({ online, offline, total }: DeviceStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <StatsCard
        title="Online"
        value={online}
        icon={Circle}
        iconColor="text-green-500"
      />
      <StatsCard
        title="Offline"
        value={offline}
        icon={Circle}
        iconColor="text-orange-500"
      />
      <StatsCard
        title="Total"
        value={total}
        icon={Smartphone}
        iconColor="text-gray-600"
      />
    </div>
  );
};
