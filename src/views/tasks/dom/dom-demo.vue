<template>
  <dom-item>
    <template #title> Versione demo </template>
    <template #explanation>
      <div class="mt-6">
        <p class="has-text-grey">
          Nell'esempio proposto, le tessere in alto sembrano alternarsi.
          Trascina sulle facce dell'ultima tessera (quella con i punti
          interrogativi), i numeri che ritieni completino la serie.
        </p>
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
