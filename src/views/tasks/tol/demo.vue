<template>
  <tol-item>
    <template #title> Versione demo </template>
    <template #explanation>
      <div class="mt-6">
        <p class="has-text-grey">
          Nell'esempio proposto qui sopra, il tuo compito è quello di spostare i
          dischi colorati della figura B, in modo da ottenere la stessa
          configurazione della figura A. Tieni presente che puoi spostare solo i
          dischi che si trovano in cima a ogni pila. Nella configurazione
          iniziale della figura B, ad esempio, non puoi spostare il disco rosso.
          Cerca di ottenere la figura A compiendo il minor numero di mosse.
        </p>
      </div>
    </template>
  </tol-item>
</template>

<script>
import item from "./item";

export default {
  // name
  name: "task-tol-demo",

  // components
  components: {
    tolItem: item,
  },
};
</script>
