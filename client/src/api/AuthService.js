import client from "../libs/HttpClient";

class AuthService {
  static login(loginData) {
    return client.post("user/login", loginData);
  }
  static register(request) {
    return client.post("user/signup", request);
  }
  static otpVerify(request) {
    return client.post("user/verify-email", request);
  }
}

export { AuthService };
