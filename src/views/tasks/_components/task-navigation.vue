<template>
  <div id="navigation" class="is-flex is-justify-content-space-between">
    <div class="buttons mb-0">
      <button
        :disabled="!canGoBack"
        @click="onClickNavigation(-1)"
        class="button is-link"
      >
        <span>prec</span>
      </button>
      <button
        v-if="currentIndex != endComponentIndex - 1"
        :disabled="!canGoForth"
        @click="onClickNavigation(+1)"
        class="button is-link"
      >
        <span>succ</span>
      </button>
      <button
        v-else
        :disabled="!canGoForth"
        @click="onClickNavigation(+1)"
        class="button is-danger"
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
  name: "task-component-navigation",

  // emitted events
  emits: {
    navigateCurrent: (value) => typeof value === "number" && value >= 0,
    navigateBeyondLast: null,
    navigateBeforeFirst: null,
  },

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

  // set up
  setup(props, { emit }) {
    // define computed props
    const isLastIndex = computed(() => props.currentIndex == props.lastIndex);
    // handle navigation
    const onClickNavigation = (offset) => {
      // notify on reaching end
      if (isLastIndex.value && offset == 1) return emit("navigateBeyondLast");
      // notify entity current
      emit(
        "navigateCurrent",
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
