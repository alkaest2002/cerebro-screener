<template>
  <div id="presenter-wrapper">
    <div id="title" class="mb3">
      <h1 class="is-size-3 has-text-weight-bold">{{ i18n.tasks.title }}</h1>
    </div>
    <div id="presenter" class="mt-3">
      <div class="columns is-tablet is-multiline">
        <task-card
          v-for="(task, index) in battery"
          :key="index"
          :task="task"
          :task-index="index"
          :current-task-index="currentTaskIndex"
          class="column is-one-third"
          @click.prevent="onClickGo({ taskIndex: index, taskKey: task.key })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { battery as i18n } from "@/lang/it/views/battery";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import taskCard from "./_components/task-card";

export default {
  // name
  name: "tasks",

  // components
  components: {
    taskCard,
  },

  // setup
  setup() {
    // use store
    const store = useStore();
    
    // use router
    const router = useRouter();
    
    /// use route
    const route = useRoute();

    // get battery (no need to be reactive)
    const battery = store.state.battery.battery;

    // current task index
    const currentTaskIndex = computed(
      () => store.state.battery.currentTaskIndex || 0
    );

    // handle on click
    const onClickGo = ({ taskIndex, taskKey }) => {
      // persist current task index to vuex
      store.dispatch("battery/setCurrentTaskIndex", taskIndex);
      // go to task
      router.replace({ name: `route-tasks-${taskKey}` });
    };

    // on mounted component, reset task data if query reset is set
    onMounted(() => {
      if (route.query.reset) {
        store.dispatch("blocks/wipe");
        store.dispatch("presenters/wipe");
        store.dispatch("timer/wipe");
      }
    });

    // return setup object
    return {
      i18n,
      battery,
      currentTaskIndex,
      onClickGo,
    };
  },
};
</script>
