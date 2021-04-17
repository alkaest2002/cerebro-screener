<template>
  <wcs-item>
    <template #title> Versione demo </template>
    <template #explanation>
      <div class="mt-6">
        <p class="has-text-grey">Nell'esempio proposto qui sopra...</p>
      </div>
    </template>
  </wcs-item>
</template>

<script>
import item from "./item";

export default {
  // name
  name: "task-wcs-demo",

  // components
  components: {
    wcsItem: item,
  },
};
</script>
