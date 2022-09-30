import { useRouter } from "vue-router";
const router = useRouter();

export default async function pagechanged(page) {
  console.log(page);
  router.push({
    name: "genres",
    query: { page: page },
  });
  window.location.reload();
}
