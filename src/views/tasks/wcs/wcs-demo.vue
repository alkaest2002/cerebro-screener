<template>
  <wcs-item>
    <template #title> Versione demo </template>
    <template #explanation="{ itemData }">
      <div class="mt-6">
        <p class="has-text-grey" v-html="itemData.hint" />
      </div>
    </template>
  </wcs-item>
</template>

<script>
import wcsItem from "./wcs-item";

export default {
  // name
  name: "wcs-demo",

  // components
  components: {
    wcsItem,
  },
};
</script>
