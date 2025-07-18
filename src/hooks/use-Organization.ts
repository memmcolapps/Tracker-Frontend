import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createOrganizationApi,
  getOrganizationsApi,
} from "@/services/organization-service";
import {
  createOrganizationPayload,
  Organization,
} from "@/types-and-interface/org.interface";

export function useOrganizations() {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      const response = await getOrganizationsApi(
        localStorage.getItem("authToken") || ""
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
