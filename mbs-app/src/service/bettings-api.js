export const BASE_URL = "http://localhost:9001/api/bettings";

class BettingsApi {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getBettings(userId) {
        const res = await fetch(`${this.baseUrl}/${userId}`);
        const bettings = await res.json();
        return bettings;
    }

    async getBetting(matchId, user) {
        const res = await fetch(`${this.baseUrl}/${matchId}/${user}`);
        const betting = await res.json();
        return betting;
    }

    async getBettingsAggregation(dummy) {
        const res = await fetch(`${this.baseUrl}/aggregation/${dummy}`);
        const betting = await res.json();
        return betting;
    }

    async updateBetting(betting) {
        const resp = await fetch(`${this.baseUrl}/update/${betting._id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(betting)
        });
        const updatedBetting = await resp.json();
        return updatedBetting;
    }

    async deleteBetting(matchId) {
        await fetch(`${this.baseUrl}/delete/${matchId}`, {
            method: 'DELETE'
        });
    }

    async createBetting(betting) {
        const resp = await fetch(`${this.baseUrl}/create`,{
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(betting)
        });
        const created = await resp.json();
        return created;
    }
}

export default new BettingsApi(BASE_URL);
