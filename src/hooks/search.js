import { ref, reactive, watch, computed } from "vue";
import axios from "../libs/axios";
import endpoint from "../../constanst/endpoint";
import { useRoute } from "vue-router";

export default async function doSearch(payload) {
  const enteredSearchTerm = ref("");
  const activeSerchTearm = reactive({ params: {} });
  const url = ref(endpoint.SEARCH_MANGA);
  const dataRes = ref("");
  const route = useRoute();
  var current_page = route.query.page || 1;

  const optionsSearch = {
    order_by: "rank",
    limit: 6, //max visible item display,
    page: current_page,
  };

  try {
    if (typeof payload === "object" && payload !== null) {
      activeSerchTearm.params = { ...optionsSearch, ...payload };
      dataRes.value = await axios.get(url.value, activeSerchTearm);
    }
  } catch (error) {
    throw new Error(error);
  }

  watch(enteredSearchTerm, async (val) => {
    if (val === enteredSearchTerm.value) {
      searchUpload(enteredSearchTerm.value);
    }
  });

  function debounce(cb, delay = 1000) {
    let timeout;

    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }

  const mangas = computed(() => {
    if (dataRes.value?.data) return dataRes.value.data;
    return [];
  });

  const pageActive = computed(() => {
    return dataRes.value.body.pagination.current_page;
  });

  const totalPage = computed(() => {
    return dataRes.value.body.pagination.last_visible_page;
  });

  const searchUpload = debounce(async (q) => {
    if (q !== null) {
      activeSerchTearm.params = { ...optionsSearch, q };
      dataRes.value = await axios.get(url.value, activeSerchTearm);
    } else {
      dataRes.value = null;
    }
  });

  return {
    debounce,
    mangas,
    pageActive,
    totalPage,
    searchUpload,
    enteredSearchTerm,
  };
}
