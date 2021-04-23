<template>
  <fak-item>
    <template #title>{{ i18n.demo.title }}</template>
    <template #explanation="{ itemData }">
      <div class="mt-6">
        <p class="has-text-grey" v-html="itemData.hint" />
      </div>
    </template>
  </fak-item>
</template>

<script>
import { tasks as i18n } from "@/i18n/it/views/tasks";
import fakItem from "./fak-item";

export default {
  // name
  name: "fak-demo",

  // components
  components: {
    fakItem,
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
