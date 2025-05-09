<template>
  <div id="pagination">
    <div id="result" class="box">
      <ul class="searchResult" id="searchTitle">
        <slot name="table-top-slot"></slot>
      </ul>
      <ul class="searchResult" id="searchResult">
        <slot name="table-result-slot"></slot>
      </ul>
    </div>
    <div class="pagination">
      <button @click="goToFirst()" :disabled="page < 2" type="button" class="button_first" id="first-page">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"/></svg>
      </button>
      <button @click="goToPrev()" :disabled="page < 2" type="button" class="button_previous" id="prev-page">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
      </button>
      <ol class="page_list">
        <li v-for="i in pageBtnList" :key="i" class="page" :class="{selected : i === page}">
          <button @click="goToPage(i)" type="button" class="page_link">{{ i }}</button>
        </li>
      </ol>
      <button @click="goToNext()" :disabled="page >= totalPage" type="button" class="button_next" id="next-page">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>
      </button>
      <button @click="goToLast()" :disabled="page >= totalPage" type="button" class="button_last" id="last-page">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

// count : 페이지네이션할 개수
const props = defineProps({
  count: {
    type: Number,
    default: 10
  },
  mapping: {
    type: String,
  },
  condition: {
    type: Object,
    default: () => ({})
  },
  placeholder: {
    type: String,
    default: '이름을 입력해주세요.',
  }
});
const emit = defineEmits(['update-data']);

const total = ref(0);
const page = ref(1);
const totalPage = ref(10);
const searchKeyword = ref('');
const dataList = ref([]);

const pageBtnList = ref([1]);

search();
function search() {
  dataList.value = [];
  const requestURI = props.mapping + getConditionRequestParam();
}
function searchResult(result) {
  const requestURI = props.mapping + getConditionRequestParam();
  history.pushState({data : result}, '',  requestURI);
  onPopState(result);
}
function onPopState(result) {
  setConditionData(result.data);
  if (result.result !== 'OK') return;
  const pageable = result.data;
  setVariablePagination(pageable);
  pagination(pageable);

}

function setConditionData(pageable) {
  searchKeyword.value = (pageable != null) ? pageable.word : '';
  for (let key in props.condition) {
    props.condition[key].setData(pageable);
  }
}
function getConditionRequestParam() {
  let param = '?';
  let pageParam = createParam('page', page.value);
  if (pageParam != null) param += pageParam;
  let wordParam = createParam('word', searchKeyword.value);
  if (wordParam != null) param += wordParam;

  for (let key in props.condition) {
    if (props.condition.hasOwnProperty(key)) {
      let conditionParam = createParam(key, props.condition[key].getData());
      if (conditionParam != null) {
        // 첫 번째 파라미터가 아니면 '&' 추가
        param += (param.length > 1 ? '&' : '') + conditionParam;
      }
    }
  }
  return param;
}
function createParam(key, value) {
  if (value === '' || value == null) return null;
  return `${key}=${value}`;
}

function setVariablePagination(pageable) {
  total.value = pageable.totalElements;
  totalPage.value = pageable.totalPages;
  page.value = pageable.pageNumber + 1;
  searchKeyword.value = pageable.word;
  emit('update-data', pageable.content);
}
function pagination() {
  let pageCount = Math.floor(page.value / props.count);
  const startNum = Math.max(0, (pageCount) * props.count) + 1;
  console.log(`pageCount : ${pageCount}, startNum : ${startNum}, totalPage : ${totalPage.value}`);

  generatePageBtnList(startNum, props.count, totalPage.value);
}

function generatePageBtnList(startNum, count, lastPageNum) {
  const list = [];
  for (let i=startNum;i < startNum+count && i <= lastPageNum;i++) {
    list.push(i);
  }
  pageBtnList.value = list;
}
function goToFirst() {
  page.value = 1;
  search();
}
function goToPrev() {
  page.value = Math.max(0, page.value - 1);
  search();
}
function goToNext() {
  page.value = Math.min(totalPage.value, page.value + 1);
  search();
}
function goToLast() {
  page.value = totalPage.value;
  search();
}
function goToPage(i) {
  page.value = i;
  search();
}
function handleSearchBtn() {
  page.value = 1;
  search();
}

class PageData {

  constructor(getData, setData) {
    this.getData = getData;
    this.setData = setData;
  }
}
</script>


<style>

/* 페이지네이션 */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 31px;
  background-color: #ffffff00;
}

.pagination svg {
  fill: var(--f1);
  width: 100%;
  height: 100%;
}

.pagination button:disabled svg {
  fill: rgba(16, 16, 16, 0.3);
  pointer-events: none;
}
.pagination button {
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0);
  border: none;
}
.pagination button:disabled {
  cursor: default;
}

.pagination .button_previous {
  margin-left: 10px;
}

.pagination .button_next {
  margin-right: 10px;
}

.pagination .page_list {
  padding: 0 14px;
  margin: 0 15px;
  white-space: nowrap;
  font-size: 0;
}

.pagination .page {
  display: inline-block;
}

.pagination .page + .page {
  margin-left: 6px;
}

.pagination .page.selected .page_link {
  border: 1px var(--main-color-1) solid;
  background: white;
  color: var(--main-color-1);
}


.pagination .page_link {
  position: relative;
  display: block;
  min-width: 30px;
  height: 28px;
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 0 7px;
  font-size: 14px;
  font-weight: normal;
  line-height: 26px;
  color: #303038;
  text-align: center;
}

#searchTitle {
  display: grid;
  align-items: center;
  justify-items: center;
  height: 50px;
  background-color: #F5F6F8;
  border-top: 1px solid var(--f1);
}

.searchResult > a, .searchResult > button {
  display: grid;
  align-items: center;
  justify-items: center;
  height: 40px;
  text-decoration: none;
  width: 100%;
}
.searchResult > a:hover:not(#searchTitle > a),
.searchResult > button:hover:not(#searchTitle > a){
  background-color: #fff9f9;
  border-radius: 5px;
}
.searchResult > a > li,
.searchResult > button > li {
  display: flex;
  align-items: center;
  justify-content: center;
}


#result.box {
  padding: 24px;
}
</style>