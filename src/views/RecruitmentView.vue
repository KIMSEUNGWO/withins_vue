<template>
  <div id="banner"></div>
  <RecruitSearchComponent
    @update-data="searchData"
  ></RecruitSearchComponent>
  <PaginationComponent>
    <template #table-top-slot>
      <li>제목</li>
      <li>기관</li>
      <li>모집일</li>
      <li>등록일</li>
    </template>
  </PaginationComponent>
</template>

<script setup lang="ts">
import RecruitSearchComponent from "@/components/RecruitSearchComponent.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import { ref } from "vue";

const searchRef = ref({
  word : '',
  condition : {
    region : 'all',
  }
});
const searchData = (data : Object) => {
  searchRef.value = data;
}


</script>

<style scoped>
#banner {
  aspect-ratio: 24 / 7;
  margin: 30px 0 80px 0;
  border-radius: 20px;
  background-color: #C4C4C4;
}

:deep(#searchTitle),
:deep(.searchResult > button:not(.none)) {
  grid-template-columns: 40% 30% 20% 10%;
}
</style>
