<template>
  <iow-item>
    <template #title> Versione demo </template>
    <template #explanation>
      <div class="mt-6">
        <p class="has-text-grey">Nell'esempio proposto qui sopra...</p>
      </div>
    </template>
  </iow-item>
</template>

<script>
import iowItem from "./iow-item";

export default {
  // name
  name: "iow-demo",

  // components
  components: {
    iowItem,
  },
};
</script>
