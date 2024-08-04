import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import Axios from 'axios'

Axios.defaults.baseURL = "/api";
Axios.defaults.timeout = 60000;

Vue.config.productionTip = false

Vue.use(ElementUI);


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
