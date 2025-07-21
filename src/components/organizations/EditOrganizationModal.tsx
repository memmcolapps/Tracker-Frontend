import { useForm } from "react-hook-form";
import {
  EditOrganizationFormData,
  editOrganizationSchema,
} from "@/schema/organization-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface EditOrganizationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: EditOrganizationFormData) => void;
  isSubmitting: boolean;
  defaultValues?: EditOrganizationFormData;
}

export function EditOrganizationModal({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
  defaultValues,
}: EditOrganizationModalProps) {
  const form = useForm<EditOrganizationFormData>({
    resolver: zodResolver(editOrganizationSchema),
    defaultValues,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Organization</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name">Organization Name</Label>
              <Input id="name" {...form.register("name")} className="mt-1" />
              {form.formState.errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="adminPhone">Admin Phone</Label>
                <Input
                  id="adminPhone"
                  {...form.register("adminPhone")}
                  className="mt-1"
                />
                {form.formState.errors.adminPhone && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.adminPhone.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="adminName">Admin Name</Label>
              <div className="grid grid-cols-2 gap-4 mt-1">
                <div>
                  <Input
                    id="firstName"
                    placeholder="First name"
                    {...form.register("firstName")}
                  />
                  {form.formState.errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    id="lastName"
                    placeholder="Last name"
                    {...form.register("lastName")}
                  />
                  {form.formState.errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
