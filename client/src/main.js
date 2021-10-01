import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//importing Font Awesome library for icons
import { library } from '@fortawesome/fontawesome-svg-core' //core package
import { fas } from '@fortawesome/free-solid-svg-icons' //adding all icon content, fas stands for fontawesome solid
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' //importing vue component by fontawesome

// adding bulma to project
require('@/assets/main.scss');

// adding fontawesome to project
library.add(fas);

createApp(App)
.component('fa', FontAwesomeIcon)
.use(store)
.use(router)
.mount('#app')
