<template>
  <dom-item>
    <template #title> Versione demo </template>
    <template #explanation>
      <div class="mt-6">
        <p class="has-text-grey">
          <b>Come devi procedere</b>: individua il criterio che lega tra loro le
          tessere in alto e completa la tessera mancante. Trascina e rilascia
          sulle facce dell'ultima tessera (quella con i punti interrogativi), i
          numeri che ritieni completino la serie. Se sbagli, puoi trascinare
          nuovi numeri su quelli che intendi cambiare.
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
