import http from '../../service/api.js';
import io from 'socket.io-client';

const socket = io('http://localhost:4000', {
  transports: ['websocket', 'polling', 'flashsocket'],
});
const state = {
  rooms: [],
  chats: [],
};

const getters = {
  rooms(state) {
    return state.rooms;
  },
  chats(state) {
    return state.chats;
  },
};
const mutations = {
  setRooms(state, data) {
    state.rooms = data;
  },
  setChats(state, data) {
    state.chats = data;
  },
  addMessage(state, data) {
    state.chats.push(data);
  },
  logMess() {
    console.log('aaa');
  },
};
const actions = {
  getAllRooms({ commit }) {
    http.get('room').then((response) => {
      commit('setRooms', response.data.data);
    });
  },
  getAllChatByIdRoom({ commit, dispatch }, params) {
    http.get(`chat/${params}`).then((response) => {
      commit('setChats', response.data.data);
    });
    socket.on(
      'new-message',
      function (data) {
        if (data.message.room === params) {
          dispatch('getAllChatByIdRoom', params);
        }
      }.bind(this),
    );
  },
  sendMessage({ dispatch }, params) {
    http.post(`chat/`, params.chat).then((response) => {
      socket.emit('save-message', response.data.data);
      dispatch('getAllChatByIdRoom', params.idRoom);
    });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
