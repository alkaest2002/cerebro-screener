<template>
  <att-item>
    <template #title>{{ i18n.demo.title }}</template>
    <template #explanation="{ itemData }">
      <div class="mt-6">
        <p class="has-text-grey" v-html="itemData.hint" />
      </div>
    </template>
  </att-item>
</template>

<script>
import { tasks as i18n } from "@/i18n/it/views/tasks";
import attItem from "./att-item";

export default {
  // name
  name: "att-demo",

  // components
  components: {
    attItem,
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
