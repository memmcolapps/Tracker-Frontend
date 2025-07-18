import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/status-badge";
import { Plus, Building, MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Organization } from "@/types-and-interface/org.interface";
import {
  useOrganizations,
  useCreateOrganization,
} from "@/hooks/use-Organization";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Define validation schema
const organizationSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  adminEmail: z.string().email("Invalid email address"),
  adminPhone: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

type OrganizationFormData = z.infer<typeof organizationSchema>;
export default function Organizations() {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const { data: organizations, isLoading, isError, error } = useOrganizations();
  const { mutate: createOrganization } = useCreateOrganization();

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

  const onSubmit = (data: OrganizationFormData) => {
    setIsSubmitting(true);

    const newOrganization = {
      name: data.name,
      email: data.adminEmail,
      phone: data.adminPhone,
      password: data.password,
      adminFirstName: data.firstName,
      adminLastName: data.lastName,
    };

    createOrganization(newOrganization, {
      onSuccess: () => {
        toast.success("Organization created successfully");
        queryClient.invalidateQueries().then(() => {
          setAddModalOpen(false);
          form.reset();
        });
      },
      onError: (error) => {
        toast.error("Failed to create organization");
        console.error("Error creating organization:", error);
      },
      onSettled: () => {
        setIsSubmitting(false);
      },
    });
  };

  const handleView = (org: Organization) => {
    setSelectedOrganization(org);
    setViewModalOpen(true);
  };

  const handleEdit = (org: Organization) => {
    setSelectedOrganization(org);
    setEditModalOpen(true);
  };

  const handleDelete = (org: Organization) => {
    setSelectedOrganization(org);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Handle delete logic here
    console.log("Deleting organization:", selectedOrganization);
    setDeleteModalOpen(false);
  };

  const addOrganization = () => {
    setAddModalOpen(true);
  };

  // const saveNewOrganization = () => {
  //   // Handle save new organization logic here
  //   const newOrganization = {
  //     name: "New Organization",
  //     email: "admin@example.com",
  //     phone: "1234567890",
  //     password: "password",
  //     adminFirstName: "John",
  //     adminLastName: "Doe",
  //   };
  //   createOrganization(newOrganization);
  //   console.log("Saving new organization");
  //   onOpenChange(false);
  // };

  const columns = [
    {
      key: "organization" as keyof Organization,
      label: "Organization",
      render: (value: string, row: Organization) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-primary" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{row.name}</div>
            <div className="text-sm text-gray-500">{row.adminEmail}</div>
          </div>
        </div>
      ),
    },
    {
      key: "status" as keyof Organization,
      label: "Status",
      render: (value: string) => <StatusBadge status={"pending"} />,
    },
    {
      key: "devices" as keyof Organization,
      label: "Devices",
      render: (value: string, row: Organization) => (
        <div>
          <div className="text-sm font-medium text-gray-900">
            {row?.devices?.length}
          </div>
          <div className="text-sm text-gray-500">devices</div>
        </div>
      ),
    },
    {
      key: "users" as keyof Organization,
      label: "Users",
      render: (value: string, row: Organization) => (
        <div>
          <div className="text-sm font-medium text-gray-900">
            {row?.users?.length}
          </div>
          <div className="text-sm text-gray-500">users</div>
        </div>
      ),
    },
    {
      key: "createdAt" as keyof Organization,
      label: "Created",
      render: (value: Date) =>
        value ? new Date(value).toLocaleDateString() : "-",
    },

    {
      key: "actions" as keyof Organization,
      label: "Actions",
      render: (value: number, row: Organization) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleView(row)}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(row)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(row)}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil((organizations?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData =
    organizations?.slice(startIndex, startIndex + itemsPerPage) || [];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Organizations</h3>
        <Button onClick={() => addOrganization()}>
          <Plus className="w-4 h-4 mr-2" />
          Add Organization
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label
                htmlFor="status"
                className="text-sm font-medium text-gray-700"
              >
                Status
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                htmlFor="search"
                className="text-sm font-medium text-gray-700"
              >
                Search
              </Label>
              <Input
                type="text"
                placeholder="Search organizations by Organization Name..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Organizations Table */}
      <DataTable
        data={paginatedData}
        columns={columns}
        pagination={{
          currentPage,
          totalPages,
          totalItems: organizations?.length || 0,
          itemsPerPage,
          onPageChange: setCurrentPage,
        }}
      />

      {/* Add Organization Dialog */}
      <Dialog
        open={addModalOpen}
        onOpenChange={(open) => {
          if (!open) form.reset();
          setAddModalOpen(open);
        }}
      >
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
                onClick={() => setAddModalOpen(false)}
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

      {/* View Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Organization Details</DialogTitle>
            <DialogDescription>
              View details for {selectedOrganization?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Name
                </Label>
                <div className="mt-1 text-sm text-gray-900">
                  {selectedOrganization?.name}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <div className="mt-1 text-sm text-gray-900">
                  {selectedOrganization?.adminEmail}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Status
                </Label>
                <div className="mt-1">
                  <StatusBadge status="active" />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Created
                </Label>
                <div className="mt-1 text-sm text-gray-900">
                  {selectedOrganization?.createdAt
                    ? new Date(
                        selectedOrganization?.createdAt
                      ).toLocaleDateString()
                    : "-"}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setViewModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Organization</DialogTitle>
            <DialogDescription>
              Update details for {selectedOrganization?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue={selectedOrganization?.name}
                  className="mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  defaultValue={selectedOrganization?.adminEmail}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="status"
                className="text-sm font-medium text-gray-700"
              >
                Status
              </Label>
              <Select defaultValue={"pending"}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setEditModalOpen(false)}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Organization</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedOrganization?.name}? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Trash2 className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Warning</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>
                      Deleting this organization will remove all associated data
                      including devices and users.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Organization
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
