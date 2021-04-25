<template>
  <p class="is-size-5 has-text-weight-bold mb-0">
    {{ i18n.task }} {{ currentTaskIndex }}:
    {{ currentTask?.description || "-" }}
  </p>
  <div id="task">
    <span>
      <b class="has-text-grey">{{ i18n.block }}</b>
      {{ currentBlock?.id || "-" }} {{ currentBlock?.type }}
    </span>
    <span>
      <b class="has-text-grey">{{ i18n.item }}</b>
      {{ currentPresenter?.id || "-" }}
    </span>
    <span>
      <b class="has-text-grey">{{ i18n.timer }}</b>
      {{ currentTimeLeft }}
    </span>
  </div>
  <div v-if="!batteryHasEnded">
    <a
      v-if="currentBlock?.type == 'items'"
      href="#"
      @click.prevent="onClickResetBlock"
    >
      {{ i18n.links.resetBlock }}
    </a>
    <span v-else class="has-text-grey-light">
      {{ i18n.links.resetBlock }}
    </span>
    <br />
    <a
      v-if="nextInstructionsBlock > 0"
      href="#"
      @click.prevent="onClickNextInstructionsBlock"
    >
      {{ i18n.links.nextBlock }}
    </a>
    <span v-else class="has-text-grey-light">
      {{ i18n.links.nextBlock }}
    </span>
    <br />
    <router-link :to="{ name: 'route-battery-tasks' }" replace>
      {{ i18n.links.currentTask }}
    </router-link>
  </div>
  <div v-else>
    <span class="has-text-grey-light">
      {{ i18n.links.resetBlock }}
    </span>
    <br />
    <span class="has-text-grey-light">
      {{ i18n.links.nextBlock }}
    </span>
    <br />
    <span class="has-text-grey-light">
      {{ i18n.links.currentTask }}
    </span>
  </div>
</template>

<script>
import { manageTask as i18n } from "@/i18n/it/views/admin";
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
