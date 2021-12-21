import Vue from 'vue';
import VueRouter from 'vue-router';

import MainPage from '../views/MainPage.vue';
import HomePage from '../views/HomePage.vue';

import Profile from '../views/Profile.vue';
import Calendar from '../views/logtime/Calendar.vue';
import Roadmap from '../views/project/Roadmap.vue';
import ProjectPage from '../views/project/ProjectPage.vue';
import Login from '../views/Auth/Login.vue';
import Signup from '../views/Auth/Register.vue';
import ChatPage from '../views/chat/ChatPage.vue';
import ChatRoom from '../views/chat/ChatRoom.vue';


Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: MainPage,
    component: MainPage,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/logtime',
        name: Calendar,
        component: Calendar,
      },
      {
        path: '/roadmap/:id',
        name: Roadmap,
        component: Roadmap,
      },
      {
        path: '/',
        name: ProjectPage,
        component: ProjectPage,
      },
      {
        path: '/chatroom/:id',
        name: ChatRoom,
        component: ChatRoom,
      },
      {
        path: '/chatroom/',
        name: ChatPage,
        component: ChatPage,
      },
      {
        path: '/profile',
        name: Profile,
        component: Profile,
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
  {
    path: '/home',
    name: HomePage,
    component: HomePage,
    meta: {
      requiresAuth: true,
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next('/login');
    } else {
      next();
    }
    next();
  } else {
    if (!localStorage.getItem('token')) {
      next();
    } else {
      next('/');
    }
    next();
  }
});
export default router;
