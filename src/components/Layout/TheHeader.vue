<template>
  <header class="header">
    <div class="container">
      <div class="inner">
        <div class="header-main">
          <div class="header-logo">
            <router-link to="/">Manga</router-link>
          </div>
          <div class="header-navigator">
            <div class="menu-humbeger" @click="openMenu"><span></span></div>
          </div>
        </div>
        <div class="header-search">
          <base-search></base-search>
        </div>
        <div :class="['mega-menu', { active: !showMenu }]">
          <ul>
            <li v-for="gener in genresNameReplace" :key="gener.slug">
              <a :href="'/genres/' + gener.mal_id + '/' + gener.slug"
                >{{ gener.name }} <span>{{ `(${gener.count})` }}</span></a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import axios from "../../libs/axios";
import endpoint from "../../../constanst/endpoint";
import BaseSearch from "../UI/BaseSearch.vue";
import { computed, ref } from "vue";

const geners = ref(null);
const showMenu = ref(true);
const url = endpoint.GET_ALL_MANGA_GENDER;

geners.value = await axios.get(url);

const genresNameReplace = computed(() => {
  let data = [];
  if (geners.value.data) {
    data = geners.value.data.map((el) => {
      let slug = el.name.replace(/[^\w\s]/gi, "");
      el["slug"] = slug.replace(/\s+/g, "-").toLowerCase();
      return el;
    });
    return data;
  }
  return [];
});

localStorage.setItem("geners", JSON.stringify(genresNameReplace.value));

function openMenu() {
  showMenu.value = !showMenu.value;
}
</script>


<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  margin-bottom: 20px;
  background: teal;
  padding: 8px 0;
  z-index: 2;
}

.header .inner {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.header-main {
  display: flex;
  width: 100%;
  padding: 10px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.header-logo {
  display: block;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 16px;
}

.header-logo a {
  color: #fff;
  text-decoration: none;
}

.mega-menu {
  position: relative;
  width: 100%;
  padding: 0;
  margin: 0px;
  max-height: 0px;
  overflow: hidden;
  transition: all 0.5s linear;
  /* display: none; */
}

.mega-menu.active {
  max-height: 100vh;
  padding: 15px 0;
  transition: all 0.5s linear;
}

.mega-menu ul {
  margin: 0px;
  padding: 5px;
  display: grid;
  max-height: 75vh;
  overflow-x: hidden;
  overflow-y: auto;
  grid-template-columns: repeat(2, minmax(50px, 1fr));
  grid-gap: 5px;
  background: teal;
}

.mega-menu li {
  list-style: none;
}

.mega-menu li a {
  display: block;
  border: solid thin rgba(255, 255, 255, 255.686);
  border-radius: 8px;
  overflow: hidden;
  font-size: 14px;
  line-height: 16px;
  padding: 6px 0;
  text-decoration: none;
  color: #fff;
  box-shadow: inset 0px -1px 2px rgba(255, 255, 255, 0.86),
    inset 2px 3px 6px rgba(0, 0, 0, 0.1686);
}

.menu-humbeger {
  position: relative;
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.menu-humbeger span {
  position: relative;
  width: 26px;
  height: 2px;
  background: #fff;
}

.menu-humbeger span::before {
  content: "";
  position: absolute;
  top: -7px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #fff;
}

.menu-humbeger span::after {
  content: "";
  position: absolute;
  top: 7px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #fff;
}

.header-search {
  position: relative;
  width: 100%;
}
</style>