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
import VueSocketIO from 'vue-socket.io';
import vuetify from './plugins/vuetify'
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(BootstrapVueIcons);
Vue.use(VueChatScroll);

Vue.config.productionTip = false;
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: 'http://localhost:4000',
  }),
);

new Vue({
  render: (h) => h(App),
  router,
  vuetify,
  store
}).$mount('#app');
