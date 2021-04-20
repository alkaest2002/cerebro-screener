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
import { getTaskData } from "@/setup/tasks/fak-setup";
import initTask from "@/views/tasks/_composables/initTask";
import taskPresenter from "@/views/tasks/_components/task-presenter";
import instructions from "@/views/tasks/task-instructions";
import survey from "@/views/tasks/task-survey";
import end from "@/views/tasks/task-end";
import demo from "./fak-demo";
import item from "./fak-item";

export default {
  // name
  name: "fak-task",

  // components
  components: {
    taskPresenter,
    instructions,
    demo,
    item,
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
