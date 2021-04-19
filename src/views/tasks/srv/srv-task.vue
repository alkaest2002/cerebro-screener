<template>
  <task-presenter>
    <template #presenter="{ presenter }">
      <transition name="fade" mode="out-in" appear>
        <div id="presenter-cointainer" class="is-relative" :key="presenter.id">
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
import survey from "./srv-survey";
import end from "@/views/tasks/task-end";

export default {
  // name
  name: "srv-task",

  components: {
    taskPresenter,
    instructions,
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
