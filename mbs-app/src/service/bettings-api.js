export const BASE_URL = "http://localhost:9001/api";

class BettingApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getUsers() {
    const res = await fetch(`${this.baseUrl}/user/all`);
    const users = await res.json();
    return users;
  }
}

export default new BettingApi(BASE_URL);
