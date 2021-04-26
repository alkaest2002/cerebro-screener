import { store } from "@/store";
import admin from "@/views/admin/admin";

export default [
  {
    path: "/admin",
    name: "route-admin",
    component: admin,
    children: [
      {
        path: "login",
        name: "route-admin-login",
        component: () =>
          import(/* webpackChunkName: "admin" */ "@/views/admin/login"),
      },
      {
        path: "create/battery",
        name: "route-admin-create-battery",
        component: () =>
          import(
            /* webpackChunkName: "admin" */ "@/views/admin/create-battery"
          ),
        beforeEnter: (to, from, next) => {
          // if testee is present
          if (store.state.testee.testee.id)
            // go to running battery route
            return next({ name: "route-admin-manage-session" });
          // go to requested route
          return next();
        },
      },
      {
        path: "manage/session",
        name: "route-admin-manage-session",
        component: () =>
          import(
            /* webpackChunkName: "admin" */ "@/views/admin/manage-session"
          ),
        beforeEnter: (to, from, next) => {
          // if testee is not present
          if (!store.state.testee.testee.id)
            // go to create battery
            return next({ name: "route-admin-create-battery" });
          // go to requested route
          return next();
        },
      },
      {
        path: "save/data",
        name: "route-admin-save-data",
        component: () =>
          import(/* webpackChunkName: "admin" */ "@/views/admin/save-data"),
      },
      {
        path: "reset/battery",
        name: "route-admin-reset-battery",
        redirect: () => {
          // reset battery
          store.dispatch("testee/wipe");
          store.dispatch("battery/wipe");
          store.dispatch("blocks/wipe");
          store.dispatch("presenters/wipe");
          store.dispatch("answers/wipe");
          store.dispatch("timer/wipe");
          // redirect
          return { name: "route-main-home" };
        },
      },
    ],
  },
];
