import { createRouter, createWebHashHistory } from "vue-router";
import pageNotFound from "@/views/errors/page-not-found";

// imports routes
import main from "./modules/main";
import admin from "./modules/admin";
import battery from "./modules/battery";
import tasks from "./modules/tasks";

// concatenate routes
const routes = [
  ...main,
  ...admin,
  ...battery,
  ...tasks,
  {
    path: "/:catchAll(.*)",
    name: "route-not-found",
    component: pageNotFound,
  },
];

// create router
export default createRouter({ history: createWebHashHistory(), routes });
