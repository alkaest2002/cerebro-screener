<template>
  <div :class="{ [figureType]: true }" class="figure is-flex is-flex-wrap-wrap">
    <koh-tile
      v-for="tile in figureTiles"
      :key="tile.index"
      v-bind="{ ...tile, ...$attrs }"
    />
  </div>
</template>

<script>
import kohTile from "./koh-tile";

export default {
  // name
  name: "koh-figure",

  // components
  components: {
    kohTile,
  },

  // do not inherit attribs
  inheritAttrs: false,

  // props
  props: {
    figureType: {
      type: String,
      required: true,
      validator: (value) => {
        return ["tiles-4", "tiles-9", "tiles-16"].includes(value);
      },
    },
    figureTiles: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
$tile-dim: 60px;

.figure {
  &.tiles-4 {
    height: 2 * $tile-dim;
    width: 2 * $tile-dim;
  }

  &.tiles-9 {
    height: 3 * $tile-dim;
    width: 3 * $tile-dim;
  }

  &.tiles-16 {
    height: 4 * $tile-dim;
    width: 4 * $tile-dim;
  }
}
</style>
