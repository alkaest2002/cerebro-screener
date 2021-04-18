<template>
  <p class="has-text-centered has-text-grey mb-3">
    usa queste tessere per ricopiare la figura A
  </p>
  <div id="reference-tiles" class="is-flex is-justify-content-center">
    <koh-tile
      v-for="tile in referenceTiles"
      :key="tile.index"
      v-bind="{ ...tile, ...$attrs }"
      class="mr-3"
    />
  </div>
</template>

<script>
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
      referenceTiles,
    };
  },
};
</script>
