<template>
  <div class="page-manga">
    <div class="manga">
      <div class="manga-img">
        <img :src="manga.images.jpg.large_image_url" class="img-full" alt="" />
      </div>
      <div class="manga-info">
        <div class="manga-info-item manga-name">
          <h1 class="manga-title">
            {{ manga.title }}
          </h1>
        </div>
        <div class="manga-info-item manga-other-name">
          <span>Tên khác:</span>
          <div>{{ `${manga.title_english} / ${manga.title_japanese}` }}</div>
        </div>
        <div class="manga-info-item manga-type">
          <span>Thể loại:</span>
          <ul class="geners" v-if="manga.genres">
            <li v-for="genre in manga.genres" :key="genre.name">
              <a :href="genre.url">{{ genre.name }}</a>
            </li>
          </ul>
        </div>
        <div class="manga-info-item manga-authors">
          <span>Tác giả:</span>
          <div class="manga-authors">
            <span v-for="author in manga.authors" :key="author.name">
              {{ author.name }}</span
            >
          </div>
        </div>
        <div class="manga-info-item manga-status">
          <span>Trạng thái: {{ status }}</span>
        </div>
        <div class="manga-info-item manga-assess">
          <div class="assess-item">
            <div class="assess-icon c-blue">
              <font-awesome-icon icon="fa-regular fa-thumbs-up" />
            </div>
            <div class="assess-data">{{ manga.favorites }}</div>
          </div>
          <div class="assess-item">
            <div class="assess-icon c-blue">
              <font-awesome-icon icon="fa-regular fa-thumbs-down" />
            </div>
            <div class="assess-data">{{ manga.favorites }}</div>
          </div>
          <div class="assess-item">
            <div class="assess-icon c-red">
              <font-awesome-icon icon="fa-regular fa-heart" />
            </div>
            <div class="assess-data">{{ manga.favorites }}</div>
          </div>
          <div class="assess-item">
            <div class="assess-icon c-yellow">
              <font-awesome-icon icon="fa-regular fa-star" />
            </div>
            <div class="assess-data">{{ manga.favorites }}</div>
          </div>
        </div>
        <div class="manga-info-item manga-synopsis">
          <span>Tóm tắt:</span>
          <div class="synopsis-content" :class="{ active: !showSynopips }">
            <p>{{ manga.synopsis }}</p>
          </div>
          <div
            :class="['summary-opacity', { 'more-state': showSynopips }]"
            @click.prevent="synopsisShow"
          >
            <span class="see-more">{{ textBtn }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import axios from "@/libs/axios";
import endpoint from "../../constanst/endpoint";

const manga = ref(null);
const mid = ref(0);
const route = useRoute();
const status = ref("");
const showSynopips = ref(true);

mid.value = route.params.id;

const url = `${endpoint.SEARCH_MANGA}/${mid.value}/full`;
var result = await axios.get(url);
manga.value = result.data;

const textBtn = computed(() => {
  if (showSynopips.value) return "Xem thêm";
  return "Ẩn đi";
});

const setStatus = computed({
  get() {
    return status.value;
  },
  set(value) {
    switch (value) {
      case "Finished":
        status.value = "Hoàn thành";
        break;
      default:
        status.value = "Đang tiến hành";
        break;
    }
  },
});

setStatus.value = manga.value.status;

function synopsisShow() {
  showSynopips.value = !showSynopips.value;
}
</script>

<style scoped>
.manga-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
  text-align: left;
}
.manga-info-item {
  position: relative;
  display: flex;
}
.manga-info-item > span {
  display: inline-block;
  font-weight: 600;
  margin-right: 8px;
  white-space: nowrap;
}
.manga-title {
  display: block;
  font-size: 22px;
  text-align: left;
  margin: 0;
}
.geners {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.geners {
  padding: 0px;
  margin: 0px;
}
.geners li {
  display: inline-block;
  list-style: none;
}
.geners li a {
  display: block;
  padding: 4px 8px;
  background-color: #2c3e50;
  border-radius: 8px;
  color: #fff;
  font-size: 12px;
  text-decoration: none;
}
.manga-assess {
  position: relative;
  width: 100%;
  display: flex;
}
.assess-item {
  display: block;
  text-align: center;
  flex: 0 0 25%;
}
.assess-icon {
  font-size: 24px;
}

.manga-synopsis {
  flex-wrap: wrap;
}

.manga-synopsis span {
  margin-bottom: 10px;
}

.synopsis-content {
  position: relative;
  width: 100%;
  overflow: hidden;
  line-height: 1.5;
  max-height: 120px;
  text-align: justify;
}

.synopsis-content.active {
  max-height: unset;
}

.summary-opacity.more-state {
  width: 100%;
  background-image: linear-gradient(
    180deg,
    rgba(51, 57, 64, 0),
    #eee 66%,
    #eee
  );
  position: absolute;
  bottom: 0;
  height: 120px;
  cursor: pointer;
}

.summary-opacity.more-state .see-more {
  position: absolute;
  bottom: 0;
  font-weight: 400;
  left: 0;
  right: 0;
  padding: 10px 10px 10px 0;
  cursor: pointer;
  color: #2c3e50;
}

.c-blue {
  color: #4a80e2;
}

.c-red {
  color: #e22590;
}

.c-yellow {
  color: #f5ab00;
}
</style>