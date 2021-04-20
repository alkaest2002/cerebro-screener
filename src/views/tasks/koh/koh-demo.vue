<template>
  <koh-item>
    <template #title> Versione demo </template>
    <template #explanation="{ itemData }">
      <div class="mt-6">
        <p class="has-text-grey" v-html="itemData.hint" />
      </div>
    </template>
  </koh-item>
</template>

<script>
import kohItem from "./koh-item";

export default {
  // name
  name: "koh-demo",

  // components
  components: {
    kohItem,
  },
};
</script>
