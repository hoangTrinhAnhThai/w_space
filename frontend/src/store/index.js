import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './modules/auth.js';
import Validation from './modules/validation';
import ErrorMessage from './modules/errorMessage';
import Task from './modules/project';
import Logtime from './modules/logtime';
import User from './modules/user';
import Chat from './modules/chat';
import Notification from './modules/notification';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    AUTH: Auth,
    VALIDATION: Validation,
    ERROR: ErrorMessage,
    TASKS: Task,
    LOGTIME: Logtime,
    USER: User,
    CHAT: Chat,
    NOTIFICATION: Notification
  },
});
