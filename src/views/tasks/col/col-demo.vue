<template>
  <col-item>
    <template #title>{{ i18n.title }}</template>
    <template #explanation="{ itemData }">
      <div class="mt-6">
        <p class="has-text-grey" v-html="itemData.hint" />
      </div>
    </template>
  </col-item>
</template>

<script>
import { demo as i18n } from "@/i18n/it/views/tasks";
import colItem from "./col-item";

export default {
  // name
  name: "task-col-demo",

  // components
  components: {
    colItem,
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
