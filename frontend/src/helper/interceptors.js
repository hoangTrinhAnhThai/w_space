import axios from 'axios';
import router from '../router/index';

export default () => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status == 401) {
        localStorage.removeItem('token');
        localStorage.clear();
        return router.push({ path: '/login' });
      }
      return Promise.reject(error);
    },
  );
};
