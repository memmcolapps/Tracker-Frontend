import { loginApi } from "@/services/auth-service";
import {
  Admin,
  AdminLoginResponse,
} from "@/types-and-interface/auth.interface";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  admin: Admin | null;
  login: (credentials: LoginCredentials) => Promise<AdminLoginResponse>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const loggedInAdmin = localStorage.getItem("admin");
        console.log(token);
        console.log(loggedInAdmin);
        if (token && loggedInAdmin) {
          setAdmin(JSON.parse(loggedInAdmin));

          //   const response = await fetch(
          //     `${
          //       process.env.NEXT_PUBLIC_API_BASE_URL ||
          //       "http://localhost:6060/api/v1"
          //     }/admin/me`,
          //     {
          //       headers: {
          //         Authorization: `Bearer ${token}`,
          //       },
          //     }
          //   );

          //   if (response.ok) {
          //     const adminData = await response.json();
          //     setAdmin(adminData.admin);
          //   } else {
          //     localStorage.removeItem("authToken");
          //     setAdmin(null);
          //   }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        localStorage.removeItem("authToken");
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (
    credentials: LoginCredentials
  ): Promise<AdminLoginResponse> => {
    setLoading(true);
    try {
      const result = await loginApi(credentials);

      if (result.success && result.token && result.admin) {
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("admin", JSON.stringify(result.admin));
        setAdmin(result.admin);
        return result;
      } else {
        return {
          success: false,
          error: result.error || "An unknown login error occurred.", // Defensive check, but result.error should be string
          message: result.message, // Include message if your AdminLoginResponse uses it
        };
      }
    } catch (error: any) {
      console.error(
        "AuthContext caught unexpected error from loginApi:",
        error
      );
      return {
        success: false,
        error: "A critical unexpected error occurred.",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem("authToken");
    setAdmin(null);
  };

  const isAuthenticated = !!admin;

  return (
    <AuthContext.Provider
      value={{
        admin,
        login,
        logout,
        loading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
