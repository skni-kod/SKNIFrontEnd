import axios from 'axios';
const beAxios = axios.create({
  baseURL: process.env.VUE_APP_BACK_URL,
});

export default beAxios;
