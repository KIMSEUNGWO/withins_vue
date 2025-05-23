// src/api/index.js
import axios from 'axios'

// Axios 전역 설정
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL || '';

// 요청 인터셉터 설정
axios.interceptors.request.use(
  config => {
    // 요청 처리
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // 에러 처리
    return Promise.reject(error);
  }
);

export default axios;