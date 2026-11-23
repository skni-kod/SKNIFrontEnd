import axios from 'axios';

const beAxios = axios.create({
  baseURL: import.meta.env.VUE_APP_BACK_URL,
});

export default beAxios;
