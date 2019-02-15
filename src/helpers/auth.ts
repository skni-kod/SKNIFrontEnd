import axios from 'axios';


export function login(username: string, password: string) {
    console.log(username);
    console.log(password);

    let data = JSON.stringify({
        username: username,
        password: password,
    });

    axios.post('http://localhost:8000/obtain-token/', 
        {
            "username": username,
            "password": password,
        }
    )
        .then(res => {
            alert(JSON.stringify(res));
        })
        .catch(error => console.log(error.response));
}