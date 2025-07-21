import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/components/ui/data-table";
import { Organization } from "@/types-and-interface/org.interface";
import {
  useOrganizations,
  useCreateOrganization,
  useUpdateOrganization,
  useDeleteOrganization,
} from "@/hooks/use-Organization";
import {
  OrganizationFormData,
  EditOrganizationFormData,
} from "@/schema/organization-schemas";
import { OrganizationsLoadingSkeleton } from "@/components/organizations/OrganizationsLoadingSkeleton";
import { getOrganizationColumns } from "@/components/organizations/OrganizationColumns";
import { AddOrganizationModal } from "@/components/organizations/AddOrganizationModal";
import { ViewOrganizationModal } from "@/components/organizations/ViewOrganizationModal";
import { EditOrganizationModal } from "@/components/organizations/EditOrganizationModal";
import { DeleteOrganizationModal } from "@/components/organizations/DeleteOrganizationModal";

export default function Organizations() {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const { data: organizations, isLoading } = useOrganizations(searchTerm);
  const { mutate: createOrganization } = useCreateOrganization();
  const updateMutation = useUpdateOrganization();
  const deleteMutation = useDeleteOrganization();

  const handleView = (org: Organization) => {
    setSelectedOrganization(org);
    setViewModalOpen(true);
  };

  const handleEdit = (org: Organization) => {
    setEditModalOpen(true);
    setSelectedOrganization(org);
  };

  const handleDelete = (org: Organization) => {
    setSelectedOrganization(org);
    setDeleteModalOpen(true);
  };

  const handleCreateOrganization = (data: OrganizationFormData) => {
    setIsSubmitting(true);
    createOrganization(
      {
        name: data.name,
        email: data.adminEmail,
        phone: data.adminPhone,
        password: data.password,
        adminFirstName: data.firstName,
        adminLastName: data.lastName,
      },
      {
        onSuccess: () => {
          toast.success("Organization created successfully");
          queryClient.invalidateQueries().then(() => {
            setAddModalOpen(false);
          });
        },
        onError: (error) => {
          toast.error("Failed to create organization");
          console.error("Error creating organization:", error);
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      }
    );
  };

  const handleEditOrganization = async (data: EditOrganizationFormData) => {
    if (!selectedOrganization?.id) return;
    setIsSubmitting(true);
    try {
      await updateMutation.mutateAsync({
        id: selectedOrganization.id,
        name: data.name,
        phone: data.adminPhone,
        adminFirstName: data.firstName,
        adminLastName: data.lastName,
      });
      toast.success("Organization updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["organizations"] });
      setSelectedOrganization(null);
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating organization:", error);
      toast.error("Failed to update organization");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteOrganization = async () => {
    if (!selectedOrganization?.id) return;
    try {
      await deleteMutation.mutateAsync(selectedOrganization.id);
      toast.success("Organization deleted successfully");
      await queryClient.invalidateQueries({ queryKey: ["organizations"] });
      setDeleteModalOpen(false);
      setSelectedOrganization(null);
    } catch (error) {
      console.error("Error deleting organization:", error);
      toast.error("Failed to delete organization");
    }
  };

  const columns = getOrganizationColumns({
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  if (isLoading) {
    return <OrganizationsLoadingSkeleton />;
  }

  const totalPages = Math.ceil((organizations?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData =
    organizations?.slice(startIndex, startIndex + itemsPerPage) || [];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Organizations</h3>
        <Button onClick={() => setAddModalOpen(true)}>
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
                htmlFor="search"
                className="text-sm font-medium text-gray-700"
              >
                Search
              </Label>
              <Input
                type="text"
                placeholder="Search organizations by Organization Name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
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

      {/* Modals */}
      <AddOrganizationModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onSubmit={handleCreateOrganization}
        isSubmitting={isSubmitting}
      />

      <ViewOrganizationModal
        open={viewModalOpen}
        onOpenChange={setViewModalOpen}
        organization={selectedOrganization}
      />

      <EditOrganizationModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        onSubmit={handleEditOrganization}
        isSubmitting={isSubmitting}
        defaultValues={{
          name: selectedOrganization?.name || "alani",
          adminPhone: selectedOrganization?.adminPhone || "",
          firstName: selectedOrganization?.users?.[0]?.firstName || "",
          lastName: selectedOrganization?.users?.[0]?.lastName || "",
        }}
      />

      <DeleteOrganizationModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        organization={selectedOrganization}
        onConfirm={handleDeleteOrganization}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
