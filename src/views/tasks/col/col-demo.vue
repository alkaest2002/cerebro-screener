<template>
  <col-item>
    <template #title> Versione demo </template>
    <template #explanation="{ itemData }">
      <div class="mt-6">
        <p class="has-text-grey" v-html="itemData.hint" />
      </div>
    </template>
  </col-item>
</template>

<script>
import colItem from "./col-item";

export default {
  // name
  name: "task-col-demo",

  // components
  components: {
    colItem,
  },
};
</script>
