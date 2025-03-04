import axios from "axios";

class HttpService {
  service = null;
  constructor() {
    this.service = axios.create();
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
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return this.service.request(config);
  };

  handleSuccess = (response) => {
    return response;
  };

  handleError = (error) => {
    if (error.response.status === 401) {
      toast.error("Please login to continue", {
        onclose: () => {
          window.location.href = "/signin";
        },
      });
    }
    return Promise.reject(error);
  };
}

export default HttpService;
