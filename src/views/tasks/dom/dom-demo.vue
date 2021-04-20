<template>
  <dom-item>
    <template #title> Versione demo </template>
    <template #explanation="{ itemData }">
      <div class="mt-6">
        <p class="has-text-grey" v-html="itemData.hint" />
      </div>
    </template>
  </dom-item>
</template>

<script>
import domItem from "./dom-item";

export default {
  // name
  name: "dom-demo",

  // components
  components: {
    domItem,
  },
};
</script>
