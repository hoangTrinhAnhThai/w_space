import Vue from 'vue';

const state = {
  errorMessage: '',
  isLoading: false,
};

const getters = {
  errorMessage(state) {
    return state.errorMessage;
  },
  isLoading(state) {
    return state.isLoading;
  },
};

const mutations = {
  clearErrorMessage(state) {
    state.errorMessage = null;
  },
  setErrorMessage(state, error) {
    if (typeof error == 'object') error = Object.values(error);
    state.errorMessage = error;
    Vue.toasted.error(state.errorMessage, {
      duration: 5000,
    });
  },
  setIsLoading(state, data) {
    state.isLoading = data;
  },
};
const actions = {
  clearErrorMessage({ commit }) {
    commit('clearErrorMessage');
  },
  addIsLoading({ commit }, data) {
    commit('setIsLoading', data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
