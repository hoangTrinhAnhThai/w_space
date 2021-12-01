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
};

const actions = {
  getAllLogtime({ commit }) {
    commit('setLogtimeArray', []);
    http.get('logtime').then((result) => {
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
    http.post(`logtime/${params}`).then((result) => {
      commit('setLogtimeArray', result.data.data);
      for (let logtime of result.data.data) {
        if (logtime.isPlaying == true) {
          commit('setLogtimeIsPlaying', logtime);
        }
      }
    });
  },
  deteleLogtime({ dispatch }, params) {
    http.delete(`logtime/${params}`).then(() => {
      dispatch('getAllLogtime');
    });
  },
  createLogtime({ dispatch }, params) {
    http.post('logtime', params).then(() => {
      dispatch('getAllLogtime');
    });
  },
  updateLogtime({ dispatch }, params) {
    http.put(`logtime/${params._id}`, params.logtime).then(() => {
      dispatch('getAllLogtime');
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
