import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from './store';
import 'vue2-datepicker/index.css';
import VueSocketIO from 'vue-socket.io'
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:4000',
}))

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
