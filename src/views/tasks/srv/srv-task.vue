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
import { getTaskData } from "./srv-setup";
import initTask from "@/views/tasks/_composables/initTask";
import taskPresenter from "@/views/tasks/_components/task-presenter";
import instructions from "@/views/tasks/task-instructions";
import end from "@/views/tasks/task-end";
import survey from "./srv-survey";

export default {
  // name
  name: "srv-task",

  // components
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
