import Vue from 'vue';
import VueRouter from 'vue-router';

import MainPage from '../views/MainPage.vue';
import Calendar from '../views/logtime/Calendar.vue';
import Roadmap from '../views/project/Roadmap.vue';
import ChatRoom from '../views/chat/ChatRoom.vue';
import Login from '../views/Auth/Login.vue';
import Signup from '../views/Auth/Register.vue';

Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: MainPage,
    component: MainPage,
    children: [
      {
        path: '/logtime',
        name: Calendar,
        component: Calendar,
      },
      {
        path: '/roadmap',
        name: Roadmap,
        component: Roadmap,
      },
      {
        path: '/chatroom',
        name: ChatRoom,
        component: ChatRoom,
      },
    ],
  },

  {
    path: '/signup',
    name: Signup,
    component: Signup,
  },
  {
    path: '/login',
    name: Login,
    component: Login,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});
export default router;
