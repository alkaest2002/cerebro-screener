import { store } from "@/store";
import { shuffle } from "@/utils/utilityFns";
import battery from "@/views/battery/battery";

export default [
  {
    path: "/battery",
    name: "route-battery-battery",
    component: battery,
    children: [
      {
        path: "bio",
        name: "route-battery-bio",
        component: () =>
          import(/* webpackChunkName: "battery" */ "@/views/battery/bio"),
        beforeEnter: (to, from, next) => {
          // skip battery build process, if testee data is set
          if (store.state.testee.testee.id) return next();
          // get tasks from templateBattery
          let tasks = store.state.battery.templateBattery;
          // default to all available tasks
          if (tasks.length == 0)
            tasks = store.getters["catalogue/getAvailableTasks"];
          // get shuffle schema
          let shuffleSchema =
            store.state.battery.shuffleSchema.length == 0
              ? Array.from({ length: tasks.length }, () => true)
              : store.state.battery.shuffleSchema;
          // build battery
          const battery = shuffle(tasks, shuffleSchema);
          // persist battery to vuex
          store.dispatch("battery/setBattery", battery);
          // continue
          return next();
        },
      },
      {
        path: "tasks",
        name: "route-battery-tasks",
        component: () =>
          import(/* webpackChunkName: "battery" */ "@/views/battery/tasks"),
        beforeEnter: (to, from, next) => {
          // get last task
          const lastTask = store.getters["battery/getLastTask"];
          // go to battery end under these conditions
          if (
            [
              from.name == `route-tasks-${lastTask.key}`,
              store.state.battery.hasEnded,
            ].some((e) => e)
          )
            // go to end of battery
            return next({ name: "route-battery-end" });
          // continue
          return next();
        },
      },
      {
        path: "task/next",
        name: "route-battery-next-task",
        redirect: () => {
          // go to battery end if it's the case
          if (
            store.state.battery.currentTaskIndex + 1 ==
            store.state.battery.battery.length
          )
            return { name: "route-battery-end" };
          // set next task
          store.dispatch(
            "battery/setCurrentTaskIndex",
            store.state.battery.currentTaskIndex + 1
          );
          // redirect
          return { name: "route-battery-tasks", query: { reset: true } };
        },
      },
      {
        path: "end",
        name: "route-battery-end",
        component: () =>
          import(/* webpackChunkName: "battery" */ "@/views/battery/end"),
        beforeEnter: (to, from, next) => {
          // persist battery has ended
          store.dispatch("battery/setHasEnded", true);
          // continue
          next();
        },
      },
    ],
  },
];
