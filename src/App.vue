<template>
  <TheHeader></TheHeader>
  <TheMain></TheMain>
</template>

<style>
#app {
  margin: 0 auto;
  min-height: 100vh;
  width: calc(100vw - 200px);
  max-width: 1200px;
}
</style>

<script setup lang="ts">
import TheHeader from "@/layouts/TheHeader.vue";
import TheMain from "@/layouts/TheMain.vue";
</script>
