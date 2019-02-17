import axios from 'axios';


const accessTokenName: string = 'access_token';
const refreshTokenName: string = 'refresh_token';

export async function login(username: string, password: string) {
    let response = await axios.post('http://localhost:8000/obtain-token/', { "username": username, "password": password, });
    if (response.status === 200) {
        localStorage.setItem(accessTokenName, response.data.access);
        localStorage.setItem(refreshTokenName, response.data.refresh);
    }

    return response;
}

export function logout() {
    localStorage.removeItem(accessTokenName);
}

export async function refreshToken() {
    const token = localStorage.getItem(refreshTokenName);

    if (token == null) {
        return;
    }

    let response = await axios.post('http://localhost:8000/refresh-token/', { "refresh": token });
    if (response.status === 200) {
        localStorage.setItem(accessTokenName, response.data.access);
    }

    return response;
}

export function isLoggedIn(): boolean {
    let token = localStorage.getItem(accessTokenName);
    return token !== null;
}

export function createAuthHeader() {
    const token = localStorage.getItem(accessTokenName);

    if (token == null) {
        return;
    }

    return {
        'Authorization': 'Bearer ' + token,
    };
}
