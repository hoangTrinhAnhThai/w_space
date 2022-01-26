import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@fortawesome/fontawesome-free';
import VueChatScroll from 'vue-chat-scroll';
import store from './store';
import 'vue2-datepicker/index.css';
import vuetify from './plugins/vuetify';
import VueJWT from 'vuejs-jwt';
import '@mdi/font/css/materialdesignicons.css';
import excel from 'vue-excel-export';

Vue.use(excel);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(BootstrapVueIcons);
Vue.use(VueChatScroll);
Vue.use(VueJWT);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  vuetify,
  store,
}).$mount('#app');
