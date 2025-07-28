import { handleApiError } from "@/error";
import {
  Device,
  DeviceApiResponse,
  DevicesData,
} from "@/types-and-interface/device.interface";

import axios, { type AxiosError } from "axios";

const BASE_URL = "http://localhost:6060/api/v1";

export const getDevicesApi = async (
  token: string,
  search?: string
): Promise<DevicesData | { success: false; error: string }> => {
  try {
    const response = await axios.get<DeviceApiResponse>(
      `${BASE_URL}/device/all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          search,
        },
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to fetch devices");
    }

    return response.data.data;
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "getDevices");
    return {
      success: false,
      error: errorResult.error,
    };
  }
};

export const createDeviceApi = async (
  token: string,
  device: Device
): Promise<Device | { success: false; error: string }> => {
  try {
    const response = await axios.post(`${BASE_URL}/device/register`, device, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to fetch devices");
    }
    console.log(response.data.device);
    return response.data.device;
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "createDevice");
    return {
      success: false,
      error: errorResult.error,
    };
  }
};

export const attachDeviceApi = async (
  deviceId: string,
  token: string,
  organizationId: string
): Promise<
  { success: true; message: string } | { success: false; error: string }
> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/organization/attachdevice`,
      {
        deviceId,
        organizationId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to attach device");
    }
    return {
      success: true,
      message: response.data.message,
    };
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "attachDevice");
    return {
      success: false,
      error: errorResult.error,
    };
  }
};
