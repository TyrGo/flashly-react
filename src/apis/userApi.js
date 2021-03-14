import axios from "axios";

const BASE_URL = "https://flashly-flash-card.herokuapp.com";

class UserApi {
  static token;

  static async signUp(data) {
    let res = await axios.post(`${BASE_URL}/register`, data);
    return res.data.token;
  }

  static async signIn(data) {
    let res = await axios.post(`${BASE_URL}/token`, data);
    return res.data.token;
  }

  static async getUser(userId) {
    let res = await axios.get(`${BASE_URL}/${userId}`);
    return res.user;
  }
}

export default UserApi;
