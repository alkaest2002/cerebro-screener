<template>
  <div
    v-if="show && showLockBasedOnCondition"
    class="lock is-overlay is-flex is-align-items-center is-justify-content-center"
  >
    <div class="has-text-centered">
      <slot>
        <img
          id="lock-img"
          src="@/assets/images/lock.svg"
          alt="lock"
          draggable="false"
          style="height: 100px"
        />
        <p class="is-size-3 has-text-weight-bold mt-3">Item bloccato</p>
        <p>Non puoi modificare quest'item.</p>
      </slot>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  // name
  name: "task-component-lock",

  // do not inherit attribs
  inheritAttrs: false,

  // props
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },

  // setup
  setup() {
    // get store
    const store = useStore();

    // determine whether to show lock
    const showLockBasedOnCondition = computed(() => {
      const currentPresenter = store.getters["presenters/getCurrentPresenter"];
      return [
        currentPresenter.isLocked,
        store.state.timer.status === "stopped",
      ].some((e) => e);
    });

    // retun setup object
    return {
      showLockBasedOnCondition,
    };
  },
};
</script>

<style lang="scss" scoped>
.lock {
  background-color: rgba(240, 240, 240, 0.95);
  z-index: 100;
  border-radius: 6px;
}
</style>
