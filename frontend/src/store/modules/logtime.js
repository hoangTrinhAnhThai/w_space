import http from '../../service/api.js';
const state = {
  timeStart: '',
  realtime: '',
  timeStop: '',
  logtimeArray: [],
  logtimeIsPlaying: {},
};

const getters = {
  timeStart(state) {
    return state.timeStart;
  },
  realtime(state) {
    return state.realtime;
  },
  timeStop(state) {
    return state.timeStop;
  },
  logtimeArray(state) {
    return state.logtimeArray;
  },
  logtimeIsPlaying(state) {
    return state.logtimeIsPlaying;
  },
};
const mutations = {
  logMess() {
    console.log('success');
  },
  setStartTime(state, data) {
    state.timeStart = data;
  },
  setRealTime(state, data) {
    state.realtime = data;
  },
  setStopTime(state, data) {
    state.timeStop = data;
  },
  setLogtimeArray(state, data) {
    state.logtimeArray = data;
  },
  setLogtimeIsPlaying(state, data) {
    state.logtimeIsPlaying = data;
  },
  addLogtime(state, data) {
    state.logtimeArray.unshift(data)
    for (let logtime of state.logtimeArray) {
      if (logtime.isPlaying == true) {
        state.logtimeIsPlaying = logtime
        break
      }
    }
  },
  updateLogtime(state, data) {
    let list = state.logtimeArray
    for(let i = 0; i < list.length; i++) {
      if(list[i]._id === data._id) {
        list.splice(i, 1, data)
        break
      }
    }
    state.logtimeArray = list
    for (let logtime of list) {
      if (logtime.isPlaying == true) {
        state.logtimeIsPlaying = logtime
        break
      }
    }
  },
  deleteLogtime(state, data) {
    let list = state.logtimeArray
    for(let i = 0; i < list.length; i++) {
      if(list[i]._id === data) {
        list.splice(i, 1)
        break
      }
    }
  }
};

const actions = {
  getAllLogtime({ commit }) {
    commit('setLogtimeArray', []);
    http.get('/logtime').then((result) => {
      console.log(result.data.data);
      commit('setLogtimeArray', result.data.data);
      for (let logtime of result.data.data) {
        if (logtime.isPlaying == true) {
          commit('setLogtimeIsPlaying', logtime);
        }
      }
    });
  },
  getAllLogtimeByDate({ commit }, params) {
    commit('setLogtimeArray', []);
    http.post(`/logtime/${params}`).then((result) => {
      commit('setLogtimeArray', result.data.data);
      for (let logtime of result.data.data) {
        if (logtime.isPlaying == true) {
          commit('setLogtimeIsPlaying', logtime);
        }
      }
    });
  },
  deteleLogtime({ commit }, params) {
    http.delete(`/logtime/${params}`).then(() => {
      commit('deleteLogtime', params)
    });
  },
  createLogtime({ commit }, params) {
    http.post('/logtime', params).then((result) => {
      commit('addLogtime', result.data.data)
      // dispatch('getAllLogtime');
    });
  },
  updateLogtime({ commit }, params) {
    http.put(`/logtime/${params._id}`, params.logtime).then((result) => {
      console.log(params);
      console.log(result);
      commit('updateLogtime', result.data.data)
      // dispatch('getAllLogtime');
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
