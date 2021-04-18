<template>
  <att-item>
    <template #title> Versione demo </template>
    <template #explanation>
      <div class="mt-6">
        <p class="has-text-grey">
          Nell'esempio proposto qui sopra, è presente un griglia 3x3 con dei
          numeri all'interno. Partendo dal numero 1, clicca tutti i numeri in
          sequenza, facendo attenzione a non saltarne nessuno. In caso di
          errore, sotto la griglia è presente l'indicazione del numero
          successivo da cliccare. Procedi fino al completo esaurimento della
          griglia.
        </p>
      </div>
    </template>
  </att-item>
</template>

<script>
import attItem from "./att-item";

export default {
  // name
  name: "att-demo",

  // components
  components: {
    attItem,
  },
};
</script>
