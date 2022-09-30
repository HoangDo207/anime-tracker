<script setup>
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// import Swiper core and required modules
import { Pagination } from "swiper";
import axios from "../libs/axios";
import MangaItem from "../components/manga/MangaItem.vue";
import doSearch from "@/hooks/search";
import { computed, reactive, ref } from "vue";
import endpoint from "../../constanst/endpoint";

const url = ref(endpoint.GET_TOP_MANGA);
const optionLoadComingUp = ref({ status: "upcoming", limit: 10 });
const optionLoadTop = reactive({
  params: {
    type: "manga",
    limit: 12,
    filter: "bypopularity",
  },
});

const { mangas } = await doSearch(optionLoadComingUp.value);

var topManga = await axios.get(url.value, optionLoadTop);

const mangaTop = computed(() => {
  if (topManga.data) {
    return topManga.data;
  }
  return [];
});
</script>

<template>
  <div class="wrapper">
    <div id="home-page" class="page">
      <div class="manga-news">
        <div class="manga-news-title">
          <font-awesome-icon icon="fa-regular fa-bookmark" />
          Manga Upcoming
        </div>
        <div class="manga-news-content">
          <swiper
            :modules="[Pagination]"
            :pagination="{ clickable: true }"
            :slides-per-view="2"
            :space-between="8"
          >
            <swiper-slide v-for="manga in mangas" :key="manga.title">
              <manga-item :manga="manga"></manga-item>
            </swiper-slide>
          </swiper>
        </div>
      </div>

      <div class="manga-top">
        <div class="manga-news-title">
          <font-awesome-icon icon="fa-regular fa-bookmark" />
          Top Manga
        </div>
        <div class="manga-news-content">
          <div class="m-grid">
            <div class="m-item" v-for="manga in mangaTop" :key="manga.title">
              <manga-item :manga="manga"></manga-item>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.manga-news,
.manga-top {
  position: relative;
  padding: 8px;
  background: #eee;
  margin-bottom: 16px;
}
.swiper-pagination {
  position: relative !important;
  top: inherit;
  left: inherit;
  bottom: inherit !important;
  margin: 10px 0;
}
.swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet,
.swiper-pagination-horizontal.swiper-pagination-bullets
  .swiper-pagination-bullet {
  width: 12px;
  height: 12px;
}

.swiper-pagination-bullet-active {
  background: teal;
}

.manga-news-title {
  position: relative;
  margin: 15px 0;
  color: teal;
  font-size: 18px;
  text-align: left;
}

.m-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  grid-gap: 8px;
}
</style>
