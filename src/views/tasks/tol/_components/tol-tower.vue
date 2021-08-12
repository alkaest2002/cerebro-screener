<template>
  <div class="is-flex is-align-items-flex-end">
    <div
      v-for="(discs, outerIndex) in tower"
      :key="outerIndex"
      :style="`height: ${240 - outerIndex * 77}px`"
      class="
        peg
        mx-1
        is-flex
        is-flex-wrap-wrap
        is-flex-direction-column
        is-justify-content-flex-end
        is-align-self-flex-end
      "
      @dragenter.prevent="void 0"
      @dragover.prevent="void 0"
      @dragstart="onDiscDragged(outerIndex)"
      @drop="onDiscDropped(outerIndex)"
    >
      <tol-disc
        v-for="(disc, innerIndex) in discs"
        :key="innerIndex"
        :disc-color="disc"
        :is-locked="isLocked || innerIndex > 0"
        class="disc"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import tolDisc from "./tol-disc";

export default {
  // name
  name: "tol-tower",

  // components
  components: {
    tolDisc,
  },

  // props
  props: {
    tower: {
      type: Array,
      required: true,
    },

    isLocked: {
      type: Boolean,
      required: true,
    },
  },

  // emitted events
  emits: {
    "disc-dropped": (value) =>
      ["pegFrom", "pegTo"].every((e) => Object.keys(value).includes(e)),
  },

  // setup
  setup(props, { emit }) {
    // dragged disc index
    const draggedPegIndex = ref(null);

    // handle on drag disc
    const onDiscDragged = (pegIndex) => {
      draggedPegIndex.value = pegIndex;
    };

    // handle on drop disc
    const onDiscDropped = (pegIndex) => {
      emit("disc-dropped", {
        pegFrom: draggedPegIndex.value,
        pegTo: pegIndex,
      });
    };

    // return setup object
    return {
      onDiscDragged,
      onDiscDropped,
    };
  },
};
</script>

<style lang="scss" scoped>
.peg {
  width: 100px;
  padding: 5px;
  border: 3px solid #ddd;
  border-radius: 6px;
  background-color: #f6f6f6;
}
</style>
