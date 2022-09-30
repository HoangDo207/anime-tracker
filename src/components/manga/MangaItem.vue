<template>
  <div class="manga-item">
    <a :href="'/manga/' + manga.mal_id">
      <base-card>
        <template #card-header>
          <div class="manga-image">
            <div
              class="img-in-ratio"
              :style="{
                'background-image':
                  'url(' + manga.images.jpg.large_image_url + ')',
              }"
            ></div>
          </div>
          <div class="chapter">
            <span v-if="manga.chapters">{{ chapterString }}</span>
          </div>
        </template>
        <template #card-body>
          <div class="info">
            <h3>{{ manga.title }}</h3>
          </div>
        </template>
      </base-card>
    </a>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import BaseCard from "../UI/BaseCard.vue";

const props = defineProps(["manga"]);

const chapterString = computed(() => {
  if (manga.value.chapters > 1) return `Chapter ${manga.value.chapters}`;
  return "Oneshot";
});

const manga = computed({
  get() {
    return props.manga;
  },
});
</script>

<style scoped>
.manga-item {
  position: relative;
}
.manga-image {
  position: relative;
  padding-top: 218px;
}
.img-in-ratio {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 50%;
}
.manga-item a {
  text-decoration: none;
}
.info {
  display: flex;
  color: #333;
  pointer-events: none;
}

.chapter {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding: 10px;
  color: #fff;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(8, 8, 8, 0) 50%,
    rgba(8, 8, 8, 0.4) 70%,
    rgba(8, 8, 8, 0.7) 80%
  );
}

.info h3 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 14px;
  line-height: 1.5;
  height: calc(1.5 * 2 * 14px);
  margin: 0px;
  padding: 0 10px;
  text-align: left;
}
</style>
