<template>
  <base-survey>
    <div class="block">
      <p v-html="i18n.tasks.srv.message" />
    </div>
  </base-survey>
</template>

<script>
import { tasks as i18n } from "@/i18n/it/views/tasks";
import survey from "@/views/tasks/task-survey";

export default {
  // name
  name: "srv-survey",

  // components
  components: {
    baseSurvey: survey,
  },

  //setup
  setup() {
    // return setuo object
    return {
      i18n,
    };
  },
};
</script>
