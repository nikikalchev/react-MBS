export const BASE_URL = "http://localhost:9001/api/teams";

class TeamsApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getTeams() {
    const res = await fetch(`${this.baseUrl}/all`);
    const teams = await res.json();
    return teams;
  }

  async getTeamById(teamId) {
    const resp = await fetch(`${this.baseUrl}/${teamId}`);
    const team = await resp.json();
    return team;
  }
}

export default new TeamsApi(BASE_URL);
