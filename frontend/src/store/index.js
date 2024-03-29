import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './modules/auth.js';
import Validation from './modules/validation';
import ErrorMessage from './modules/errorMessage';
import Task from './modules/task';
import Project from './modules/project';
import Logtime from './modules/logtime';
import User from './modules/user';
import Chat from './modules/chat';
import Admin from './modules/admin';

import Notification from './modules/notification';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    AUTH: Auth,
    VALIDATION: Validation,
    ERROR: ErrorMessage,
    TASK: Task,
    PROJECT: Project,
    LOGTIME: Logtime,
    USER: User,
    CHAT: Chat,
    ADMIN: Admin,
    NOTIFICATION: Notification,
  },
});
