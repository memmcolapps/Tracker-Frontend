import { handleApiError } from "@/error";
import {
  createOrganizationPayload,
  Organization,
  updateOrganizationPayload,
} from "@/types-and-interface/org.interface";
import axios, { type AxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL_PRODUCTION;

export const getOrganizationsApi = async (
  token: string,
  search?: string
): Promise<Organization[] | { success: false; error: string }> => {
  try {
    const response = await axios.get(`${BASE_URL}/organization/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        search,
      },
    });
    return response.data.organizations;
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "getOrganizations");
    return {
      success: false,
      error: errorResult.error,
    };
  }
};

export const createOrganizationApi = async (
  token: string,
  organization: createOrganizationPayload
): Promise<Organization | { success: false; error: string }> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/organization`,
      organization,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.organization);
    return response.data.organization;
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "createOrganization");
    return {
      success: false,
      error: errorResult.error,
    };
  }
};

export const updateOrganizationApi = async (
  token: string,
  organization: updateOrganizationPayload
): Promise<Organization | { success: false; error: string }> => {
  try {
    const response = await axios.put(
      `${BASE_URL}/organization/${organization.id}`,
      organization,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.organization);
    return response.data.organization;
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "updateOrganization");
    return {
      success: false,
      error: errorResult.error,
    };
  }
};

export const deleteOrganizationApi = async (
  token: string,
  organizationId: string
): Promise<
  { success: true; message: string } | { success: false; error: string }
> => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/organization/${organizationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.organization);
    return response.data;
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "deleteOrganization");
    return {
      success: false,
      error: errorResult.error,
    };
  }
};
