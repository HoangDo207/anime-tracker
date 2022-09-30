import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import FontAwesomeIcon from "./libs/fontAwesome";
import TheHeader from "./components/Layout/TheHeader.vue";
import AppLayout from "./views/appLayout";
import BaseContainer from "./components/UI/BaseContainer.vue";
import ThepaGination from "./components/UI/ThePagination.vue";

const app = createApp(App);

app.use(store);
app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("the-header", TheHeader);
app.component("app-layout", AppLayout);
app.component("base-container", BaseContainer);
app.component("the-pagination", ThepaGination);
router.isReady().then(() => app.mount("#app"));
