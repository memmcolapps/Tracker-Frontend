import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Device } from "@/types-and-interface/device.interface";

interface DeviceTableProps {
  data: Device[];
  columns: any[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const DeviceTable = ({
  data,
  columns,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: DeviceTableProps) => {
  return (
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
      <DataTable
        data={data}
        columns={columns}
        pagination={{
          currentPage,
          totalPages,
          totalItems,
          itemsPerPage,
          onPageChange,
        }}
      />
    </div>
  );
};
