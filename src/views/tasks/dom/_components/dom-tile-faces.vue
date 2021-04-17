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
        @dragstart="$emit('dragstart', dots)"
        class="dots m-1 is-clickable"
      />
    </div>
  </div>
</template>

<script>
import domTileFace from "./dom-tile-face";

export default {
  // name
  name: "task-dom-component-tile-faces",

  // do not inherit attrs
  inheritAttrs: false,

  // components
  components: {
    domTileFace,
  },
};
</script>

<style lang="scss" scoped>
.dots {
  background-color: #ddd !important;
}
</style>
