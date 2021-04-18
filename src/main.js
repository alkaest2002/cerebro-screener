import { createApp } from "vue";
import { store } from "@/store";

import app from "./app.vue";
import router from "@/router";

// import global components
import baseLayout from "@/views/_components/base-layout";
import loadingButton from "@/views/_components/loading-button";

// add bulma
require("./assets/sass/bulma.scss");

// create app
const vueApp = createApp(app).use(store).use(router);

// add global components
vueApp.component("baseLayout", baseLayout);
vueApp.component("loadingButton", loadingButton);

// mount app
vueApp.mount("#app");
