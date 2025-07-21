import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createOrganizationApi,
  deleteOrganizationApi,
  getOrganizationsApi,
  updateOrganizationApi,
} from "@/services/organization-service";
import {
  createOrganizationPayload,
  Organization,
  updateOrganizationPayload,
} from "@/types-and-interface/org.interface";

export function useOrganizations(search?: string) {
  return useQuery({
    queryKey: ["organizations", search],
    queryFn: async () => {
      const response = await getOrganizationsApi(
        localStorage.getItem("authToken") || "",
        search
      );
      if ("success" in response && !response.success) {
        throw new Error(response.error);
      }
      return response as Organization[];
    },
  });
}

export function useCreateOrganization() {
  return useMutation({
    mutationFn: async (organization: createOrganizationPayload) => {
      const response = await createOrganizationApi(
        localStorage.getItem("authToken") || "",
        organization
      );
      if ("success" in response && !response.success) {
        throw new Error(response.error);
      }
      return response;
    },
  });
}

export function useUpdateOrganization() {
  return useMutation({
    mutationFn: async (organization: updateOrganizationPayload) => {
      const response = await updateOrganizationApi(
        localStorage.getItem("authToken") || "",
        organization
      );
      if ("success" in response && !response.success) {
        throw new Error(response.error);
      }
      return response;
    },
  });
}

export function useDeleteOrganization() {
  return useMutation({
    mutationFn: async (organizationId: string) => {
      const response = await deleteOrganizationApi(
        localStorage.getItem("authToken") || "",
        organizationId
      );
      if (!response || ("success" in response && !response.success)) {
        throw new Error(response?.error || "Failed to delete organization");
      }
      return response;
    },
  });
}
