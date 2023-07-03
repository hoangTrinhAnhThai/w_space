import http from '../../service/api.js';
import router from '../../router/index.js';
import { decodeToken } from '../../utils/helper';

const formatDataUser = function (data) {
  if (data) {
    const dataFormat = {
      _id: data._id,
      avatar: data.avatar,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
    };
    return dataFormat;
  }
  return data;
};

const state = {
  userInfo: null,
};

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = formatDataUser(userInfo);
  },
};
const getters = {
  userInfo(state) {
    return state.userInfo;
  },
  userRole() {
    if (state.userInfo) {
      switch (state.userInfo.role) {
        case 'Admin':
          return 'Admin';
        default:
          return 'User';
      }
    }
    return '';
  },
};
const actions = {
  login({ commit, dispatch }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http
      .post('/auth/login', params)
      .then((response) => {
        localStorage.setItem('token', response.data.data);
        dispatch('getUserByToken');
        commit('ERROR/setIsLoading', false, { root: true });
        router.go();
      })
      .catch((err) => {
        commit('ERROR/setIsLoading', false, { root: true });
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },
  register({ commit }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http
      .post('/auth/register', params, 'Create a new account successfully!')
      .then(() => {
        commit('ERROR/clearErrorMessage', null, { root: true });
        commit('ERROR/setIsLoading', false, { root: true });
        router.push('/login');
      })
      .catch((error) => {
        commit('ERROR/setIsLoading', false, { root: true });
        commit('ERROR/setErrorMessage', error.response.data.data[0].msg, {
          root: true,
        });
      });
  },
  getUserByToken({ commit }) {
    commit('setUserInfo', decodeToken());
    commit('ERROR/clearErrorMessage', null, { root: true });
  },
  logout({ commit }) {
    commit('ERROR/setIsLoading', true, { root: true });
    localStorage.clear();
    commit('setUserInfo', null);
    commit('ERROR/clearErrorMessage', null, { root: true });

    router.go();
    commit('ERROR/setIsLoading', false, { root: true });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
