export const REGISTER_URL = "http://localhost:9001/api/user/register";
export const LOGIN_URL = "http://localhost:9001/api/user/login";

class AuthorizationApi {
    constructor(loginUrl, registerUrl) {
        this.loginUrl = loginUrl;
        this.registerUrl = registerUrl;
    }

    async registerUser(user) {
        const resp = await fetch(this.registerUrl,{
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        });
        const created = await resp.json();
        return created;
    }

    async login(credentials) {
        const resp = await fetch(this.loginUrl,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        });
        const loggedInUser = await resp.json();
        return loggedInUser;
    }
}

export default new AuthorizationApi(LOGIN_URL, REGISTER_URL);