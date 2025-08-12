import { useForm } from "react-hook-form";
import {
  OrganizationFormData,
  organizationSchema,
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
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface AddOrganizationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: OrganizationFormData) => void;
  isSubmitting: boolean;
}

export function AddOrganizationModal({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
}: AddOrganizationModalProps) {
  const form = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      adminEmail: "",
      adminPhone: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Organization</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new organization
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Organization Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter organization name"
                  className="mt-1"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="adminEmail"
                  className="text-sm font-medium text-gray-700"
                >
                  Admin Email
                </Label>
                <Input
                  id="adminEmail"
                  type="email"
                  placeholder="Enter admin email"
                  className="mt-1"
                  {...form.register("adminEmail")}
                />
                {form.formState.errors.adminEmail && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.adminEmail.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="adminPhone"
                  className="text-sm font-medium text-gray-700"
                >
                  Admin Phone
                </Label>
                <Input
                  id="adminPhone"
                  placeholder="Enter admin phone"
                  className="mt-1"
                  {...form.register("adminPhone")}
                />
                {form.formState.errors.adminPhone && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.adminPhone.message}
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  className="mt-1"
                  {...form.register("password")}
                />
                {form.formState.errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Label
                htmlFor="adminName"
                className="text-sm font-medium text-gray-700"
              >
                Admin Name
              </Label>
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
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating...
                </>
              ) : (
                "Create Organization"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
