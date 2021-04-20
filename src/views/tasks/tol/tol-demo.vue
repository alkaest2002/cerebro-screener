<template>
  <tol-item>
    <template #title> Versione demo </template>
    <template #explanation="{ itemData }">
      <div class="mt-6">
        <p class="has-text-grey" v-html="itemData.hint" />
      </div>
    </template>
  </tol-item>
</template>

<script>
import tolItem from "./tol-item";

export default {
  // name
  name: "tol-demo",

  // components
  components: {
    tolItem,
  },
};
</script>
