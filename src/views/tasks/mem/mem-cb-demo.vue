<template>
  <mem-item>
    <template #title> Versione demo </template>
    <template #explanation>
      <div class="mt-6">
        <p class="has-text-grey">Nell'esempio proposto, ...</p>
      </div>
    </template>
  </mem-item>
</template>

<script>
import memItem from "./mem-cb-item";

export default {
  // name
  name: "mem-cb-demo",

  // components
  components: {
    memItem,
  },
};
</script>
