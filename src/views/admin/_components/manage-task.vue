<template>
  <h2 class="is-size-5 has-text-weight-bold mb-0">
    <span v-if="batteryHasStarted">
      {{ i18n.task }}: {{ currentTask?.description }}
    </span>
    <span v-else> {{ i18n.task }}: - </span>
  </h2>
  <div id="task" class="columns is-gapless mb-0">
    <div class="column is-one-third">
      <b class="has-text-grey">{{ i18n.block }}</b>
      {{ currentBlock?.id || "-" }} {{ currentBlock?.type }}
    </div>
    <div class="column is-one-third">
      <b class="has-text-grey">{{ i18n.item }}</b>
      {{ currentPresenter?.id || "-" }}
    </div>
    <div class="column is-one-third">
      <b class="has-text-grey">{{ i18n.timer }}</b>
      {{ currentTimeLeft }}
    </div>
  </div>
  <div class="links">
    <div v-if="!batteryHasEnded" class="mt-2">
      <a
        v-if="currentBlock?.type == 'items'"
        href="#"
        class="is-block"
        @click.prevent="onClickResetBlock"
      >
        {{ i18n.links.resetBlock }}
      </a>
      <span v-else class="has-text-grey-light is-block">
        {{ i18n.links.resetBlock }}
      </span>
      <a
        v-if="nextInstructionsBlock > 0"
        href="#"
        class="is-block"
        @click.prevent="onClickNextInstructionsBlock"
      >
        {{ i18n.links.nextBlock }}
      </a>
      <span v-else class="has-text-grey-light is-block">
        {{ i18n.links.nextBlock }}
      </span>
      <router-link :to="{ name: currentTaskRoute }" replace>
        <span v-if="batteryHasStarted">
          {{ i18n.links.currentTask }}
        </span>
        <span v-else>
          {{ i18n.links.listTasks }}
        </span>
      </router-link>
    </div>
    <div v-else class="mt-2">
      <span class="has-text-grey-light">
        {{ i18n.links.resetBlock }}
      </span>
      <span class="has-text-grey-light">
        {{ i18n.links.nextBlock }}
      </span>
      <span class="has-text-grey-light">
        {{ i18n.links.currentTask }}
      </span>
    </div>
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

    // batteryHasEnded (no need to be reactive)
    const batteryHasEnded = store.state.battery.hasEnded;

    // current task (no need to be reactive)
    const currentTask = store.getters["battery/getCurrentTask"];

    // batteryHasEnded (no need to be reactive)
    const batteryHasStarted =
      store.state.presenters.currentPresenterIndex != null;

    // current task  (no need to be reactive)
    const currentTaskRoute = computed(() =>
      batteryHasStarted
        ? `route-tasks-${currentTask?.key}`
        : "route-battery-tasks"
    );

    // current block
    const currentBlock = computed(
      () => store.getters["blocks/getCurrentBlock"]
    );

    // current presenter
    const currentPresenter = computed(
      () => store.getters["presenters/getCurrentPresenter"]
    );

    // current timer
    const currentTimeLeft = computed(() =>
      store.state.timer.id == null
        ? "-"
        : formatTimerTime(
            store.state.timer.timeLimit - store.state.timer.timeElapsed
          )
    );

    // next instructions block
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
      batteryHasStarted,
      batteryHasEnded,
      currentTask,
      currentTaskRoute,
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
