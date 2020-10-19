export const BASE_URL = "http://localhost:9001/api/users";

class UsersApi {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getUsers() {
        const res = await fetch(`${this.baseUrl}/all`);
        const users = await res.json();
        return users;
    }

    async updateUser(user) {
        const resp = await fetch(`${this.baseUrl}/update/${user._id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        const updatedUser = await resp.json();
        return updatedUser;
    }

    async deleteUser(userId) {
        await fetch(`${this.baseUrl}/delete/${userId}`, {
            method: 'DELETE'
        });
    }

    async getUserById(userId) {
        const resp = await fetch(`${this.baseUrl}/${userId}`);
        const user = await resp.json();
        return user;
    }

    async createUser(user) {
        const resp = await fetch(`${this.baseUrl}/create`,{
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        });
        const created = await resp.json();
        return created;
    }
}

export default new UsersApi(BASE_URL);
