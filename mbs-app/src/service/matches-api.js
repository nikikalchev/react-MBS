export const BASE_URL = "http://localhost:9001/api/matches";

class MatchesApi {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getMatches() {
        const res = await fetch(`${this.baseUrl}/all`);
        const matches = await res.json();
        return matches;
    }

    async getMatchById(matchId) {
        const res = await fetch(`${this.baseUrl}/${matchId}`);
        const match = await res.json();
        return match;
    }

    async updateMatch(match) {
        const resp = await fetch(`${this.baseUrl}/update/${match._id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(match)
        });
        const updatedMatch = await resp.json();
        return updatedMatch;
    }

    async deleteMatch(matchId) {
        await fetch(`${this.baseUrl}/delete/${matchId}`, {
            method: 'DELETE'
        });
    }

    async createMatch(match) {
        const resp = await fetch(`${this.baseUrl}/create`,{
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(match)
        });
        const created = await resp.json();
        return created;
    }
}

export default new MatchesApi(BASE_URL);
