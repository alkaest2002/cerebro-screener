<template>
  <att-item>
    <template #title> Versione demo </template>
    <template #explanation="{ itemData }">
      <div class="mt-6">
        <p class="has-text-grey" v-html="itemData.hint" />
      </div>
    </template>
  </att-item>
</template>

<script>
import attItem from "./att-item";

export default {
  // name
  name: "att-demo",

  // components
  components: {
    attItem,
  },
};
</script>
