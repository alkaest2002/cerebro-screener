<template>
  <task-presenter>
    <template #presenter>
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
import instructions from "@/views/tasks/instructions";
import end from "@/views/tasks/end";
import survey from "@/views/tasks/survey";
import demo001 from "./demo001";
import demo002 from "./demo002";
import item001 from "./item001";
import item002 from "./item002";

export default {
  // name
  name: "task-mem",

  // components
  components: {
    taskPresenter,
    instructions,
    demo001,
    demo002,
    item001,
    item002,
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
