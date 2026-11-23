import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import '@fontsource-variable/inter';
import '@fontsource-variable/montserrat';
import '@mdi/font/css/materialdesignicons.css';
import './styles/main.css';
import './styles/editor.css';

createApp(App).use(store).use(router).mount('#app');
