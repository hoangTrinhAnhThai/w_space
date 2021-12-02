import axios from 'axios';
import Vue from 'vue';
import interceptors from '../helper/interceptors';

const handleSuccessResponse = (response, resolve, message) => {
  resolve(response);
  if (message) {
    Vue.toasted.success(message, {
      duration: 5000,
    });
  }
};

const handleErrorResponse = (response, reject, message) => {
  reject(response);
  if (message) {
    console.log('');
  }
};

// let API_URL = 'http://localhost:3000/'
let API_URL = process.env.VUE_APP_API_URL;
const headers = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'multipart/form-data',
};

const services = {
  get(endPoint, message) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}${endPoint}`, {
          headers: localStorage.getItem('token')
            ? { Authorization: `Bearer ${localStorage.getItem('token')}` }
            : null,
        })
        .then((response) => {
          handleSuccessResponse(response, resolve, message);
        })
        .catch((error) => {
          handleErrorResponse(error, reject);
        });
    });
  },
  post(endPoint, params, message) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}${endPoint}`, params, {
          headers: localStorage.getItem('token')
            ? { Authorization: `Bearer ${localStorage.getItem('token')}` }
            : null,
        })
        .then((response) => {
          handleSuccessResponse(response, resolve, message);
        })
        .catch((error) => {
          handleErrorResponse(error, reject);
        });
    });
  },
  postFormData(endPoint, params, message) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}${endPoint}`, params, {
          headers: headers,
        })
        .then((response) => {
          handleSuccessResponse(response, resolve, message);
        })
        .catch((error) => {
          handleErrorResponse(error, reject);
        });
    });
  },
  put(endPoint, params, message) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${API_URL}${endPoint}`, params, {
          headers: localStorage.getItem('token')
            ? { Authorization: `Bearer ${localStorage.getItem('token')}` }
            : null,
        })
        .then((response) => {
          handleSuccessResponse(response, resolve, message);
        })
        .catch((error) => {
          handleErrorResponse(error, reject);
        });
    });
  },
  delete(endPoint, message) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${API_URL}${endPoint}`, {
          headers: localStorage.getItem('token')
            ? { Authorization: `Bearer ${localStorage.getItem('token')}` }
            : null,
        })
        .then((response) => {
          handleSuccessResponse(response, resolve, message);
        })
        .catch((error) => {
          handleErrorResponse(error, reject);
        });
    });
  },
};

interceptors(services);

export default services;
