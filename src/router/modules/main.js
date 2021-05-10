import { store } from "@/store";
import home from "@/views/main/home";
import about from "@/views/main/about";

export default [
  {
    path: "/",
    name: "route-main-home",
    component: home,
    beforeEnter: (to, from, next) => {
      // reset test data under these conditions
      if ([
        from.name == "route-admin-save-data",
        store.state.answers.saveOp.local.isOk || store.state.answers.saveOp.server.isOk,
      ].every((e) => e))
        return next({ name: "route-admin-reset-battery" });
      // next
      return next();
    },
  },
  {
    path: "/about",
    name: "route-main-about",
    component: about,
  },
];
