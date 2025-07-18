import { handleApiError } from "@/error";
import {
  createOrganizationPayload,
  Organization,
} from "@/types-and-interface/org.interface";
import axios, { type AxiosError } from "axios";

const BASE_URL = "http://localhost:6060/api/v1";

export const getOrganizationsApi = async (
  token: string
): Promise<Organization[] | { success: false; error: string }> => {
  try {
    const response = await axios.get(`${BASE_URL}/organization/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.organizations);
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
