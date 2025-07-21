import { Organization } from "@/types-and-interface/org.interface";
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

interface ViewOrganizationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organization: Organization | null;
}

export function ViewOrganizationModal({
  open,
  onOpenChange,
  organization,
}: ViewOrganizationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Organization Details</DialogTitle>
          <DialogDescription>
            View details for {organization?.name}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Name</Label>
              <div className="mt-1 text-sm text-gray-900">
                {organization?.name}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Email</Label>
              <div className="mt-1 text-sm text-gray-900">
                {organization?.adminEmail}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Created
              </Label>
              <div className="mt-1 text-sm text-gray-900">
                {organization?.createdAt
                  ? new Date(organization?.createdAt).toLocaleDateString()
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
