<template>
  <h2 class="is-size-5 has-text-weight-bold mb-0">
    {{ i18n.battery }}
  </h2>
  <div id="battery" class="columns is-multiline is-gapless mb-0">
    <div 
      v-for="(task, index) in currentBattery" 
      :key="task.id" 
      class="column is-one-quarter"
    >
      <b class="has-text-grey">
        {{ index + 1 }}
      </b>
      {{ task.description }}
    </div>
  </div>
  <div v-if="!(batteryHasEnded || isLastTask)">
    <router-link :to="{ name: 'route-battery-next-task' }" replace>
      {{ i18n.links.next }}
    </router-link>
  </div>
  <div v-else>
    <span class="is-block has-text-grey-light">
      {{ i18n.links.next }}
    </span>
  </div>
  <router-link :to="{ name: 'route-battery-end' }" replace>
    {{ i18n.links.end }}
  </router-link>
</template>

<script>
import { manageBattery as i18n } from "@/i18n/it/views/admin";
import { useStore } from "vuex";

export default {
  // name
  name: "manage-battery",

  // setup
  setup() {
    // use store
    const store = useStore();

    // get current battery (no need to be reactive)
    const currentBattery = store.state.battery.battery;

    // is last task (no need to be reactive)
    const isLastTask =
      store.getters["battery/getCurrentTask"].key ==
      store.getters["battery/getLastTask"].key;

    // get batteryHasEnded (no need to be reactive)
    const batteryHasEnded = store.state.battery.hasEnded;

    // return setup object
    return {
      i18n,
      currentBattery,
      isLastTask,
      batteryHasEnded,
    };
  },
};
</script>
