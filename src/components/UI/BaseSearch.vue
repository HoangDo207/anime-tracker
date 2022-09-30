<script setup>
import doSearch from "@/hooks/search";
import { useRouter } from "vue-router";

const { enteredSearchTerm, mangas } = await doSearch();
const router = useRouter();

const handleInput = (e) => {
  if (!e.target.value) {
    enteredSearchTerm.value = null;
  }
};
async function searchManga() {
  await router.push({
    name: "search",
    query: {
      q: enteredSearchTerm.value,
    },
  });
  router.go();
}
</script>

<template>
  <div class="search-manga">
    <form @submit.prevent="searchManga" @keypress.enter="searchManga">
      <div>
        <div class="form-group">
          <input
            type="text"
            @input="handleInput"
            v-model="enteredSearchTerm"
            placeholder="search..."
          />
          <button type="submit" class="btn-search">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </button>
        </div>
      </div>
    </form>
    <div class="search-suggests" v-if="mangas.length > 0">
      <ul>
        <li v-for="manga in mangas" :key="manga.title">
          <div class="suggests">
            <a :href="'manga/' + manga.mal_id">
              <div class="suggests-img">
                <img :src="manga.images.jpg.small_image_url" alt="" />
              </div>
              <div class="suggests-info">
                <h4>{{ manga.title }}</h4>
                <p>{{ manga.synopsis }}</p>
              </div>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.search-manga {
  position: relative;
  width: 100%;
  padding: 0 10px;
}

.search-manga input {
  position: relative;
  display: block;
  width: 100%;
  height: 36px;
  border-radius: 36px;
  padding: 8px 16px;
  border: solid thin #f1f1f1;
  outline: none;
}
.form-group {
  position: relative;
}
.btn-search {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  border: none;
  outline: none;
  background-image: linear-gradient(
    -45deg,
    teal 10%,
    teal 40%,
    rgba(0, 128, 128, 0.86) 60%,
    rgba(0, 128, 128, 0.4) 100%
  );
  box-shadow: 3px 0px 6px rgba(0, 128, 128, 0.16);
  color: #fff;
}
.search-suggests {
  position: absolute;
  top: 120%;
  left: 0;
  width: 100%;
  padding: 5px;
  background: #fff;
}
.search-suggests ul {
  padding: 0px;
  margin: 0px;
  position: relative;
}
.search-suggests ul li {
  list-style: none;
}
.suggests a {
  display: flex;
  align-items: flex-start;
  color: #333;
  text-decoration: none;
  gap: 8px;
  text-align: left;
}
.suggests .suggests-img {
  display: block;
  flex: 0 0 50px;
}
.suggests .suggests-img img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.suggests-info {
  display: block;
  flex: 1;
}
.suggests-info h4 {
  display: block;
  font-size: 14px;
  line-height: 1.5;
  margin: 0px;
}
.suggests-info p {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  line-height: 1.5;
  margin-bottom: 0;
  margin-top: 8px;
}
</style>