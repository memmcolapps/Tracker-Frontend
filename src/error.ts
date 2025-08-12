import axios, { type AxiosError } from "axios";

interface SimpleApiErrorResult {
  success: false;
  error: string; // The crucial change: error property is now guaranteed to be a string
}

export const handleApiError = (
  error: unknown,
  context: string = "API call"
): SimpleApiErrorResult => {
  let errorMessage: string;
  let statusCode: number | undefined;

  console.log("RAW ERROR OBJECT IN HANDLEAPIERROR:", error); // Keep this for full debugging

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{
      error: string;
      success?: boolean;
    }>;

    statusCode = axiosError.response?.status;
    const serverMessage = axiosError.response?.data?.error;
    const successStatus = axiosError.response?.data?.success;

    console.error(`Axios error during ${context}:`, {
      status: statusCode,
      statusText: axiosError.response?.statusText,
      data: axiosError.response?.data,
      message: axiosError.message,
      url: axiosError.config?.url,
    });

    // Determine the user-friendly message
    switch (statusCode) {
      case 400:
        errorMessage =
          serverMessage || "Invalid request. Please check your input.";
        break;
      case 401:
        errorMessage =
          "Invalid credentials. Please check your email and password.";
        break;
      case 403:
        errorMessage =
          "Access denied. You don't have permission to perform this action.";
        break;
      case 404:
        errorMessage = "Service not found. Please try again later.";
        break;
      case 429:
        errorMessage = "Too many requests. Please wait a moment and try again.";
        break;
      case 500:
        errorMessage = "Server error. Please try again later.";
        break;
      case 502:
      case 503:
      case 504:
        errorMessage =
          "Service temporarily unavailable. Please try again later.";
        break;
      default:
        // Fallback for other status codes or if no specific status
        errorMessage =
          serverMessage ||
          axiosError.message ||
          "An unexpected network error occurred.";
        break;
    }

    // You could still use these for internal logging or more detailed error displays later

    // IMPORTANT: If axiosError.response?.data is a non-string object,
    // and `serverMessage` isn't found, you might want to stringify `data`
    // to provide more context to the user or for logging if `errorMessage` is too generic.
    // Example: if (!serverMessage && typeof axiosError.response?.data === 'object' && axiosError.response?.data !== null) {
    //   errorMessage += ` Details: ${JSON.stringify(axiosError.response.data)}`;
    // }
  } else if (error instanceof Error) {
    // Handle generic Error instances (e.g., programming errors, non-Axios issues)
    console.error(`Generic error during ${context}:`, {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    errorMessage = error.message || "An unexpected application error occurred.";
  } else {
    // Handle completely unknown errors (e.g., a non-Error object was thrown)
    console.error(`Unknown error during ${context}:`, error);
    errorMessage = "An entirely unknown error occurred.";
  }

  // RETURN ONLY THE MESSAGE STRING for the 'error' property
  return {
    success: false,
    error: errorMessage, // This is now guaranteed to be a string!
  };
};
