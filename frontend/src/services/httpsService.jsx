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
    return this.service.request(config);
  };

  handleSuccess = (response) => {
    return response;
  };

  handleError = (error) => {
    if (!error.response) {
      return {
        data: {
          message: "Network Error",
          success: false,
        },
      };
    }
  };
}

export default HttpService;
