import http from '../../service/api.js';
import { sort } from '../../utils/helper';

const state = {
  tasksArray: [],
  taskOfProject: [],
  statusArray: [],
  projectArray: [],
  currentProject: '',
  logtimes: '',
  projectEdit: '',
};

const getters = {
  projectArray(state) {
    return state.projectArray;
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
  currentProject(state) {
    return state.currentProject;
  },
  logtimes(state) {
    return state.logtimes;
  },
  projectEdit(state) {
    return state.projectEdit;
  },
};

const mutations = {
  setProject(state, data) {
    state.projectArray = data;
  },
  setProjectEdit(state, data) {
    state.projectEdit = data;
  },
  setTasksArray(state, data) {
    state.tasksArray = data;
  },
  setCurrentProject(state, data) {
    state.currentProject = data;
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
  },
  setLogtimes(state, data) {
    state.logtimes = data;
  },
};
const actions = {
  addCurrentProject({ commit }, project) {
    console.log('current project ', project);
    commit('setCurrentProject', project);
  },
  addProjectEdit({ commit }, params) {
    commit('setProjectEdit', params);
  },
  getLogtimes({ commit }, idTask) {
    http.get(`logtime/task/${idTask}`).then((result) => {
      commit('setLogtimes', result.data.data);
    });
  },
  getStatus({ commit }) {
    http
      .get('project/status')
      .then((result) => {
        commit('setStatus', result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getTaskOfProject({ commit, dispatch }, idProject) {
    http.get(`project/${idProject}`).then((result) => {
      commit('setTasksArray', result.data.data.tasks);
      dispatch('getStatus').then(() => {
        commit('setTaskAsStatus');
      });
    });
  },
  getProject({ commit }) {
    http
      .get('project')
      .then((result) => {
        commit('setProject', result.data.data);
        console.log('project', result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  addProject({ dispatch }, params) {
    http
      .post('project', params)
      .then((result) => {
        dispatch('addProjectEdit', result.data.data);
        console.log(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  addNewTask({ dispatch }, params) {
    console.log(params.task);
    http
      .post(`project/${params.idProject}/task`, params.task)
      .then((result) => {
        console.log(result);
        dispatch('getTaskOfProject', params.idProject);
      });
  },
  removeCard({ commit }, data) {
    console.log(data);
    http.post('project/task', data).then((result) => {
      console.log(result);
      commit('logMess');
    });
  },
  deleteProject({ dispatch }, idProject) {
    http.delete(`project/${idProject}`).then((result) => {
      console.log('deletePr', result);
      dispatch('getProject');
    });
  },
  editProject({ commit, dispatch }, params) {
    http
      .put(`project/${params.idProject}`, params.project)
      .then((result) => {
        commit('setProjectEdit', result.data.data);
        dispatch('getProject');
        console.log(result);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },
  deleteTask({ dispatch }, params) {
    http
      .delete(`project/${params.idProject}/${params.idTask}`)
      .then((result) => {
        console.log(result);
        dispatch('getTaskOfProject', params.idProject);
      });
  },
  editTask({ dispatch }, params) {
    http.put(`project/task/${params.idTask}`, params.task).then((result) => {
      console.log('edit', result);
      dispatch('getTaskOfProject', params.idProject);
    });
  },
  removeMember({ commit, dispatch }, params) {
    http
      .put(`project/${params.idProject}/member`, params.project)
      .then((result) => {
        commit('setProjectEdit', result.data.data);
        dispatch('getProject');
        console.log(result);
      })
      .catch((err) => {
        console.log(err.response.data.message);
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
