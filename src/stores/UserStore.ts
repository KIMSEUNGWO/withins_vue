//
// // stores/userStore.js
// import { defineStore } from 'pinia';
//
// export const useUserStore = defineStore('user', {
//   state: () => ({
//     username: sessionStorage.getItem('username') || ''
//   }),
//   actions: {
//     // 세션에서 사용자 정보 로드
//     loadUserFromSession() {
//       this.username = sessionStorage.getItem('username') || '';
//     },
//     // 로그인 시 사용자 정보 저장
//     setUser(name) {
//       this.username = name;
//       sessionStorage.setItem('username', name);
//     },
//     // 로그아웃 시 세션 정보 삭제
//     clearUser() {
//       this.username = '';
//       sessionStorage.removeItem('username');
//     }
//   }
// });