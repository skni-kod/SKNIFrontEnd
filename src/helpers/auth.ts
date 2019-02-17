import axios from 'axios';


const accessTokenName: string = 'access_token';
const refreshTokenName: string = 'refresh_token';

export function login(username: string, password: string) {
    axios.post('http://localhost:8000/obtain-token/', { "username": username, "password": password, })
        .then(res => {
            localStorage.setItem(accessTokenName, res.data.access);
            localStorage.setItem(refreshTokenName, res.data.refresh);
        });
}

export function logout() {
    localStorage.removeItem(accessTokenName);
}

export function refreshToken() {
    const token = localStorage.getItem(refreshTokenName);

    if (token == null) {
        return;
    }

    axios.post('http://localhost:8000/refresh-token/', { "refresh": token })
        .then(res => {
            localStorage.setItem(accessTokenName, res.data.access);
        });
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
