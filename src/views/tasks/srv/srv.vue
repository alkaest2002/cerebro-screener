<template>
  <task-presenter>
    <template #presenter>
      <transition name="fade" mode="out-in" appear>
        <div class="is-relative" id="presenter-cointainer" :key="presenter.id">
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
import instructions from "@/views/tasks/instructions";
import end from "@/views/tasks/end";
import survey from "./survey";

export default {
  // name
  name: "task-srv",

  components: {
    taskPresenter,
    instructions,
    survey,
    end,
  },

  // setup
  setup() {
    // init task
    const { presenter } = initTask(getTaskData);

    // return setup object
    return {
      presenter,
    };
  },
};
</script>
