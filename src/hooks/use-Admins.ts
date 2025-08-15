import { getAdminsApi } from "@/services/admins-service";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

export function useAdmins() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      const response = await getAdminsApi(
        localStorage.getItem("authToken") || ""
      );
      if ("success" in response && !response.success) {
        throw new Error(response.error);
      }
      return response;
    },
    enabled: isAuthenticated,
  });
}
