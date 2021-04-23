<template>
  <iow-item>
    <template #title>{{ i18n.tasks.demo.title }}</template>
    <template #explanation="{ itemData }">
      <div class="mt-6">
        <p class="has-text-grey" v-html="itemData.hint" />
      </div>
    </template>
  </iow-item>
</template>

<script>
import { tasks as i18n } from "@/i18n/it/views/tasks";
import iowItem from "./iow-item";

export default {
  // name
  name: "iow-demo",

  // components
  components: {
    iowItem,
  },

  // setup
  setup() {
    // return setup object
    return {
      i18n,
    };
  },
};
</script>
