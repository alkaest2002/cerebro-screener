<template>
  <wcs-item>
    <template #title>{{ i18n.demo.title }}</template>
    <template #explanation="{ itemData }">
      <div class="mt-6">
        <p class="has-text-grey" v-html="itemData.hint" />
      </div>
    </template>
  </wcs-item>
</template>

<script>
import { tasks as i18n } from "@/i18n/it/views/tasks";
import wcsItem from "./wcs-item";

export default {
  // name
  name: "wcs-demo",

  // components
  components: {
    wcsItem,
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
