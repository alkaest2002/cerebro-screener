<template>
  <koh-item>
    <template #title> Versione demo </template>
    <template #explanation>
      <div class="mt-6">
        <p class="has-text-grey">
          Nell'esempio proposto qui sopra, La figura B deve esser uguale alla
          figura A. Per ottenere questo risultato, trascina una tessera
          giallo-blu nella figura B, in alto a sinistra. Una volta collocata la
          tessera in posizione, ruotala in modo opportuno. Completa la figura
          aggiungendo le tre tessere mancanti.
        </p>
      </div>
    </template>
  </koh-item>
</template>

<script>
import kohItem from "./koh-item";

export default {
  // name
  name: "koh-demo",

  // components
  components: {
    kohItem,
  },
};
</script>
