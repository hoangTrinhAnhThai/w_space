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
    console.log(idProject);
    commit('ERROR/setIsLoading', true, { root: true });
    http.get(`/task/${idProject}`).then((result) => {
      console.log(result.data.data);
      commit('setTasksArray', result.data.data);
      commit('ERROR/setIsLoading', false, { root: true });
    });
  },
  addNewTask({ commit, dispatch }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.post(`/project/${params.idProject}/task`, params.task).then(() => {
      dispatch('getTasks', params.idProject);
      commit('ERROR/setIsLoading', false, { root: true });
    });
  },
  removeCard({ commit }, data) {
    http.post('/project/task', data).then(() => {
      commit('logMess');
    });
  },

  addChecklist({ commit, dispatch }, params) {
    console.log(params.name);
    http
      .put(`/project/task/checklist/${params.idTask}`, params.name)
      .then((result) => {
        console.log(result.data.data);
        dispatch('getTasks', params.idProject);
      })
      .catch((err) => {
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },
  deleteTask({ commit, dispatch }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.delete(`/project/${params.idProject}/${params.idTask}`).then(() => {
      dispatch('getTasks', params.idProject);
      commit('ERROR/setIsLoading', false, { root: true });
    });
  },
  editTask({ commit, dispatch }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.put(`/project/task/${params.idTask}`, params.task).then(() => {
      dispatch('getTasks', params.idProject);
      commit('ERROR/setIsLoading', false, { root: true });
    });
  },

  addComment({ dispatch }, params) {
    http
      .post(`/project/task/${params.idTask}/comment`, params.comment)
      .then((result) => {
        socket.emit('save-comment', result.data.data);
        dispatch('getCommentByIdTask', params.idTask);
      });
  },
  getCommentByIdTask({ commit, dispatch }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.get(`/project/task/${params}/comment`).then((result) => {
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
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
