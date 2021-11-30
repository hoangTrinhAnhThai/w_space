import Vue from 'vue';
import VueRouter from 'vue-router';

import MainPage from '../views/MainPage.vue';
import Calendar from '../views/logtime/Calendar.vue';
import Roadmap from '../views/project/Roadmap.vue';
import Login from '../views/Auth/Login.vue';
import Signup from '../views/Auth/Register.vue';
import ChatRoom from '../views/chat/ChatRoom.vue';
import RoomList from '../views/chatroom/RoomList.vue';
import AddRoom from '../views/chatroom/AddRoom.vue';
import JoinRoom from '../views/chatroom/JoinRoom.vue';

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
        path: '/roadmap/:id',
        name: Roadmap,
        component: Roadmap,
      },
      {
        path: '/roadmap',
        name: Roadmap,
        component: Roadmap,
      },
      {
        path: '/chatroom/:id',
        name: ChatRoom,
        component: ChatRoom,
      },
      {
        path: '/chatroom/',
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
  {
    path: '/roomlist',
    name: 'RoomList',
    component: RoomList,
  },
  {
    path: '/add-room',
    name: 'AddRoom',
    component: AddRoom,
  },
  {
    path: '/join-room/:id',
    name: 'JoinRoom',
    component: JoinRoom,
  },
  {
    path: '/chat-room/:id',
    name: 'ChatRoom',
    component: ChatRoom,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});
export default router;
