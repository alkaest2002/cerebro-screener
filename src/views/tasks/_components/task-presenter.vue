<template>
  <div class="is-clipped is-relative p-3">
    <!-- LOCK -->
    <task-lock :show="showBlockLock">
      <img
        id="lock-img"
        src="@/assets/images/timer.svg"
        alt="lock"
        draggable="false"
        style="height: 100px"
      />
      <p class="is-size-3 has-text-weight-bold mt-2">Tempo scaduto</p>
      <p>Premi il tasto "continua" per procedere oltre.</p>
      <button
        class="button is-link mt-3"
        type="button"
        @click="onNavigateCurrent(nextBlockIndex)"
      >
        continua
      </button>
    </task-lock>
    <!-- PRESENTER -->
    <slot name="presenter" />
    <!-- NAVIGATION -->
    <task-navigation
      :current-index="currentIndex"
      :last-index="lastIndex"
      :end-component-index="endComponentIndex"
      :can-go-back="canGoBack"
      :can-go-forth="currentPresenter.canGoForth"
      @navigate-current="onNavigateCurrent"
      @navigate-beyond-last="$emit('end-of-items')"
    >
      <template #timer>
        <task-timer @time-is-up="onTimeIsUp" />
      </template>
    </task-navigation>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import taskNavigation from "@/views/tasks/_components/task-navigation";
import taskTimer from "@/views/tasks/_components/task-timer";
import taskLock from "@/views/tasks/_components/task-lock";

export default {
  // name
  name: "task-presenter",

  // components
  components: {
    taskNavigation,
    taskTimer,
    taskLock,
  },

  // emitted events
  emits: {
    "end-of-items": null,
  },

  setup() {
    // get store
    const store = useStore();

    // current presenter
    const currentPresenter = computed(
      () => store.getters["presenters/getCurrentPresenter"]
    );

    // current presenter index
    const currentIndex = computed(
      () => store.state.presenters.currentPresenterIndex
    );

    // last presenter index
    const lastIndex = computed(
      () => store.getters["presenters/getLastPresenterIndex"]
    );

    // next block index
    const nextBlockIndex = computed(() =>
      store.state.presenters.presenters.findIndex(
        (e) => e.blockIndex > currentPresenter.value.blockIndex
      )
    );

    // "end" component index (present in every task)
    const endComponentIndex = computed(() =>
      store.state.presenters.presenters.findIndex((e) => e.blockType == "end")
    );

    // can go back
    const canGoBack = computed(
      () =>
        currentPresenter.value.canGoBack &&
        !(
          currentPresenter.value.blockType == "items" &&
          currentPresenter.value.itemIndex == 0
        )
    );

    // show block-level lock under these conditions
    const showBlockLock = computed(() => store.state.timer.type != "item");

    // handle navigate current presenter index
    const onNavigateCurrent = (targetPresenterIndex) => {
      // persist to vuex targetPresenterIndex
      store.dispatch(
        "presenters/setCurrentPresenterIndex",
        targetPresenterIndex
      );
    };

    // handle on timer is up
    const onTimeIsUp = () => {
      // update current presenter timeOut
      store.dispatch("presenters/updatePresenterEpoch", { type: "timeOut" });
      // enable canGoForth
      store.dispatch("presenters/updatePresenterByKey", {
        key: "canGoForth",
        value: true,
      });
      // lock item
      store.dispatch("presenters/updatePresenterByKey", {
        key: "isLocked",
        value: true,
      });
    };

    // return setup object
    return {
      currentPresenter,
      currentIndex,
      lastIndex,
      nextBlockIndex,
      endComponentIndex,
      canGoBack,
      showBlockLock,
      onNavigateCurrent,
      onTimeIsUp,
    };
  },
};
</script>
