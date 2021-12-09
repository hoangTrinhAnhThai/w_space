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
import vuetify from './plugins/vuetify';
import VueJWT from 'vuejs-jwt';
import '@mdi/font/css/materialdesignicons.css';
const VUE_APP_API_SOKET = process.env.VUE_APP_API_SOKET

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(BootstrapVueIcons);
Vue.use(VueChatScroll);
Vue.use(VueJWT);

Vue.config.productionTip = false;
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: `${VUE_APP_API_SOKET}:4000`,
  }),
);
// Vue.use(Vuetify)

// export default new Vuetify({
//     icons: {
//         iconfont: 'mdi', // default - only for display purposes
//     },
// })

new Vue({
  render: (h) => h(App),
  router,
  vuetify,
  store,
}).$mount('#app');
