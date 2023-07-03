import http from '../../service/api.js';

const formatDataListByMonth = function (data) {
  let list = [];
  let listData = data;
  for (let i = 0; i < 12; i++) {
    let listItem = listData.filter(
      (item) => new Date(item.createdAt).getMonth() == i,
    );
    list.push(listItem.length);
  }
  return list;
};

const state = {
  userList: [],
  userListMonth: [],
  allProjects: [],
  allProjectsList: [],
  projectList: [],
  allUserList: [],
  numberOfRegisteredUsersToday: 0,
  numberOfRegisteredUsersYesterday: 0,
  numberOfRegisteredProjectsToday: 0,
  numberOfRegisteredProjectsYesterday: 0,
  numberOfRegisteredUsersThisMonth: 0,
  numberOfRegisteredUsersLastMonth: 0,
  numberOfRegisteredProjectsThisMonth: 0,
  numberOfRegisteredProjectsLastMonth: 0,
};

const mutations = {
  setUserList(state, data) {
    state.userList = data;
  },
  setAllUserList(state, data) {
    state.allUserList = data;
  },
  setUserListMonth(state, userListMonth) {
    state.userListMonth = formatDataListByMonth(userListMonth);
  },
  setProjectList(state, data) {
    state.projectList = formatDataListByMonth(data);
  },
  setRegisteredUserMonth(state) {
    state.numberOfRegisteredUsersThisMonth =
      state.userListMonth[new Date().getMonth()];
    state.numberOfRegisteredUsersLastMonth =
      state.userListMonth[new Date().getMonth() - 1];
  },
  setRegisteredProjectMonth(state) {
    state.numberOfRegisteredProjectsThisMonth =
      state.projectList[new Date().getMonth()];
    state.numberOfRegisteredProjectsLastMonth =
      state.projectList[new Date().getMonth() - 1];
  },
  setRegisteredUserDate(state, data) {
    let list = data.filter(
      (user) =>
        user.createdAt.split('T')[0] == new Date().toISOString().split('T')[0],
    );
    state.numberOfRegisteredUsersToday = list.length;
    let list2 = data.filter(
      (user) =>
        user.createdAt.split('T')[0] ==
        new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
    );
    state.numberOfRegisteredUsersYesterday = list2.length;
  },
  setRegisteredProjectDate(state, data) {
    let list = data.filter(
      (user) =>
        user.createdAt.split('T')[0] == new Date().toISOString().split('T')[0],
    );
    state.numberOfRegisteredProjectsToday = list.length;
    let list2 = data.filter(
      (user) =>
        user.createdAt.split('T')[0] ==
        new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
    );
    state.numberOfRegisteredProjectsYesterday = list2.length;
  },
  setAllProjects(state, data) {
    state.allProjects = data
  },
  setAllProjectsList(state, data) {
    state.allProjectsList = data
  }

};
const getters = {
  allProjects(state) {
    return state.allProjects
  },
  allProjectsList(state) {
    return state.allProjectsList
  },
  userList(state) {
    return state.userList;
  },
  allUserList(state) {
    return state.allUserList
  },
  userListMonth(state) {
    return state.userListMonth;
  },
  projectList(state) {
    return state.projectList;
  },
  numberOfRegisteredUsersToday(state) {
    return state.numberOfRegisteredUsersToday;
  },
  numberOfRegisteredUsersYesterday(state) {
    return state.numberOfRegisteredUsersYesterday;
  },
  numberOfRegisteredProjectsToday(state) {
    return state.numberOfRegisteredProjectsToday;
  },
  numberOfRegisteredProjectsYesterday(state) {
    return state.numberOfRegisteredProjectsYesterday;
  },
  numberOfRegisteredUsersThisMonth(state) {
    return state.numberOfRegisteredUsersThisMonth;
  },
  numberOfRegisteredUsersLastMonth(state) {
    return state.numberOfRegisteredUsersLastMonth;
  },
  numberOfRegisteredProjectsThisMonth(state) {
    return state.numberOfRegisteredProjectsThisMonth;
  },
  numberOfRegisteredProjectsLastMonth(state) {
    return state.numberOfRegisteredProjectsLastMonth;
  },
};
const actions = {
  getAllUsersList({commit}) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.get('/admin/users')
    .then((response) => {
      commit('setAllUserList', response.data.data);
      commit('ERROR/setIsLoading', false, { root: true });
    })
  },
  getAllUsers({ commit }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http
      .post('/admin/users', params)
      .then((response) => {
        commit('setUserList', response.data.data);
        commit('setUserListMonth', response.data.data);
        commit('setRegisteredUserMonth');
        commit('setRegisteredUserDate', response.data.data);
        commit('ERROR/setIsLoading', false, { root: true });
      })
      .catch((err) => {
        commit('ERROR/setIsLoading', false, { root: true });
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },
  getAllProjectsList({commit}) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.get('/admin/projects')
    .then((response) => {
      commit('setAllProjectsList', response.data.data);
      commit('ERROR/setIsLoading', false, { root: true });

    })
  },
  getAllProjects({ commit }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http
      .post('/admin/projects', params)
      .then((response) => {
        commit('setAllProjects', response.data.data);
        commit('setProjectList', response.data.data);
        commit('setRegisteredProjectMonth');
        commit('setRegisteredProjectDate', response.data.data);
        commit('ERROR/setIsLoading', false, { root: true });
      })
      .catch((err) => {
        commit('ERROR/setIsLoading', false, { root: true });
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },
  editUser({ commit, dispatch }, params) {
    http.put(`/user/${params.id}`, params.user).then(() => {
      dispatch('getAllUsersList');
      commit('ERROR/setIsLoading', false, { root: true });

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
