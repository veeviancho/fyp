import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';

// Importing Font Awesome library for icons
import { library } from '@fortawesome/fontawesome-svg-core' //core package
import { fas } from '@fortawesome/free-solid-svg-icons' //adding all icon content, fas stands for fontawesome solid
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' //importing vue component by fontawesome

// Adding Bulma to project
require('@/assets/main.scss');

// Adding Fontawesome to project
library.add(fas);

// Setting axios as default prototype
const app = createApp({})
// const app = createApp(App).use(store).use(router)
app.config.globalProperties.$http = axios;

// Load token from localStorage
// If there is token, append default axios authorization headers
const token = localStorage.getItem('token')
if (token) {
  app.config.globalProperties.$http.defaults.headers.common['Authorization'] = token
}

createApp(App)
.component('fa', FontAwesomeIcon)
.use(store)
.use(router)
.mount('#app')
