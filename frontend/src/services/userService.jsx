import HttpService from "./httpsService";
import URL from "../config/config";

class UserService extends HttpService {
  async signUp(data) {
    const config = {
      method: "POST",
      url: URL.SIGNUP,
      data: data,
    };
    return this.sendRequest(config);
  }

  async signIn(data) {
    const config = {
      method: "POST",
      url: URL.LOGIN,
      data: data,
    };
    return this.sendRequest(config);
  }
}

const userService = new UserService();
export default userService;
