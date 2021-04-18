<template>
  <div id="navigation" class="is-flex is-justify-content-space-between">
    <div class="buttons mb-0">
      <button
        :disabled="!canGoBack"
        class="button is-link"
        type="button"
        @click="onClickNavigation(-1)"
      >
        <span>prec</span>
      </button>
      <button
        v-if="currentIndex != endComponentIndex - 1"
        :disabled="!canGoForth"
        class="button is-link"
        type="button"
        @click="onClickNavigation(+1)"
      >
        <span>succ</span>
      </button>
      <button
        v-else
        :disabled="!canGoForth"
        class="button is-danger"
        type="button"
        @click="onClickNavigation(+1)"
      >
        <span>fine</span>
      </button>
    </div>
    <div>
      <slot name="timer" />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  // name
  name: "task-navigation",

  // props
  props: {
    currentIndex: {
      type: Number,
      required: true,
    },

    lastIndex: {
      type: Number,
      required: true,
    },

    endComponentIndex: {
      type: Number,
      required: true,
    },

    canGoBack: {
      type: Boolean,
      default: false,
    },

    canGoForth: {
      type: Boolean,
      default: true,
    },
  },

  // emitted events
  emits: {
    "navigate-current": (value) => typeof value === "number" && value >= 0,
    "navigate-beyond-last": null,
  },

  // set up
  setup(props, { emit }) {
    // define computed props
    const isLastIndex = computed(() => props.currentIndex == props.lastIndex);
    // handle navigation
    const onClickNavigation = (offset) => {
      // notify on reaching end
      if (isLastIndex.value && offset == 1) return emit("navigate-beyond-last");
      // notify entity current
      emit(
        "navigate-current",
        Math.min(props.lastIndex, Math.max(0, props.currentIndex + offset))
      );
    };
    // return setup object
    return {
      onClickNavigation,
    };
  },
};
</script>

<style lang="scss" scoped>
.button {
  width: 80px;
}
</style>
