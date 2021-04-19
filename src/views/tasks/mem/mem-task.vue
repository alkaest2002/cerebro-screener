<template>
  <task-presenter>
    <template #presenter="{ presenter }">
      <transition name="fade" mode="out-in" appear>
        <div id="presenter-cointainer" :key="presenter.id" class="is-relative">
          <component :is="presenter.component" :presenter="presenter" />
        </div>
      </transition>
    </template>
  </task-presenter>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import { getTaskData } from "./setup";
import initTask from "@/views/tasks/_composables/initTask";
import taskPresenter from "@/views/tasks/_components/task-presenter";
import instructions from "@/views/tasks/task-instructions";
import end from "@/views/tasks/task-end";
import survey from "@/views/tasks/task-survey";
import cbDemo from "./mem-cb-demo";
import cbItem from "./mem-cb-item";
import dsDemo from "./mem-ds-demo";
import dsItem from "./mem-ds-item";

export default {
  // name
  name: "task-mem",

  // components
  components: {
    taskPresenter,
    instructions,
    dsDemo,
    dsItem,
    cbDemo,
    cbItem,
    survey,
    end,
  },

  // setup
  setup() {
    // init task
    initTask(getTaskData());
  },
};
</script>
