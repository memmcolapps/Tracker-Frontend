import { handleApiError } from "@/error";
import { LoginCredentials } from "@/types-and-interface/auth.interface";
import axios, { type AxiosError } from "axios";

const BASE_URL = "http://localhost:6060/api/v1";

export const loginApi = async (credentials: LoginCredentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/login`, credentials);
    console.log(response);
    return response.data;
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "login");
    return {
      success: false,
      error: errorResult.error,
    };
  }
};
