<template>
  <div>
    <small
      class="is-block mt-6 mb-2 has-text-grey has-text-centered"
      v-html="i18n.useTheseNumbers"
    />
    <div
      style="width: 200px; margin: auto"
      class="
        is-flex
        is-align-content-space-around
        is-justify-content-center
        is-flex-wrap-wrap
      "
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
import { domTileFaces as i18n } from "@/i18n/it/views/tasks";
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
    i18n,
    dragstart: null,
  },

  // setup
  setup() {
    // return setup object
    return {
      i18n,
    };
  },
};
</script>

<style lang="scss" scoped>
.dots {
  background-color: #ddd !important;
}
</style>
