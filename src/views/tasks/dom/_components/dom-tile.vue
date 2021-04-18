<template>
  <div class="piece mx-3">
    <div class="up is-relative">
      <dom-tile-face
        :dots="tile[0]"
        v-bind="$attrs"
        style="border: none"
        @drop="$emit('dropped-dots', 0)"
      />
    </div>
    <div class="down is-relative">
      <dom-tile-face
        :dots="tile[1]"
        v-bind="$attrs"
        style="border: none"
        @drop="$emit('dropped-dots', 1)"
      />
    </div>
  </div>
</template>

<script>
import domTileFace from "./dom-tile-face";

export default {
  // name
  name: "task-dom-component-tile",

  // components
  components: {
    domTileFace,
  },

  // do not inherit attrs
  inheritAttrs: false,

  // props
  props: {
    tile: {
      type: Array,
      required: true,
    },
  },

  // emitted events
  emits: {
    "dropped-dots": (value) => [0, 1].includes(value),
  },
};
</script>

<style lang="scss" scoped>
$border-color: #333;

.piece {
  height: 118px;
  width: 60px;
  margin: 0 5px;
  border-radius: 5px;

  & > div {
    border: 2px solid $border-color;
    z-index: 2;
    overflow: hidden;
  }

  .up {
    border-bottom: none;
    border-radius: 5px 5px 0 0;
    background-color: #fff;
  }

  .down {
    border-radius: 0 0 5px 5px;
    background-color: #fff;
  }
}
</style>
