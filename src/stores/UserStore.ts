import { defineStore } from 'pinia';
import { computed, Ref, ref } from "vue";
import { Member } from "@/domain/Member";
import axios from "axios";
import { Router } from "vue-router";

export const useUserStore = defineStore('user', () => {

  const user: Ref<Member | null> = ref(null)
  const login = async (router: Router, username: string, password: string, successHandler: Function, failureHandler: Function) => {

    await axios.post('/login', {
      username : username,
      password : password
    },{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        if  (res.status === 200) {
          successHandler(res);
          router.push("/login/success");
        }
      })
      .catch(err => failureHandler(err));
  }

  const getData = async () => {
    await axios.get('/api/login/success')
      .then(res => {
        if (res.status === 200) {
          let data = res.data;
          user.value = new Member(data);
        }
      })
  }

  const isAnonymous = computed((): boolean => user.value == null);

  return {user, getData, login, isAnonymous};
});