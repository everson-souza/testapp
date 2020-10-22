import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(VueRouter, VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  vuetify,
  VueRouter,
  router,  
  render: h => h(App)
}).$mount('#app')
