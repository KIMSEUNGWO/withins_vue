
<template>
  <div id="login-wrap">
    <div id="login">

      <div id="tabs">
        <button type="button" class="tab" :class="{'active' : tab == key}"
                @click="tab = key"
                v-for="(value, key) in tabList" :key="key"
        >{{value}}
        </button>
      </div>

      <div id="form" v-if="tab == 'user'">

        <a href="/oauth2/authorization/kakao" id="kakao-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.98613 0.90918C4.47157 0.90918 0 4.28547 0 8.45999C0 11.038 1.71984 13.3141 4.34398 14.6732L3.29543 18.4486C3.29543 18.4486 3.12344 18.8208 3.39528 18.988C3.47157 19.0543 3.57033 19.091 3.67268 19.091C3.77502 19.091 3.87378 19.0543 3.95007 18.988L8.74897 15.8975C9.16506 15.9353 9.58113 15.9622 10.0139 15.9622C15.5284 15.9622 20 12.5913 20 8.41143C20 4.23152 15.5007 0.90918 9.98613 0.90918Z" fill="#3C1E1E"/>
          </svg>
          <span class="text">카카오로 로그인</span>
        </a>
      </div>

      <form @submit.prevent="submit" id="form" v-else>
        <div class="field_wrap">
          <div class="field_inner">
            <label for="username">
              <input class="field"
                     v-model="username"
                     tabindex="0"
                     aria-label="아이디"
                     placeholder="아이디"
                     autocomplete="off"
                     id="username" name="username" type="text">
            </label>
          </div>
          <div class="field_inner">
            <label for="password">
              <input class="field"
                     v-model="password"
                     tabindex="0"
                     aria-label="비밀번호"
                     placeholder="비밀번호"
                     autocomplete="off"
                     id="password" name="password" type="password">
            </label>
          </div>
        </div>
        <button type="submit" id="submit">로그인</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import axios from "axios";
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const tabList = {
  'user' : '일반회원',
  'institution' : '기관'
}
const tab = ref('user')

const username = ref('');
const password = ref('');

const userStore = useUserStore();
const router = useRouter();
const { login } = userStore;

const submit = async () => {
  await login(router,
    username.value, password.value,
    (res: any) => {
      console.log('로그인 성공');
      console.log(res);
    },
    (res: any) => {
      console.log('로그인 실패')
    }
  );
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.field_wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.field_inner {
  height: 50px;
  border: 1px #eeeeee solid;
  border-radius: 16px;
  padding: 0 20px;
}

.field {
  width: 100%;
  height: 100%;
}

#submit {
  height: 50px;
  border-radius: 16px;
  background-color: var(--main-color-1);
  color: white;
  font-size: 16px;
}

#login-wrap {
  width: 100%;
  min-height: calc(100vh - 80px);

  display: flex;
  align-items: center;
  justify-content: center;
}
#login {
  width: 400px;
  min-height: 450px;
  border-radius: 16px;
  border: 1px #eee solid;
  box-shadow: 10px 10px 30px rgba(0,0,0,0.06);

  padding: 15px;
}

#tabs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 45px;
  position: relative;
  margin-bottom: 30px;
}

#tabs::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #eee;
  z-index: 1;
}

.tab {
  padding: 12px 24px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  font-size: 15px;
  color: var(--f3);
  transition: all 0.2s ease;
  position: relative;
  z-index: 2;
  border-radius: 6px 6px 0 0;
}

.tab:hover {
  color: var(--main-color-1);
  background-color: rgba(0, 113, 227, 0.03);
}

.tab.active {
  color: var(--main-color-1);
  font-weight: 600;
}

.tab.active::before {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--main-color-gradient);
  border-radius: 2px;
}

#kakao-btn {
  height: 50px;
  border-radius: 8px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  background-color: #FEE500;
  position: relative;
}
#kakao-btn .text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
#kakao-btn:hover {
  background-color: #fbe006;
}
</style>