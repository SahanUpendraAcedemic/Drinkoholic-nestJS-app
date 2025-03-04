import axios from "axios";
import baseURL from "../config/config"; // Import your API base URL
import { toast } from "react-toastify"; // Import toast notifications

class HttpService {
  constructor() {
    this.service = axios.create({
      baseURL: baseURL, // Set base URL from config
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add response interceptors
    this.service.interceptors.response.use(
      this.handleSuccess,
      this.handleError,
    );
  }

  sendRequest = async (config) => {
    if (!this.service) {
      throw new Error("Axios instance is not initialized!");
    }
    const token = localStorage.getItem("token");

    // Allow sign-in and sign-up requests without a token
    const publicEndpoints = ["/signin", "/signup"];
    const isPublicRequest = publicEndpoints.some((endpoint) =>
      config.url.includes(endpoint),
    );

    if (!token && !isPublicRequest) {
      toast.error("Unauthorized! Please log in.");
      window.location.href = "/signin";
      return Promise.reject(new Error("Unauthorized: No token provided"));
    }

    // Attach token if available
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return this.service.request(config);
  };

  handleSuccess = (response) => response;

  handleError = (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        toast.error("Session expired. Please log in again.", {
          onClose: () => {
            localStorage.removeItem("token");
            window.location.href = "/signin"; // Redirect after toast
          },
        });
      } else {
        toast.error(
          `Error: ${error.response.data?.message || "Something went wrong!"}`,
        );
      }
    } else {
      toast.error("Network error. Please check your connection.");
    }

    return Promise.reject(error);
  };
}

export default HttpService;
