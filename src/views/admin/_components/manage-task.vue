<template>
  <p class="is-size-5 has-text-weight-bold mb-0">
    task {{ currentTaskIndex }}:
    {{ currentTask?.description || "n.d." }}
  </p>
  <div id="task">
    <span>
      <b class="has-text-grey">block</b>
      {{ currentBlock?.id || "n.d." }} {{ currentBlock?.type }}
    </span>
    <span>
      <b class="has-text-grey">item</b>
      {{ currentPresenter?.id || "n.d." }}
    </span>
    <span> <b class="has-text-grey">timer</b> {{ currentTimeLeft }} </span>
  </div>
  <div>
    <a
      v-if="currentBlock?.type == 'items' && !batteryHasEnded"
      href="#"
      @click.prevent="onClickResetBlock"
    >
      &rarr; reset blocco corrente
    </a>
    <span v-else class="has-text-grey-light">
      &rarr; reset blocco corrente
    </span>
    <br />
    <a
      v-if="nextInstructionsBlock > 0 && !batteryHasEnded"
      href="#"
      @click.prevent="onClickNextInstructionsBlock"
    >
      &rarr; blocco successivo
    </a>
    <span v-else class="has-text-grey-light"> &rarr; blocco successivo </span>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { formatTimerTime } from "@/utils/utilityFns";

export default {
  // name
  name: "manage-task",

  // setup
  setup() {
    // get store & router
    const store = useStore();

    // get current battery (no need to be reactive)
    const currentBattery = store.state.battery.battery;

    // get batteryHasEnded (no need to be reactive)
    const batteryHasEnded = store.state.battery.hasEnded;

    // get current task
    const currentTask = computed(() => store.getters["battery/getCurrentTask"]);

    // get current task index
    const currentTaskIndex = computed(
      () => currentBattery.findIndex((e) => e.id == currentTask.value?.id) + 1
    );

    // get current block
    const currentBlock = computed(
      () => store.getters["blocks/getCurrentBlock"]
    );

    // get current presenter
    const currentPresenter = computed(
      () => store.getters["presenters/getCurrentPresenter"]
    );

    // get current timer
    const currentTimeLeft = computed(() =>
      store.state.timer.id == null
        ? "n.d."
        : formatTimerTime(
            store.state.timer.timeLimit - store.state.timer.timeElapsed
          )
    );

    // get next instructions block (no need to be reactive)
    const nextInstructionsBlock = computed(() =>
      store.state.blocks.currentBlockIndex == null
        ? 0
        : store.state.presenters.presenters.findIndex(
            (e) =>
              e.blockIndex > currentPresenter.value?.blockIndex &&
              e.blockType == "instructions"
          )
    );

    // handle on reset current block
    const onClickResetBlock = () => {
      store.dispatch("presenters/resetBlockPresenters");
    };

    // handle on next instructions block
    const onClickNextInstructionsBlock = () => {
      store.dispatch(
        "presenters/setCurrentPresenterIndex",
        nextInstructionsBlock.value
      );
    };

    // return setup object
    return {
      batteryHasEnded,
      currentTask,
      currentTaskIndex,
      currentBlock,
      currentPresenter,
      currentTimeLeft,
      nextInstructionsBlock,
      onClickResetBlock,
      onClickNextInstructionsBlock,
    };
  },
};
</script>

<style lang="scss" scoped>
#task {
  padding: 10px 2px;
  border-top: 1px solid #ddd;

  & span {
    display: inline-block;
    margin-right: 15px;
  }
}
</style>
