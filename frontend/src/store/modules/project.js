import http from '../../service/api.js';

import {
  sort,
  sortLeaderProjects,
  sortMemberProjects,
} from '../../utils/helper';
const state = {
  tasksArray: [],
  taskOfProject: [],
  statusArray: [],
  projectsOfLeader: [],
  projectsOfMember: [],
  currentProject: '',
  logtimes: '',
  projectEdit: '',
  currentTask: {},
  backgrounds: [],
};

const getters = {
  projectsOfLeader(state) {
    return state.projectsOfLeader;
  },
  projectsOfMember(state) {
    return state.projectsOfMember;
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
  backgrounds(state) {
    return state.backgrounds;
  },
};

const formatDataProject = function (data) {
  const dataFormat = data.map((dataItem) => ({
    _id: dataItem._id,
    createdAt: dataItem.createdAt,
    background: dataItem.background,
    createdBy: {
      _id: dataItem.createdBy._id,
      avatar: dataItem.createdBy.avatar,
      email: dataItem.createdBy.email,
      firstName: dataItem.createdBy.firstName,
      lastName: dataItem.createdBy.lastName,
    },
    members: dataItem.members.map((member) => ({
      _id: member._id,
      avatar: member.avatar,
      email: member.email,
      firstName: member.firstName,
      lastName: member.lastName,
    })),
    name: dataItem.name,
    room: dataItem.room,
    tasks: dataItem.tasks.map((task) => ({
      description: task.description,
      dueDate: task.dueDate,
      moved: task.moved,
      name: task.name,
      priority: task.priority,
      status: task.status,
      assigned: task.assigned,
      _id: task._id,
    })),
  }));
  return dataFormat;
};
const mutations = {
  setCurrentTask(state, data) {
    state.currentTask = data;
  },
  setProjectsOfLeader(state, data) {
    let listData = formatDataProject(data);
    state.projectsOfLeader = sortLeaderProjects(listData);
  },
  setProjectOfMember(state, data) {
    let listData = formatDataProject(data);
    state.projectsOfMember = sortMemberProjects(listData);
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
  setBackgroundList(state, data) {
    state.backgrounds = data;
  },
};
const actions = {
  addCurrentProject({ commit }, project) {
    if (typeof project == typeof 'String') {
      http.get(`/project/${project}`).then((result) => {
        commit('setCurrentProject', result.data.data);
      });
    } else {
      commit('setCurrentProject', project);
    }
  },
  addProjectEdit({ commit }, params) {
    commit('setProjectEdit', params);
  },
  getLogtimes({ commit }, idTask) {
    http.get(`/logtime/task/${idTask}`).then((result) => {
      commit('setLogtimes', result.data.data);
    });
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

  getProject({ commit }) {
    commit('ERROR/setIsLoading', true, { root: true });
    http
      .get('/project')
      .then((result) => {
        commit('setProjectsOfLeader', result.data.data);
        commit('setProjectOfMember', result.data.data);
        commit('ERROR/setIsLoading', false, { root: true });
      })
      .catch((err) => {
        commit('ERROR/setIsLoading', false, { root: true });
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },
  addProject({ commit, dispatch }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http
      .post('/project', params, 'Add project successfully')
      .then((result) => {
        dispatch('addProjectEdit', result.data.data);
        dispatch('getProject');
        dispatch('CHAT/getAllRooms', null, { root: true });
        commit('ERROR/setIsLoading', false, { root: true });
      })
      .catch((err) => {
        commit('ERROR/setIsLoading', false, { root: true });
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },

  deleteProject({ commit, dispatch }, idProject) {
    commit('ERROR/setIsLoading', true, { root: true });
    http
      .delete(`/project/${idProject}`, 'Delete project successfully')
      .then(() => {
        dispatch('getProject');
        dispatch('CHAT/getAllRooms', null, { root: true });
        commit('ERROR/setIsLoading', false, { root: true });
      });
  },
  editProject({ commit, dispatch }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http
      .put(
        `/project/${params.idProject}`,
        params.project,
        'Edit project successfully',
      )
      .then((result) => {
        commit('setProjectEdit', result.data.data);
        dispatch('getProject');
        dispatch('CHAT/getAllRooms', null, { root: true });
        commit('ERROR/setIsLoading', false, { root: true });
      })
      .catch((err) => {
        commit('ERROR/setIsLoading', false, { root: true });
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },

  removeMember({ commit, dispatch }, params) {
    http
      .put(
        `/project/${params.idProject}/member/remove`,
        params.project,
        'Remove member successfully',
      )
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
      .put(
        `/project/${params.idProject}/member/add`,
        params.project,
        'Add member successfully',
      )
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
  getBackground({ commit }) {
    http.get(`/bg/`).then((result) => {
      commit('setBackgroundList', result.data.data);
    });
  },
  setBackground({ commit, dispatch }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http
      .put(
        `/bg/${params.idProject}/${params.idBg}`,
        null,
        'Set background successfully',
      )
      .then((result) => {
        commit('setBackgroundList', result.data.data);
        dispatch('getBackground');
        dispatch('addCurrentProject', params.idProject);
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
