<template>
  <task-lock :show="showItemLock" />
  <div
    class="is-flex is-flex-direction-column is-justify-content-center"
    style="height: 100%"
  >
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import taskLock from "./task-lock";

export default {
  // name
  name: "item-container",

  // components
  components: {
    taskLock,
  },

  // setup
  setup() {
    // get store
    const store = useStore();

    // computed
    const showItemLock = computed(() => {
      return [
        store.getters["presenters/getCurrentPresenter"].isLocked,
        store.state.timer.type != "block",
      ].every((e) => e);
    });

    // return setup object
    return {
      showItemLock,
    };
  },
};
</script>
