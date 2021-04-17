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
          import(/* webpackChunkName: "task-att" */ "@/views/tasks/att/att"),
        beforeEnter: taskGuard,
      },
      {
        path: "col",
        name: "route-tasks-col",
        component: () =>
          import(/* webpackChunkName: "task-col" */ "@/views/tasks/col/col"),
        beforeEnter: taskGuard,
      },
      {
        path: "dom",
        name: "route-tasks-dom",
        component: () =>
          import(/* webpackChunkName: "task-dom" */ "@/views/tasks/dom/dom"),
        beforeEnter: taskGuard,
      },
      {
        path: "fak",
        name: "route-tasks-fak",
        component: () =>
          import(/* webpackChunkName: "task-fak" */ "@/views/tasks/fak/fak"),
        beforeEnter: taskGuard,
      },
      {
        path: "iow",
        name: "route-tasks-iow",
        component: () =>
          import(/* webpackChunkName: "task-iow" */ "@/views/tasks/iow/iow"),
        beforeEnter: taskGuard,
      },
      {
        path: "koh",
        name: "route-tasks-koh",
        component: () =>
          import(/* webpackChunkName: "task-koh" */ "@/views/tasks/koh/koh"),
        beforeEnter: taskGuard,
      },
      {
        path: "mem",
        name: "route-tasks-mem",
        component: () =>
          import(/* webpackChunkName: "task-mem" */ "@/views/tasks/mem/mem"),
        beforeEnter: taskGuard,
      },
      {
        path: "srv",
        name: "route-tasks-srv",
        component: () =>
          import(/* webpackChunkName: "task-srv" */ "@/views/tasks/srv/srv"),
        beforeEnter: taskGuard,
      },
      {
        path: "tol",
        name: "route-tasks-tol",
        component: () =>
          import(/* webpackChunkName: "task-tol" */ "@/views/tasks/tol/tol"),
        beforeEnter: taskGuard,
      },
      {
        path: "wcs",
        name: "route-tasks-wcs",
        component: () =>
          import(/* webpackChunkName: "task-wcs" */ "@/views/tasks/wcs/wcs"),
        beforeEnter: taskGuard,
      },
      {
        path: "end",
        name: "route-task-end",
        component: () =>
          import(/* webpackChunkName: "task" */ "@/views/tasks/end"),
      },
    ],
  },
];
