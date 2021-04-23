<template>
  <p class="is-size-5 has-text-weight-bold mb-0">
    {{ i18n.manageTask.task }} {{ currentTaskIndex }}:
    {{ currentTask?.description || "-" }}
  </p>
  <div id="task">
    <span>
      <b class="has-text-grey">{{ i18n.manageTask.block }}</b>
      {{ currentBlock?.id || "-" }} {{ currentBlock?.type }}
    </span>
    <span>
      <b class="has-text-grey">{{ i18n.manageTask.item }}</b>
      {{ currentPresenter?.id || "-" }}
    </span>
    <span>
      <b class="has-text-grey">{{ i18n.manageTask.timer }}</b>
      {{ currentTimeLeft }}
    </span>
  </div>
  <div>
    <a
      v-if="currentBlock?.type == 'items' && !batteryHasEnded"
      href="#"
      @click.prevent="onClickResetBlock"
    >
      &rarr; {{ i18n.manageTask.links.reset }}
    </a>
    <span v-else class="has-text-grey">
      &rarr; {{ i18n.manageTask.links.reset }}
    </span>
    <br />
    <a
      v-if="nextInstructionsBlock > 0 && !batteryHasEnded"
      href="#"
      @click.prevent="onClickNextInstructionsBlock"
    >
      &rarr; {{ i18n.manageTask.links.next }}
    </a>
    <span v-else class="has-text-grey">
      &rarr; {{ i18n.manageTask.links.next }}
    </span>
  </div>
</template>

<script>
import { admin as i18n } from "@/i18n/it/views/admin";
import { computed } from "vue";
import { useStore } from "vuex";
import { formatTimerTime } from "@/utils/utilityFns";

export default {
  // name
  name: "manage-task",

  // setup
  setup() {
    // use store
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
        ? "-"
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
      i18n,
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
