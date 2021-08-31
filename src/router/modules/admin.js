import { store } from "@/store";
import admin from "@/views/admin/admin";

export default [
  {
    path: "/admin",
    name: "route-admin",
    component: admin,
    redirect: { name: "route-admin-login" },
    children: [
      {
        path: "login",
        name: "route-admin-login",
        component: () =>
          import(/* webpackChunkName: "admin" */ "@/views/admin/login"),
        beforeEnter: (to, from, next) => {
          // under these conditions
          if (
            [
              from.name == "route-admin-save-data",
              store.state.answers.saveOp.local.isOk ||
                store.state.answers.saveOp.server.isOk,
            ].every((e) => e)
          )
            // reset test data, then go to admin
            return next({
              name: "route-admin-reset-battery",
              params: { next: "route-admin-login" },
            });
          // next
          return next();
        },
      },
      {
        path: "create/battery",
        name: "route-admin-create-battery",
        component: () =>
          import(
            /* webpackChunkName: "admin" */ "@/views/admin/create-battery"
          ),
        beforeEnter: (to, from, next) => {
          // must come from login page or from manage session
          if (
            !["route-admin-login", "route-admin-manage-session"].some(
              (e) => from.name == e
            )
          )
            // go to admin
            return next({ name: "route-admin-login" });
          // under these conditions
          if (
            [
              store.state.testee.testee.id,
              from.name != "route-admin-manage-session",
            ].every((e) => e)
          )
            // go to manage session route
            return next({ name: "route-admin-manage-session" });
          // otherwise go to route
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
          // must come from login page
          if (from.name != "route-admin-login")
            return next({ name: "route-admin-login" });
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
        beforeEnter: (to, from, next) => {
          // must come from login page
          if (from.name != "route-admin-login")
            return next({ name: "route-admin-login" });
          // go to route
          return next();
        },
      },
      {
        path: "reset/battery/next/:next?",
        name: "route-admin-reset-battery",
        redirect: (to) => {
          // reset battery
          store.dispatch("testee/wipe");
          store.dispatch("battery/wipe");
          store.dispatch("blocks/wipe");
          store.dispatch("presenters/wipe");
          store.dispatch("answers/wipe");
          store.dispatch("timer/wipe");
          const name = to.params?.next || "route-main-home";
          // redirect
          return { name };
        },
      },
    ],
  },
];
