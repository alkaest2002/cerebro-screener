<template>
  <div id="presenter-wrapper">
    <div id="title" class="mb-3">
      <h1 class="is-size-3 has-text-weight-bold">Gestisci sessione in corso</h1>
    </div>
    <div id="presenter" class="box">
      <div class="mt-3">
        <p class="is-size-5 has-text-weight-bold mb-0 mt-2">Dati anagrafici</p>
        <div id="testee">
          <span v-for="(value, key) in currentTestee" :key="key">
            <b class="has-text-grey">
              {{ key }}
            </b>
            {{ value }}
          </span>
        </div>
        <div>
          <router-link :to="{ name: 'route-battery-bio' }" replace>
            &rarr; anagrafica
          </router-link>
          <br />
        </div>
      </div>
      <div class="mt-5">
        <p class="is-size-5 has-text-weight-bold mb-0">Batteria</p>
        <div id="battery">
          <span v-for="(task, index) in currentBattery" :key="task.id">
            <b class="has-text-grey">
              {{ index + 1 }}
            </b>
            {{ task.description }}
          </span>
        </div>
        <div>
          <router-link :to="{ name: 'route-battery-tasks' }" replace>
            &rarr; riprendi task
          </router-link>
          <br />
          <router-link :to="{ name: 'route-battery-next-task' }" replace>
            &rarr; prossimo task
          </router-link>
          <br />
          <router-link :to="{ name: 'route-battery-end' }" replace>
            &rarr; fine della batteria
          </router-link>
        </div>
      </div>
      <div class="mt-5">
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
          <span>
            <b class="has-text-grey">timer</b> {{ currentTimeLeft }}
          </span>
        </div>
        <div>
          <a
            v-if="currentBlock?.type == 'items'"
            href="#"
            @click.prevent="onClickResetBlock"
          >
            &rarr; reset blocco corrente
          </a>
          <span v-else class="has-text-grey">
            &rarr; reset blocco corrente
          </span>
          <br />
          <a
            v-if="nextInstructionsBlock > 0"
            href="#"
            @click.prevent="onClickNextInstructionsBlock"
          >
            &rarr; blocco successivo
          </a>
          <span v-else class="has-text-grey"> &rarr; blocco successivo </span>
        </div>
      </div>
    </div>
    <div id="navigation" class="buttons">
      <router-link
        id="enter-click"
        :to="{ name: 'route-admin-reset-battery' }"
        replace
        class="button is-danger"
      >
        reset sessione
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { formatTimerTime } from "@/utils/utilityFns";

export default {
  // name
  name: "manage",

  // setup
  setup() {
    // get store & router
    const store = useStore();

    // get current testee (no need to be reactive)
    const currentTestee = store.state.testee.testee;

    // get current battery (no need to be reactive)
    const currentBattery = store.state.battery.battery;

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
      currentTestee,
      currentBattery,
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
#testee,
#battery,
#task {
  padding: 10px 2px;
  border-top: 1px solid #ddd;

  & span {
    display: inline-block;
    margin-right: 15px;
  }
}
</style>
