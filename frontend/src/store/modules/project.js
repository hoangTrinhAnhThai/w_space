import http from '../../service/api.js';
import { sort } from '../../utils/helper';
import io from 'socket.io-client';
const socket = io('http://localhost:5000', {
  transports: ['websocket', 'polling', 'flashsocket'],
});
const state = {
  tasksArray: [],
  taskOfProject: [],
  statusArray: [],
  projectArray: [],
  currentProject: '',
  logtimes: '',
  projectEdit: '',
  currentTask: {},
  comments: [],
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
  currentTask(state) {
    return state.currentTask;
  },
  comments(state) {
    return state.comments;
  },
};
// const formatDataProject = function(data) {
//   const dataFormat = data.map(dataItem => (
//     {
//       _id: dataItem._id,
//       createdAt: dataItem.createdAt,
//       createdBy: dataItem.createdBy,
//       members: dataItem.members,
//       name: dataItem.name,
//       room: dataItem.room,
//       updatedAt: dataItem.updatedAt,
//       tasks: dataItem.tasks.map(task => (
//         {
//           createdAt: task.createdAt,
//           description: task.description,
//           dueDate: task.dueDate ? task.dueDate : "Hello",
//           moved: task.moved,
//           name: task.name,
//           priority: task.priority,
//           status: task.status,
//           updatedAt: task.updatedAt,
//           _id: task._id
//         }
//       ))
//     }))
//   return dataFormat;
// }
const mutations = {
  setCurrentTask(state, data) {
    state.currentTask = data;
  },
  setProject(state, data) {
    // state.projectArray = formatDataProject(data);
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
  setComments(state, data) {
    state.comments = data;
  },
};
const actions = {
  addCurrentProject({ commit }, project) {
    if (typeof project == typeof 'String') {
      http.get(`project/${project}`).then((result) => {
        commit('setCurrentProject', result.data.data);
      });
    } else {
      commit('setCurrentProject', project);
    }
  },
  addCurrentTask({ commit }, params) {
    commit('setCurrentTask', params);
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
      .get('status')
      .then((result) => {
        commit('setStatus', result.data.data);
      })
      .catch((err) => {
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },

  getTaskOfProject({ commit }, idProject) {
    http.get(`project/${idProject}`).then((result) => {
      commit('setTasksArray', result.data.data.tasks);
      commit('setTaskAsStatus');
    });
  },
  getProject({ commit }) {
    http
      .get('project')
      .then((result) => {
        commit('setProject', result.data.data);
      })
      .catch((err) => {
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },
  addProject({ commit, dispatch }, params) {
    http
      .post('project', params)
      .then((result) => {
        dispatch('addProjectEdit', result.data.data);
        dispatch('getProject');
        dispatch('CHAT/getAllRooms', null, { root: true });
      })
      .catch((err) => {
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },
  addNewTask({ dispatch }, params) {
    http.post(`project/${params.idProject}/task`, params.task).then(() => {
      dispatch('getTaskOfProject', params.idProject);
    });
  },
  removeCard({ commit }, data) {
    http.post('project/task', data).then(() => {
      commit('logMess');
    });
  },
  deleteProject({ dispatch }, idProject) {
    http.delete(`project/${idProject}`).then(() => {
      dispatch('getProject');
    });
  },
  editProject({ commit, dispatch }, params) {
    http
      .put(`project/${params.idProject}`, params.project)
      .then((result) => {
        commit('setProjectEdit', result.data.data);
        dispatch('getProject');
      })
      .catch((err) => {
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },
  deleteTask({ dispatch }, params) {
    http.delete(`project/${params.idProject}/${params.idTask}`).then(() => {
      dispatch('getTaskOfProject', params.idProject);
    });
  },
  editTask({ dispatch }, params) {
    http.put(`project/task/${params.idTask}`, params.task).then(() => {
      dispatch('getTaskOfProject', params.idProject);
    });
  },
  removeMember({ commit, dispatch }, params) {
    http
      .put(`project/${params.idProject}/member/remove`, params.project)
      .then((result) => {
        commit('setProjectEdit', result.data.data);
        dispatch('getProject');
      })
      .catch((err) => {
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },
  addMember({ commit, dispatch }, params) {
    http
      .put(`project/${params.idProject}/member/add`, params.project)
      .then((result) => {
        commit('setProjectEdit', result.data.data);
        dispatch('getProject');
      })
      .catch((err) => {
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },
  addComment({ dispatch }, params) {
    http
      .post(`project/task/${params.idTask}/comment`, params.comment)
      .then((result) => {
        socket.emit('save-comment', result.data.data);
        dispatch('getCommentByIdTask', params.idTask);
      });
  },
  getCommentByIdTask({ commit, dispatch }, params) {
    http.get(`project/task/${params}/comment`).then((result) => {
      commit('setComments', result.data.data);
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
