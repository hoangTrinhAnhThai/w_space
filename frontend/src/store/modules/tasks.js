// import http from "../../services/api.js"
import initialCards from '../../initialCards.js';
import { sort } from '../../utils/helper';

const state = {
  tasksArray: [],
  taskOfProject: [],
  status: [],
};

const getters = {
  tasksArray(state) {
    return state.tasksArray;
  },
  taskOfProject(state) {
    return state.taskOfProject;
  },
  statusArray(state) {
    return state.tasksArray;
  },
};

const mutations = {
  setTasksArray(state, data) {
    state.tasksArray = data;
  },
  setTaskAsStatus(state, data) {
    state.taskOfProject = [];
    for (let statusItem of data.statusArray) {
      let statusList = { status: {}, tasks: [] };
      for (let task of data.taskArray) {
        if (task.statusId === statusItem._id) {
          statusList.status = statusItem;
          statusList.tasks.push(task);
        }
      }
      const statusListFormat = { status: statusList.status, tasks: [] };
      statusListFormat.tasks = sort(statusList.tasks);
      state.taskOfProject.push(statusListFormat);
    }
    console.log(state.taskOfProject);
  },
  setStatus(state, data) {
    state.status = data;
  },
};
const actions = {
  getTasksArray({ commit }) {
    commit('setTasksArray', initialCards.tasks);
  },
  getStatusArray({ commit }) {
    commit('setStatusArray', initialCards.status);
  },
  getTaskOfProject({ commit }) {
    var taskArray = initialCards.tasks;
    var statusArray = initialCards.status;
    commit('setTaskAsStatus', { taskArray, statusArray });
  },
  getStatus({ commit }) {
    commit('setStatus', initialCards.status);
  },
  updateStatusOfTask({ commit }, data) {
    commit('');
    console.log(data);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
