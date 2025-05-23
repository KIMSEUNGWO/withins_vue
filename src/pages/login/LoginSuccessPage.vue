
<template>
  <div id="login-success">
    로그인중...
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const { getData } = userStore;
const router = useRouter();

const load = async () => {
  await getData();
  await router.replace("/");
}
load();
</script>

<style scoped>

</style>