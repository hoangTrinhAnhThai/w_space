import http from '../../service/api.js';

import {
  sort,
} from '../../utils/helper';
import io from 'socket.io-client';
const socket = io(`${process.env.VUE_APP_SOCKET_URL}:5000`, {
  transports: ['websocket', 'polling', 'flashsocket'],
});
const state = {
  tasksArray: [],
  statusArray: [],
  currentTask: {},
  comments: [],
  checklist: []
};

const getters = {
  tasksArray(state) {
    return state.tasksArray;
  },
  statusArray(state) {
    return state.statusArray;
  },
  currentTask(state) {
    return state.currentTask;
  },
  comments(state) {
    return state.comments;
  },
  checklist(state) {
    return state.checklist
  }
};

const mutations = {
  setCurrentTask(state, data) {
    state.currentTask = data;
  },

  setTasksArray(state, data) {
    state.tasksArray = [];
    for (let statusItem of state.statusArray) {
      let statusList = { status: {}, tasks: [] };
      statusList.status = statusItem;
      for (let task of data) {
        if (task.status === statusItem._id) {
          statusList.tasks.push(task);
        }
      }
      const statusListFormat = { status: statusList.status, tasks: [] };
      statusListFormat.tasks = sort(statusList.tasks);
      state.tasksArray.push(statusListFormat);
    }
  },
  setStatus(state, data) {
    state.statusArray = data;
  },
  logMess() {
    console.log('success');
  },
  setComments(state, data) {
    state.comments = data;
  },
  setChecklist(state, data) {
    state.checklist = data;
  },
};
const actions = {
  addCurrentTask({ commit }, params) {
    commit('setCurrentTask', params);
  },

  getStatus({ commit }) {
    http
      .get('/status')
      .then((result) => {
        commit('setStatus', result.data.data);
      })
      .catch((err) => {
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },
  getTasks({ commit }, idProject) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.get(`/task/tasksOfProject/${idProject}`).then((result) => {
      commit('setTasksArray', result.data.data);
      commit('ERROR/setIsLoading', false, { root: true });
    });
  },
  addNewTask({ commit, dispatch }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.post(`/task/${params.idProject}`, params.task).then(() => {
      dispatch('getTasks', params.idProject);
      commit('ERROR/setIsLoading', false, { root: true });
    });
  },
  removeCard({ commit }, data) {
    http.put('/task', data).then(() => {
      commit('logMess');
    });
  },

  deleteTask({ commit, dispatch }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.delete(`/${params.idProject}/${params.idTask}`).then(() => {
      dispatch('getTasks', params.idProject);
      commit('ERROR/setIsLoading', false, { root: true });
    });
  },
  editTask({ commit, dispatch }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.put(`/task/${params.idTask}`, params.task).then(() => {
      dispatch('getTasks', params.idProject);
      commit('ERROR/setIsLoading', false, { root: true });
    });
  },

  addComment({ dispatch }, params) {
    http
      .post(`/task/comment/${params.idTask}`, params.comment)
      .then((result) => {
        socket.emit('save-comment', result.data.data);
        dispatch('getCommentByIdTask', params.idTask);
      });
  },
  getCommentByIdTask({ commit, dispatch }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.get(`/task/comment/${params}`).then((result) => {
      commit('setComments', result.data.data);
      commit('ERROR/setIsLoading', false, { root: true });
    });
    socket.on(
      'new-comment',
      function (data) {
        if (data.message.task === params.idTask) {
          dispatch('getCommentByIdTask', params.idTask);
        }
      }.bind(this),
    );
  },
  getChecklistByIdTask({ commit }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.get(`/task/checklist/${params}`).then((result) => {
      commit('setChecklist', result.data.data);
      commit('ERROR/setIsLoading', false, { root: true });
    });
  },
  addChecklist({ commit, dispatch }, params) {
    console.log(params);
    http
      .post(`/task/checklist/${params.idTask}`, params.name)
      .then((result) => {
        console.log(result.data.data);
        dispatch('getChecklistByIdTask', params.idTask);
      })
      .catch((err) => {
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },
  addChecklistItem({ commit, dispatch }, params) {
    http
      .post(`/task/checklistItem/${params.idChecklist}`, params.name)
      .then(() => {
        dispatch('getChecklistByIdTask', params.idTask);
      })
      .catch((err) => {
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },
  deleteChecklist({ commit, dispatch }, params) {
    http.delete(`/task/checklist/${params.idChecklist}`)
      .then(() => {
        dispatch('getChecklistByIdTask', params.idTask);
      })
      .catch((err) => {
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },
  deleteChecklistItem({ commit, dispatch }, params) {
    http.delete(`/task/checklistItem/${params.idChecklistItem}`)
      .then(() => {
        dispatch('getChecklistByIdTask', params.idTask);
      })
      .catch((err) => {
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
