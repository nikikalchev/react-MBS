export const BASE_URL = "http://localhost:3001";

class BettingApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getAllMatches() {
    const resp = await fetch(`${this.baseUrl}/matches`);
    const matches = await resp.json();
    return matches;
  }
}

export default new BettingApi(BASE_URL);
