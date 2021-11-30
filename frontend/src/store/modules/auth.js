import http from '../../service/api.js';
import router from '../../router/index.js';
const state = {
  userInfo: null,
};

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
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
      .post('auth/login', params)
      .then((response) => {
        commit('setUserInfo', response.data.data);
        console.log(response.data);
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
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
      .post('auth/register', params, 'Create a new account successfully!')
      .then((response) => {
        console.log('get user', response);
        commit('ERROR/clearErrorMessage', null, { root: true });
        router.push('/login');
      })
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, {
          root: true,
        });
      });
  },
  getUserByToken({ commit }) {
    http
      .get('auth/')
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data.data));
        commit('setUserInfo', response.data.data);
        commit('ERROR/clearErrorMessage', null, { root: true });
      })
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, {
          root: true,
        });
        console.log(error.response.data.message);
      });
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
