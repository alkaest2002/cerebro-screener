<template>
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
    <div v-if="!batteryHasEnded">
      <router-link :to="{ name: 'route-battery-tasks' }" replace>
        &rarr; riprendi task
      </router-link>
      <br />
      <router-link :to="{ name: 'route-battery-next-task' }" replace>
        &rarr; prossimo task
      </router-link>
    </div>
    <div v-else>
      <span class="is-block has-text-grey-light"> &rarr; riprendi task </span>
      <span class="is-block has-text-grey-light"> &rarr; prossimo task </span>
    </div>
    <router-link :to="{ name: 'route-battery-end' }" replace>
      &rarr; fine della batteria
    </router-link>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  // name
  name: "manage-battery",

  // setup
  setup() {
    // get store & router
    const store = useStore();

    // get current battery (no need to be reactive)
    const currentBattery = store.state.battery.battery;

    // get batteryHasEnded (no need to be reactive)
    const batteryHasEnded = store.state.battery.hasEnded;

    // return setup object
    return {
      currentBattery,
      batteryHasEnded,
    };
  },
};
</script>

<style lang="scss" scoped>
#battery {
  padding: 10px 2px;
  border-top: 1px solid #ddd;

  & span {
    display: inline-block;
    margin-right: 15px;
  }
}
</style>
