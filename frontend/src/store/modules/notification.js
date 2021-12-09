import http from '../../service/api.js';
import store from './auth';
const state = {
  notifications: [],
};
const formatDataProject = function (data) {
  const dataFormat = data.map((dataItem) => ({
    _id: dataItem._id,
    room: dataItem.room,
    project: dataItem.project,
    listContent: dataItem.listContent.filter(
      (notification) => notification.member == store.state.userInfo._id,
    ),
  }));
  return dataFormat;
};
const getters = {
  notifications(state) {
    return state.notifications;
  },
};
const mutations = {
  logMess() {
    console.log('success');
  },
  setNotifications(state, data) {
    state.notifications = formatDataProject(data);
  },
};

const actions = {
  getAllNotification({ commit }) {
    http
      .get('notification')
      .then((result) => {
        commit('setNotifications', result.data.data);
      })
      .catch((err) => {
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },
  removeUnreadNotification({ commit, dispatch }, params) {
    http
      .put(`notification/${params}`, null)
      .then((result) => {
        console.log(result);
        dispatch('getAllNotification');
      })
      .catch((err) => {
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
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
