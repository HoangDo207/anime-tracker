<script setup>
import { defineProps, computed, defineEmits, ref } from "vue";

const props = defineProps(["totalPages", "currentPage"]);

const maxVisibleButtons = ref(5); // display 5 button

const emit = defineEmits(["pagechanged"]);

const startPage = computed(() => {
  //When on the first page
  if (props.currentPage === 1) return 1;
  //When on the last page
  if (props.currentPage === props.totalPages)
    return (
      props.totalPages - Math.min(maxVisibleButtons.value, props.totalPages) + 1
    );
  //When in between

  return props.currentPage - 1;
});

const pages = computed(() => {
  const range = [];
  for (
    let i = startPage.value;
    i <=
    Math.min(startPage.value + maxVisibleButtons.value - 1, props.totalPages);
    i += 1
  ) {
    range.push({
      name: i,
      isDisable: i === props.currentPage,
    });
  }
  return range;
});

const isFirstPage = computed(() => {
  return props.currentPage === 1;
});

const isLastPage = computed(() => {
  return props.currentPage === props.totalPages;
});

function onClickFirstPage() {
  emit("pagechanged", 1);
}

function onClickPrevPage() {
  emit("pagechanged", props.currentPage - 1);
}

function onClickPage(page) {
  emit("pagechanged", page);
}

function onClickNextPage() {
  emit("pagechanged", props.currentPage + 1);
}

function onClickLastPage() {
  emit("pagechanged", props.totalPages);
}

function isActive(page) {
  return props.currentPage === page;
}
</script>

<template>
  <div class="pagianate">
    <ul class="pagination">
      <li>
        <button type="button" @click="onClickFirstPage" :disabled="isFirstPage">
          First
        </button>
      </li>
      <li>
        <button type="button" @click="onClickPrevPage" :disabled="isFirstPage">
          Prev
        </button>
      </li>
      <li v-for="page in pages" :key="page.name">
        <button
          type="button"
          @click="onClickPage(page.name)"
          :disabled="page.isDisable"
          :class="{ active: isActive(page.name) }"
        >
          {{ page.name }}
        </button>
      </li>
      <li>
        <button type="button" @click="onClickNextPage" :disabled="isLastPage">
          Next
        </button>
      </li>
      <li>
        <button type="button" @click="onClickLastPage" :disabled="isLastPage">
          Last
        </button>
      </li>
    </ul>
  </div>
</template>

<style>
.pagination {
  list-style-type: none;
}

.pagination li {
  display: inline-block;
}

.pagination li button {
  padding: 4px 8px;
  background-color: #f1f1f1;
  outline: none;
  border: none;
  margin: 0 4px 4px 4px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.pagination li button.active {
  background-color: #4aae9b;
  color: #ffffff;
}
</style>
