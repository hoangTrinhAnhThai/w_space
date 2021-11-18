import http from '../../service/api.js';
import { sort } from '../../utils/helper';

const state = {
  tasksArray: [],
  taskOfProject: [],
  statusArray: [],
  projectArray: [],
  idProject: ''
};

const getters = {
  projectArray(state) {
    return state.projectArray
  },
  tasksArray(state) {
    return state.tasksArray;
  },
  taskOfProject(state) {
    return state.taskOfProject;
  },
  statusArray(state) {
    return state.statusArray;
  },
  idProject(state) {
    return state.idProject;
  },
};

const mutations = {
  setProject(state, data) {
    state.projectArray = data
  },

  setTasksArray(state, data) {
    state.tasksArray = data;
  },
  setIdProject(state, data) {
    state.idProject = data
  },
  setTaskAsStatus(state) {
    state.taskOfProject = [];
    for (let statusItem of state.statusArray) {
      let statusList = { status: {}, tasks: [] };
      statusList.status = statusItem;
      for (let task of state.tasksArray) {
        if (task.status === statusItem._id) {
          statusList.tasks.push(task);
        }
      }
      const statusListFormat = { status: statusList.status, tasks: [] };
      statusListFormat.tasks = sort(statusList.tasks);
      state.taskOfProject.push(statusListFormat);
    }
    console.log('last project', state.taskOfProject);
  },
  setStatus(state, data) {
    state.statusArray = data;
  },
  logMess() {
    console.log('success');
  }
};
const actions = {

  getStatus({ commit }) {
    http.get('project/status').then((result) => {
      commit('setStatus', result.data.data)
    }).catch((error) => {
      console.log(error);
    })
  },
  
  getTaskOfProject({ commit, dispatch }, idProject) {
    commit('setIdProject', idProject)
    http.get(`project/${idProject}`).then((result) => {
      commit('setTasksArray', result.data.data.tasks)
      dispatch('getStatus').then(() => {
        commit('setTaskAsStatus');
      })
    })
  },
  getProject({ commit }) {
    console.log('a');
    http.get('project').then((result) => {
      commit('setProject', result.data.data)
      console.log('project', result.data.data);
    }).catch((error) => {
      console.log(error);
    })
  },
  createProject({ commit }, params) {
    http.post('/project', params).then((result) => {
      commit('')
      console.log(result);
    }).catch((error) => {
      console.log(error);
    })
  },
  addNewTask({ dispatch }, params) {
    http.post(`project/${params.idProject}/task`, params.task).then((result) => {
      console.log(result);
      dispatch('getTaskOfProject', params.idProject)
    })
  },
  removeCard({ commit }, data) {
    http.post('project/task', data).then((result) => {
      console.log(result);
      commit('logMess')
    })
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
