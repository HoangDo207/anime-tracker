<script setup>
import MangaItem from "../components/manga/MangaItem.vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import doSearch from "@/hooks/search";

const route = useRoute();
const router = useRouter();

const query = ref("");
query.value = { ...route.query };

var queryGenresArr = query.value.genres || [];

const SelectedStatus = ref(query.value.status || "");
const SelectedOrder = ref(query.value.order_by || "rank");
const SelectedGenres = ref(JSON.parse("[" + queryGenresArr + "]"));
const advanceSearch = ref(false);

const status = ref({
  publishing: "Publishing",
  complete: "Complete",
  hiatus: "Hiatus",
  discontinued: "Discontinued",
  upcoming: "Upcoming",
});

const orderBy = ref({
  popularity: "Popularity",
  favorites: "Favorites",
  score: "Score",
  rank: "Rank",
  members: "members",
});

const sort = ref({
  desc: "A - Z",
  asc: "Z - A",
});

const toggleAdvance = () => {
  advanceSearch.value = !advanceSearch.value;
};

const { mangas, pageActive, totalPage } = await doSearch(query.value);

const geners = await JSON.parse(localStorage.getItem("geners"));

async function searchManga() {
  router
    .replace({
      name: "search",
      query: { ...query.value },
    })
    .then(() => router.go());
}

function pageChanged(page) {
  router
    .push({
      name: "search",
      query: { ...query, page },
    })
    .then(() => router.go());
}

function mergeQuery() {
  if (Object.keys(SelectedStatus.value).length > 0) {
    query.value["status"] = SelectedStatus.value;
  } else {
    delete query.value["status"];
  }
  if (SelectedOrder.value) {
    query.value["order_by"] = SelectedOrder.value;
  }
  if (Object.keys(SelectedGenres.value).length > 0) {
    query.value["genres"] = SelectedGenres.value.toString();
  } else {
    delete query.value["genres"];
  }
}
</script>

<template>
  <div class="page page-search">
    <div class="block-search">
      <div class="block-search-header">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        <span>Search</span>
      </div>
      <div class="block-search-body">
        <div class="search">
          <div class="base-search">
            <div class="search-input-group">
              <input type="text" v-model="query.q" placeholder="Search..." />
              <button type="button" @click="searchManga">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                <span>Search</span>
              </button>
            </div>
          </div>
          <div class="toggle-advance">
            <button type="button" class="btn" @click="toggleAdvance">
              <font-awesome-icon icon="fa-solid fa-filter" />
              Advance search
            </button>
          </div>
          <div class="advance-search" v-if="advanceSearch">
            <div class="form-group">
              <label for="">Status</label>
              <select
                v-model="SelectedStatus"
                id="search-status"
                class="form-control"
                @change="mergeQuery"
                v-if="status"
              >
                <option value="">All</option>
                <option v-for="(val, indx) in status" :key="val" :value="indx">
                  {{ val }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="">OrderBy</label>
              <select
                v-model="SelectedOrder"
                id="search-order"
                @change="mergeQuery"
                class="form-control"
                v-if="orderBy"
              >
                <option v-for="(val, indx) in orderBy" :key="val" :value="indx">
                  {{ val }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="">Sort</label>
              <select id="search-sort" class="form-control" v-if="sort">
                <option v-for="(val, indx) in sort" :key="val" :value="indx">
                  {{ val }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="">Geners</label>
              <ul v-if="geners.length > 0">
                <li v-for="gener in geners" :key="gener.name">
                  <label>
                    <input
                      type="checkbox"
                      class="d-none"
                      name="geners"
                      :value="gener.mal_id"
                      v-model="SelectedGenres"
                      @change="mergeQuery"
                    />
                    <span class="mark-checked"></span>
                    {{ gener.name }}
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="block-result">
      <div class="m-grid" v-if="mangas.length > 0">
        <div class="m-item" v-for="manga in mangas" :key="manga.title">
          <manga-item :manga="manga"></manga-item>
        </div>
      </div>
      <div v-else>No manga found!</div>
    </div>

    <the-pagination
      :totalPages="totalPage"
      :currentPage="pageActive"
      @pagechanged="pageChanged"
    ></the-pagination>
  </div>
</template>

<style scoped>
.block-search {
  position: relative;
  margin-top: 20px;
  background: #eee;
  padding: 0 15px;
}
.block-search-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
  text-align: left;
  color: teal;
  font-size: 18px;
  margin-bottom: 8px;
  border-bottom: solid thin rgba(0, 128, 128, 0.519);
}
.search-input-group {
  position: relative;
  width: 100%;
  display: flex;
  align-items: stretch;
}
.search-input-group input {
  display: block;
  position: relative;
  flex: 0 0 calc(100% - 80px);
  height: 36px;
  border: solid thin teal;
  outline: none;
  background-color: #fff;
  padding: 5px 10px;
}
.search-input-group button {
  display: flex;
  position: relative;
  flex: 0 0 80px;
  border: none;
  outline: none;
  color: #fff;
  gap: 8px;
  align-items: center;
  background-color: teal;
}
.toggle-advance {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
.toggle-advance button {
  display: block;
  border: none;
  outline: none;
  background: transparent;
  color: teal;
  font-size: 14px;
  margin-bottom: 12px;
}
.advance-search {
  position: relative;
  width: 100%;
  margin-top: 12px;
}
.block-result {
  margin-top: 20px;
}
.form-group {
  position: relative;
  margin-bottom: 16px;
}
.form-group:last-child {
  margin-bottom: 0px;
}
.form-group > label {
  display: block;
  width: 100%;
  font-weight: 600;
  color: teal;
  margin-bottom: 8px;
  text-align: left;
  font-size: 14px;
}
.form-group .form-control {
  position: relative;
  width: 100%;
  height: 36px;
  border: solid thin teal;
  border-radius: 4px;
  padding: 5px 10px;
  outline: none;
}

.form-group ul {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: dense;
  gap: 12px;
  padding: 0px;
  margin: 0px;
  text-align: left;
}
.form-group ul li {
  list-style: none;
  position: relative;
}
.form-group ul li label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  margin: 0px;
  position: relative;
}
.form-group ul li label input[type="checkbox"] {
  display: none;
}
.form-group ul li label span {
  display: block;
  position: relative;
  width: 16px;
  height: 16px;
  border: solid thin rgb(143, 141, 141);
  border-radius: 2px;
  transition: all 0.5s linear;
}
.form-group ul li label span::before {
  content: "";
  position: absolute;
  width: 4px;
  height: 12px;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  transform: rotate(35deg) translate(-2px, -6px);
  border-style: solid;
  border-width: 2px;
  border-color: transparent;
  border-right-color: teal;
  border-bottom-color: teal;
  transition: all 0.5s linear;
}
.form-group ul li label input[type="checkbox"]:checked ~ span {
  border-color: transparent !important;
}
.form-group ul li label input[type="checkbox"]:checked ~ span::before {
  opacity: 1;
  visibility: visible;
}
</style>