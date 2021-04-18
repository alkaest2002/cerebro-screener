<template>
  <div>
    <small class="is-block mt-6 mb-2 has-text-grey has-text-centered">
      trascina questi numeri per<br />completare la tessera mancante
    </small>
    <div
      style="width: 200px; margin: auto"
      class="is-flex is-align-content-space-around is-justify-content-center is-flex-wrap-wrap"
    >
      <dom-tile-face
        v-for="dots in [1, 2, 3, 4, 5, 6, 0]"
        :key="dots"
        :dots="dots"
        :is-locked="false"
        :is-draggable="true"
        class="dots m-1 is-clickable"
        @dragstart="$emit('dragstart', dots)"
      />
    </div>
  </div>
</template>

<script>
import domTileFace from "./dom-tile-face";

export default {
  // name
  name: "dom-tile-faces",

  // components
  components: {
    domTileFace,
  },

  // do not inherit attrs
  inheritAttrs: false,

  // emitted event
  emits: {
    dragstart: null,
  },
};
</script>

<style lang="scss" scoped>
.dots {
  background-color: #ddd !important;
}
</style>
