import Vue from 'vue';
import VueRouter from 'vue-router';

import MainPage from '../views/MainPage.vue';
import HomePage from '../views/HomePage.vue';

import Profile from '../views/Profile.vue';
import Calendar from '../views/logtime/Calendar.vue';
// import Roadmap from '../views/project/Roadmap.vue';
// import Roadmap from '../views/project/TaskViewForRoadmap.vue';
import Roadmap from '../views/project/ProjectMainPage.vue';

import ProjectPage from '../views/project/ProjectPage.vue';
import Login from '../views/Auth/Login.vue';
import Signup from '../views/Auth/Register.vue';
import ChatPage from '../views/chat/ChatPage.vue';
import ChatRoom from '../views/chat/ChatRoom.vue';
// import AdminMainPage from '../views/admin/MainPage.vue';
import Admin from '../views/admin/AdminPage.vue';
import UserManagement from '../views/admin/UserManagement.vue';

import { decodeToken } from '../utils/helper';
Vue.use(VueRouter);
const routes = [
  {
    path: '/mainpage',
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
        path: '/roadmap',
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
      {
        path: '/admin',
        name: Admin,
        component: Admin,
        meta: {
          admin_system: true,
        },
      },
      {
        path: '/usermanagement',
        name: UserManagement,
        component: UserManagement,
        meta: {
          admin_system: true,
        },
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
    path: '/',
    name: HomePage,
    component: HomePage,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  let user = decodeToken();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next('/login');
    }
    if (to.matched.some((record) => record.meta.admin_system)) {
      if (user.role != 'Admin') {
        next('/roadmap');
      }
    } else {
      if (
        user.role == 'Admin' &&
        to.matched.some((record) => record.name != 'Profile')
      ) {
        next('/admin');
      } else if (
        user.role == 'Admin' &&
        to.matched.some((record) => record.name == 'Profile')
      ) {
        next('/profile');
      }
    }
    next();
  } else {
    if (!token) {
      next();
    } else {
      if (user.role != 'Admin') {
        next('/roadmap');
      } else {
        next('/admin');
      }
    }
    next();
  }
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!localStorage.getItem('token')) {
//       next('/home');
//     } else {
//       next();
//     }
//     next();
//   } else {
//     if (!localStorage.getItem('token')) {
//       next();
//     } else {
//       next('/roadmap');
//     }
//     next();
//   }
// });
export default router;
