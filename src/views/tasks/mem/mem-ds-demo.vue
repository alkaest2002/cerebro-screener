<template>
  <mem-item>
    <template #title>{{ i18n.tasks.demo.title }}</template>
    <template #explanation="{ itemData }">
      <div class="mt-6">
        <p class="has-text-grey" v-html="itemData.hint" />
      </div>
    </template>
  </mem-item>
</template>

<script>
import { tasks as i18n } from "@/i18n/it/views/tasks";
import memItem from "./mem-ds-item";

export default {
  // name
  name: "mem-ds-demo",

  // components
  components: {
    memItem,
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
