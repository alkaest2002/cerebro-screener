<template>
  <col-item>
    <template #title> Versione demo </template>
    <template #explanation>
      <div class="mt-6">
        <p class="has-text-grey">Nell'esempio proposto,...</p>
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
