<script setup>
import MangaItem from "../components/manga/MangaItem.vue";
import BreadCrumb from "../components/UI/BreadCrumb.vue";
import { useRoute, useRouter } from "vue-router";
import doSearch from "@/hooks/search";
import { computed } from "@vue/runtime-core";
const route = useRoute();
const router = useRouter();
const genresId = parseInt(route.params.mal_id);

const geners = JSON.parse(localStorage.getItem("geners"));

const gener = computed(() => {
  const found = geners.find((element) => element["mal_id"] === genresId);
  return found;
});

const items = [
  {
    name: "Home",
    links: "/",
  },
  {
    name: gener.value.name,
    links: "#",
    active: true,
  },
];

const { mangas, pageActive, totalPage } = await doSearch({
  genres: genresId,
});

function pagechanged(page) {
  router
    .push({
      name: "genres",
      query: { ...route.query, page },
    })
    .then(() => router.go());
}
</script>


<template>
  <div class="manga-list">
    <bread-crumb :items="items"></bread-crumb>
    <div class="page page-genres">
      <div class="m-grid" v-if="mangas.length > 0">
        <div class="m-item" v-for="manga in mangas" :key="manga.title">
          <manga-item :manga="manga"></manga-item>
        </div>
      </div>
      <div v-else>No manga found!</div>
      <the-pagination
        :totalPages="totalPage"
        :currentPage="pageActive"
        @pagechanged="pagechanged"
      ></the-pagination>
    </div>
  </div>
</template>

<style scoped>
</style>