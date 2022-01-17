import http from '../../service/api.js';
import io from 'socket.io-client';
const socket = io(`${process.env.VUE_APP_SOCKET_URL}:4000`, {
  transports: ['websocket', 'polling', 'flashsocket'],
});


function pdfBlobConversion(b64Data, contentType) {
  contentType = contentType || '';
  var sliceSize = 512;
  b64Data = b64Data.replace(/^[^,]+,/, '');
  b64Data = b64Data.replace(/\s/g, '');
  var byteCharacters = window.atob(b64Data);
  var byteArrays = [];

  for ( var offset = 0; offset < byteCharacters.length; offset = offset + sliceSize ) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

const state = {
  rooms: [],
  chats: [],
  currentRoom: {},
  file: null
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
  file(state) {
    return state.file
  }
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
  },
  setFile(state, data) {
    state.file = data
  }
};
const actions = {
  getAllRooms({ commit }) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.get('/room').then((response) => {
      commit('setRooms', response.data.data);
      commit('ERROR/setIsLoading', false, { root: true });
    });
  },
  getAllChatByIdRoom({ commit, dispatch }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.get(`/chat/${params}`).then((response) => {
      commit('ERROR/setIsLoading', false, { root: true });
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
      console.log(response.data.data);
      socket.emit('save-message', response.data.data);
      dispatch('getAllChatByIdRoom', params.idRoom);
    });
  },
  uploadFile({ dispatch }, params) {
    http.post(`/chat/upload/${params.idRoom}`, params.file).then((response) => {
      console.log(response.data.data);
      socket.emit('save-message', response.data.data);
      dispatch('getAllChatByIdRoom', params.idRoom);
    });
  },

  downloadFile({commit}, params) {
    http
      .post(`/chat/download/${params}`,)
      .then(response => {
        commit('logMess')
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(pdfBlobConversion(response.data.data, response.data.type))
        let arr = params.split("-");
        arr.pop();
        link.download = arr.join('-')
        link.click()

      })
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
