<template>
  <mul-item>
    <template #title>{{ i18n.title }}</template>
    <template #explanation="{ itemData }">
      <div class="mt-6">
        <p class="has-text-grey" v-html="itemData.hint" />
      </div>
    </template>
  </mul-item>
</template>

<script>
import { demo as i18n } from "@/i18n/it/views/tasks";
import mulItem from "./mul-item";

export default {
  // name
  name: "mul-demo",

  // components
  components: {
    mulItem,
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
