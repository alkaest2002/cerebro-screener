<template>
  <mem-item>
    <template #title>{{ i18n.title }}</template>
    <template #explanation="{ itemData }">
      <div class="mt-6">
        <p class="has-text-grey" v-html="itemData.hint" />
      </div>
    </template>
  </mem-item>
</template>

<script>
import { demo as i18n } from "@/i18n/it/views/tasks";
import memItem from "./mem-cb-item";

export default {
  // name
  name: "mem-cb-demo",

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
