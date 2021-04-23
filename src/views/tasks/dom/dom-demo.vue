<template>
  <dom-item>
    <template #title>{{ i18n.tasks.demo.title }}</template>
    <template #explanation="{ itemData }">
      <div class="mt-6">
        <p class="has-text-grey" v-html="itemData.hint" />
      </div>
    </template>
  </dom-item>
</template>

<script>
import { tasks as i18n } from "@/i18n/it/views/tasks";
import domItem from "./dom-item";

export default {
  // name
  name: "dom-demo",

  // components
  components: {
    domItem,
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
