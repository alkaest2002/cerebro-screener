<template>
  <div v-if="showTimer" id="timer" :class="cssClass">
    <span id="timer-text">
      {{ timeLeftFormatted }}
    </span>
  </div>
</template>

<script>
import { ref, computed, watch, onUnmounted } from "vue";
import { useStore } from "vuex";
import { formatTimerTime } from "@/utils/utilityFns";

export default {
  name: "task-timer",

  emits: {
    "time-is-up": null,
  },

  // setup
  setup(props, { emit }) {
    // use store
    const store = useStore();

    // timerInterval
    let timerInterval = ref(null);

    // timer object
    const timer = computed(() => store.state.timer);

    // show timer flag
    const showTimer = computed(() => timer.value.id && timer.value.status);

    // time left
    const timeLeft = computed(
      () => timer.value.timeLimit - timer.value.timeElapsed
    );

    // time left formatted
    const timeLeftFormatted = computed(() => formatTimerTime(timeLeft.value));

    // timer css class
    const cssClass = computed(() =>
      timeLeft.value <= timer.value.alertThreshold
        ? "has-background-danger has-text-danger-light"
        : "has-background-success has-text-success-light"
    );

    // watch
    watch(
      timer,
      (newTimer, oldTimer) => {
        // start timer under these conditions
        if (
          [
            newTimer.status === "started",
            newTimer.timeElapsed == 0 || timerInterval.value == null,
          ].every((e) => e)
        ) {
          // clear any preceding timer
          clearInterval(timerInterval.value);
          // set new timer
          timerInterval.value = setInterval(
            () => store.dispatch("timer/setTick"),
            1000
          );
        }
        // stop timer and emit "timeIsUp" event under these conditions
        if (
          [
            oldTimer?.status != "stopped",
            newTimer.timeElapsed > 0,
            newTimer.timeElapsed == newTimer.timeLimit,
          ].every((e) => e)
        ) {
          // persist stopped status to vuex
          store.dispatch("timer/setStatus", "stopped");
          // emit event
          emit("time-is-up");
        }
        // clear timer under these conditions
        if (newTimer.status == null || newTimer.status === "stopped") {
          clearInterval(timerInterval.value);
        }
      },
      { immediate: true, deep: true }
    );

    // clear timer interval on timer unmount
    onUnmounted(() => clearInterval(timerInterval.value));

    // return setup object
    return {
      timer,
      showTimer,
      timeLeftFormatted,
      cssClass,
    };
  },
};
</script>

<style scoped lang="scss">
#timer {
  padding: 3px 5px;
  border-radius: 5px;
  transition: all 0.7s;

  #timer-text {
    line-height: 1em;
    font-size: 2em;
    font-weight: 500;
  }
}
</style>
