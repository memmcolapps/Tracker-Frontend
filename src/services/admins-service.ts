import { handleApiError } from "@/error";
import axios, { type AxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL_PRODUCTION;

export interface Admins {
  id: string;
  email: string;
  adminType: string;
  permissions: {};
  createdAt?: string;
  updatedAt?: string;
}

export const getAdminsApi = async (
  token: string
): Promise<Admins[] | { success: false; error: string }> => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.data.success) {
      return {
        success: false,
        error: response.data.error,
      };
    }
    console.log("Fetched admins:", response.data.admins);
    return response.data.admins;
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "getAdmins");
    return {
      success: false,
      error: errorResult.error,
    };
  }
};
