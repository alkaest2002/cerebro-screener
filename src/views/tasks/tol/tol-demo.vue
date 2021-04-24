<template>
  <tol-item>
    <template #title>{{ i18n.title }}</template>
    <template #explanation="{ itemData }">
      <div class="mt-6">
        <p class="has-text-grey" v-html="itemData.hint" />
      </div>
    </template>
  </tol-item>
</template>

<script>
import { demo as i18n } from "@/i18n/it/views/tasks";
import tolItem from "./tol-item";

export default {
  // name
  name: "tol-demo",

  // components
  components: {
    tolItem,
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
