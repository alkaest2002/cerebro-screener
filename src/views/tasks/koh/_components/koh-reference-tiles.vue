<template>
  <div id="reference-tiles" class="is-flex is-justify-content-center">
    <koh-tile
      v-for="tile in referenceTiles"
      :key="tile.index"
      v-bind="{ ...tile, ...$attrs }"
      class="mr-3"
    />
  </div>
  <p class="has-text-centered has-text-grey mt-3">
    {{ i18n.tiles }}
  </p>
</template>

<script>
import { kohReferenceTiles as i18n } from "@/i18n/it/views/tasks";
import kohTile from "./koh-tile";

export default {
  // name
  name: "koh-reference-tiles",

  // components
  components: {
    kohTile,
  },

  // do not inherit attrs
  inheritAttrs: false,

  // setup
  setup() {
    // reference tiles
    const referenceTiles = [
      "red",
      "blue",
      "yellow",
      "white",
      "red-white",
      "yellow-blue",
    ].map((e, idx) => {
      return {
        tileIndex: idx,
        tileType: "reference",
        tileColor: e,
        tileRotation: "clock-0",
      };
    });

    // return setup object
    return {
      i18n,
      referenceTiles,
    };
  },
};
</script>
