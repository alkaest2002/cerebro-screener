import { store } from "@/store";
import task from "@/views/tasks/task";

const taskGuard = (to, from, next) => {
  const currentTaskKey = store.getters["battery/getCurrentTask"].key;
  if (to.name.includes(currentTaskKey)) {
    next();
  } else {
    next({ name: `route-tasks-${currentTaskKey}` });
  }
};

export default [
  {
    path: "/tasks",
    name: "route-tasks",
    component: task,
    beforeEnter: (to, from, next) => {
      // go to main home under these conditions
      if (
        [
          store.state.battery.battery.length == 0,
          store.state.testee.testee.id === null,
          store.state.battery.hasEnded,
        ].some((e) => e)
      )
        return next({ name: "route-main-home" });
      // go to route
      return next();
    },
    children: [
      {
        path: "att",
        name: "route-tasks-att",
        component: () =>
          import(/* webpackChunkName: "att-task" */ "@/views/tasks/att/att-task"),
        beforeEnter: taskGuard,
      },
      {
        path: "col",
        name: "route-tasks-col",
        component: () =>
          import(/* webpackChunkName: "col-task" */ "@/views/tasks/col/col-task"),
        beforeEnter: taskGuard,
      },
      {
        path: "dom",
        name: "route-tasks-dom",
        component: () =>
          import(/* webpackChunkName: "dom-task" */ "@/views/tasks/dom/dom-task"),
        beforeEnter: taskGuard,
      },
      {
        path: "fak",
        name: "route-tasks-fak",
        component: () =>
          import(/* webpackChunkName: "fak-task" */ "@/views/tasks/fak/fak-task"),
        beforeEnter: taskGuard,
      },
      {
        path: "iow",
        name: "route-tasks-iow",
        component: () =>
          import(/* webpackChunkName: "iow-task" */ "@/views/tasks/iow/iow-task"),
        beforeEnter: taskGuard,
      },
      {
        path: "koh",
        name: "route-tasks-koh",
        component: () =>
          import(/* webpackChunkName: "koh-task" */ "@/views/tasks/koh/koh-task"),
        beforeEnter: taskGuard,
      },
      {
        path: "mem",
        name: "route-tasks-mem",
        component: () =>
          import(/* webpackChunkName: "mem-task" */ "@/views/tasks/mem/mem-task"),
        beforeEnter: taskGuard,
      },
      {
        path: "srv",
        name: "route-tasks-srv",
        component: () =>
          import(/* webpackChunkName: "srv-task" */ "@/views/tasks/srv/srv-task"),
        beforeEnter: taskGuard,
      },
      {
        path: "tol",
        name: "route-tasks-tol",
        component: () =>
          import(/* webpackChunkName: "tol-task" */ "@/views/tasks/tol/tol-task"),
        beforeEnter: taskGuard,
      },
      {
        path: "wcs",
        name: "route-tasks-wcs",
        component: () =>
          import(/* webpackChunkName: "wcs-task" */ "@/views/tasks/wcs/wcs-task"),
        beforeEnter: taskGuard,
      },
      {
        path: "end",
        name: "route-task-end",
        component: () =>
          import(/* webpackChunkName: "task-en" */ "@/views/tasks/task-end"),
      },
    ],
  },
];
