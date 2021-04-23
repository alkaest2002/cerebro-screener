<template>
  <koh-item>
    <template #title>{{ i18n.demo.title }}</template>
    <template #explanation="{ itemData }">
      <div class="mt-6">
        <p class="has-text-grey" v-html="itemData.hint" />
      </div>
    </template>
  </koh-item>
</template>

<script>
import { tasks as i18n } from "@/i18n/it/views/tasks";
import kohItem from "./koh-item";

export default {
  // name
  name: "koh-demo",

  // components
  components: {
    kohItem,
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
