import axios from 'axios';


export function login(username: string, password: string) {
    axios.post('http://localhost:8000/obtain-token/', { "username": username, "password": password,})
        .then(res => {
            localStorage.setItem('token', res.data['token']);
        });
}

export function logout() {
    localStorage.removeItem('token');
}

export function isLoggedIn() : boolean {
    return localStorage.getItem('token') != null;
}