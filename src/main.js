import { createApp } from "vue";
import { store } from "@/store";
import app from "./app.vue";
import router from "@/router";
import baseLayout from "@/views/_components/base-layout";
import loadingButton from "@/views/_components/loading-button";

// bulma
require("./assets/sass/bulma.scss");

// create app with vuex store and router
const vueApp = createApp(app).use(store).use(router);

// add global components
vueApp.component("base-layout", baseLayout);
vueApp.component("loading-button", loadingButton);

// mount app
vueApp.mount("#app");
