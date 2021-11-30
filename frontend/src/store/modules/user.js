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
    state.userInfo = userInfo;
  },
};
const actions = {
  searchMember({ commit }, params) {
    console.log('email', params);
    http
      .post('user', params)
      .then((result) => {
        console.log('user', result.data.data);
        commit('setMemberInfor', result.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },
  removeMemberInfor({ commit }, params) {
    commit('setMemberInfor', params);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
