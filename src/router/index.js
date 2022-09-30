import { createRouter, createWebHistory } from "vue-router";

import NotFound from "../views/NotFound.vue";
import HomePage from "../views/HomePage.vue";
import MangaList from "../views/MangaList.vue";
import SearchPage from "../views/MangaSearch.vue";
import MangaDetail from "../views/MangaDetail.vue";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFound,
  },
  {
    path: "/",
    name: "home",
    component: HomePage,
  },

  {
    path: "/genres/:mal_id/:slug",
    name: "genres",
    component: MangaList,
    props: true,
  },
  {
    path: "/search",
    name: "search",
    component: SearchPage,
    props: (route) => ({ query: route.query.q }),
  },
  {
    path: "/manga/:id",
    name: "manga-detail",
    component: MangaDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});

router.resolve({
  name: "not-found",
  params: { pathMatch: ["not", "found"] },
});

export default router;
