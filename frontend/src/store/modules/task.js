import http from '../../service/api.js';

import {
  sort,
} from '../../utils/helper';
import io from 'socket.io-client';
const socket = io(`${process.env.VUE_APP_SOCKET_URL}:8000`, {
  transports: ['websocket', 'polling', 'flashsocket'],
});
const state = {
  taskList: [],
  tasksArray: [],
  statusArray: [],
  currentTask: {},
  comments: [],
  checklist: [],
  allChecklist: [],
};

const getters = {
  taskList(state) {
    return state.taskList
  },
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
  },
  allChecklist(state) {
    return state.allChecklist
  }
};

const mutations = {
  setCurrentTask(state, data) {
    state.currentTask = data;
  },
  setTasks(state, data) {
    state.taskList = data
  },
  setTasksArray(state, data) {
    state.tasksArray = [];
    for (let statusItem of state.statusArray) {
      let statusList = { status: {}, tasks: [] };
      statusList.status = statusItem;
      for (let task of data) {
        if (task.status._id === statusItem._id) {
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
  setAllChecklist(state, data) {
    state.allChecklist = data;
  },
  setChecklist(state, data) {
    state.checklist = data;
  },
  setChecklistItemEdit(state, data) {
    let list = state.checklist
    for (let checklist of list) {
      if (checklist.task == data.idTask) {
        for (let item of checklist.items) {
          if (item._id == data.idChecklistItem) {
            item.isDone = data.isDone.isDone
            break
          }
        }
        break
      }
    }
    state.checklist = list
  }
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
      commit('setTasks', result.data.data);
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
    http.delete(`/task/${params.idProject}/${params.idTask}`).then(() => {
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
  getAllChecklist({ commit }) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.get(`/task/checklists/`).then((result) => {
      console.log(result.data.data);
      commit('setAllChecklist', result.data.data);
      commit('ERROR/setIsLoading', false, { root: true });
    });
  },
  getChecklistByIdTask({ commit }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.get(`/task/checklist/${params}`).then((result) => {
      commit('setChecklist', result.data.data);
      commit('ERROR/setIsLoading', false, { root: true });
    });
  },
  addChecklist({ commit, dispatch }, params) {
    http
      .post(`/task/checklist/${params.idTask}`, params.name)
      .then((result) => {
        console.log(result.data.data);
        dispatch('getChecklistByIdTask', params.idTask);
        dispatch('getAllChecklist');
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
        dispatch('getAllChecklist');
      })
      .catch((err) => {
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },
  editChecklistItem({ commit, dispatch }, params) {
    http
      .put(`/task/checklistItem/${params.idChecklistItem}`, params.isDone)
      .then(() => {
        dispatch('getChecklistByIdTask', params.idTask);
        dispatch('getAllChecklist');
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