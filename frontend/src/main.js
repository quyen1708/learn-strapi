require('./bootstrap');

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './assets/css/main.css';


Vue.config.productionTip = false

window.Vue = require('vue');

Vue.use(Vuetify);

const buildVueFiles = (files) => {
  files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));
}
buildVueFiles(require.context('./pages/', true, /\.vue$/i));
buildVueFiles(require.context('./components/', true, /\.vue$/i));

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
