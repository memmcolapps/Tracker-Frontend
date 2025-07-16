export interface LoginCredentials {
  email: string;
  password: string;
}

interface AdminPermissions {
  [key: string]: any; // Or define specific permission properties if known
}

export interface Admin {
  id: string;
  email: string;
  adminType: string;
  permissions: AdminPermissions;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminLoginResponse {
  message?: string;
  token?: string;
  admin?: Admin;
  success: boolean;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Additional types for better error handling
export interface ApiError {
  success: false;
  error: string;
  code?: string;
  details?: any;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
