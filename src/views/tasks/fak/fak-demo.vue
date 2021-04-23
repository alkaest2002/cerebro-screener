<template>
  <fak-item>
    <template #title> Versione demo </template>
    <template #explanation="{ itemData }">
      <div class="mt-6">
        <p class="has-text-grey" v-html="itemData.hint" />
      </div>
    </template>
  </fak-item>
</template>

<script>
import fakItem from "./fak-item";

export default {
  // name
  name: "fak-demo",

  // components
  components: {
    fakItem,
  },
};
</script>
