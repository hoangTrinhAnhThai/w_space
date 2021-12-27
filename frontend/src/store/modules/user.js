import http from '../../service/api.js';
const state = {
  userInfo: null,
  memberInfor: null,
};

const getters = {
  userInfo(state) {
    return state.userInfo;
  },
  memberInfor(state) {
    return state.memberInfor;
  },
};
const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  setMemberInfor(state, userInfo) {
    state.memberInfor = userInfo;
  },
};
const actions = {
  searchMember({ commit }, params) {
    http
      .post('/user', params)
      .then((result) => {
        commit('setMemberInfor', result.data.data);
      })
      .catch((err) => {
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },
  removeMemberInfor({ commit }, params) {
    commit('setMemberInfor', params);
  },
  editUser({ dispatch }, params) {
    http.put(`/user/${params.id}`, params.user).then(() => {
      dispatch('ADMIN/getAllUsers', null, { root: true });
    });
  },
  getUser({ commit }, params) {
    http.get(`/user/${params}`).then((response) => {
      commit('setUserInfo', response.data.data);
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
