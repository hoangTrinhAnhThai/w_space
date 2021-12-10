import http from '../../service/api.js';
import router from '../../router/index.js';
import { decodeToken } from '../../utils/helper';

const formatDataUser = function (data) {
  const dataFormat = {
    _id: data._id,
    avatar: data.avatar,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
  };
  return dataFormat;
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
      switch (state.userInfo.roles[0].name) {
        case 'ROLE_AMIN':
          return 'Admin';
        default:
          return 'User';
      }
    }
    return '';
  },
};
const actions = {
  login({ commit }, params) {
    http
      .post('/auth/login', params)
      .then((response) => {
        commit('setUserInfo', response.data.data);
        localStorage.setItem('token', response.data.data.token);
        commit('ERROR/clearErrorMessage', null, { root: true });
        router.go();
      })
      .catch((err) => {
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },
  register({ commit }, params) {
    http
      .post('/auth/register', params, 'Create a new account successfully!')
      .then(() => {
        commit('ERROR/clearErrorMessage', null, { root: true });
        router.push('/login');
      })
      .catch((error) => {
        console.log(error);
        commit('ERROR/setErrorMessage', error.response.data.message, {
          root: true,
        });
      });
  },
  getUserByToken({ commit }) {
    commit('setUserInfo', decodeToken());
    commit('ERROR/clearErrorMessage', null, { root: true });
  },
  logout({ commit }) {
    localStorage.clear();
    commit('setUserInfo', null);
    commit('ERROR/clearErrorMessage', null, { root: true });
    router.go();
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
