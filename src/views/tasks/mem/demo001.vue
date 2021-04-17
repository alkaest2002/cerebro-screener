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
import item from "./item001";

export default {
  // name
  name: "task-mem-ds-demo",

  // components
  components: {
    memItem: item,
  },
};
</script>
