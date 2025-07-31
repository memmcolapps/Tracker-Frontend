import {
  attachDeviceApi,
  createDeviceApi,
  getDevicesApi,
} from "@/services/device-service";
import {
  Device,
  DevicePayload,
  DevicesData,
} from "@/types-and-interface/device.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

export function useDevices(search?: string) {
  const { admin, isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["devices", search],
    queryFn: async () => {
      const response = await getDevicesApi(
        localStorage.getItem("authToken") || "",
        search
      );
      if ("success" in response && !response.success) {
        throw new Error(response.error);
      }
      return response as DevicesData;
    },
    enabled: isAuthenticated,
  });
}

export function useCreateDevice() {
  return useMutation({
    mutationFn: async (device: DevicePayload) => {
      const response = await createDeviceApi(
        localStorage.getItem("authToken") || "",
        device
      );
      if ("success" in response && !response.success) {
        throw new Error(response.error);
      }
      return response;
    },
  });
}

export function useAttachDevice() {
  return useMutation({
    mutationFn: async (data: { deviceId: string; organizationId: string }) => {
      const response = await attachDeviceApi(
        data.deviceId,
        localStorage.getItem("authToken") || "",
        data.organizationId
      );
      if ("success" in response && !response.success) {
        throw new Error(response.error);
      }
      return response;
    },
  });
}
