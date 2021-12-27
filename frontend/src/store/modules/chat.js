import http from '../../service/api.js';
import io from 'socket.io-client';
const socket = io(`${process.env.VUE_APP_SOCKET_URL}:4000`, {
  transports: ['websocket', 'polling', 'flashsocket'],
});
const state = {
  rooms: [],
  chats: [],
  currentRoom: {},
};

const getters = {
  rooms(state) {
    return state.rooms;
  },
  chats(state) {
    return state.chats;
  },
  currentRoom(state) {
    return state.currentRoom;
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
  setCurrentRoom(state, data) {
    state.currentRoom = data;
  },
  logMess() {
    console.log('aaa');
  },
};
const actions = {
  getAllRooms({ commit }) {
    commit('ERROR/setIsLoading', true, { root: true })
    http.get('/room').then((response) => {
      commit('setRooms', response.data.data);
      commit('ERROR/setIsLoading', false, { root: true })
    });
  },
  getAllChatByIdRoom({ commit, dispatch }, params) {
    commit('ERROR/setIsLoading', true, { root: true })
    http.get(`/chat/${params}`).then((response) => {
      commit('ERROR/setIsLoading', false, { root: true })
      commit('setChats', response.data.data);
    });
    socket.on(
      'new-message',
      function (data) {
        if (data.message.room === params) {
          dispatch('getAllChatByIdRoom', params);
          dispatch('NOTIFICATION/getAllNotification', params, { root: true });
        }
      }.bind(this),
    );
  },
  addCurrentRoom({ commit }, params) {
    http.get(`/room/${params}`).then((result) => {
      commit('setCurrentRoom', result.data.data);
    });
  },
  sendMessage({ dispatch }, params) {
    http.post(`/chat/`, params.chat).then((response) => {
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
