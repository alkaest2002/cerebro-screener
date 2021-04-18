<template>
  <div id="presenter-wrapper">
    <div id="title" class="mb-3">
      <h1 class="is-size-3 has-text-weight-bold">Somministra batteria</h1>
    </div>
    <div id="presenter" class="box">
      <div class="mt-3">
        <p class="is-size-5 has-text-weight-bold mb-3">
          1. task da somministrare
        </p>
        <battery-table
          v-model:template-battery="templateBattery"
          v-model:should-shuffle="shouldShuffle"
        />
      </div>
      <div class="mt-5">
        <p class="is-size-5 has-text-weight-bold mb-3">
          2. Randomizzazione dei task
        </p>
        <form-radio-group
          name="shouldShuffle"
          v-model="shouldShuffle"
          :options="shuffleOptions"
          :disabled="templateBattery.length < 2"
        />
        <battery-randomizer
          class="mt-5"
          :template-battery="templateBattery"
          :shuffle-schema="shuffleSchema"
          :disabled="!!!shouldShuffle"
          @shuffle-schema="onShuffleSchema"
        />
        <small class="has-text-grey is-block mt-1">
          nota: clicca sui task che vuoi mantenere in posizione
        </small>
      </div>
    </div>
    <div id="navigation" class="buttons">
      <router-link
        :to="{ name: 'route-main-home' }"
        replace
        id="enter-click"
        class="button is-link"
      >
        somministra batteria
      </router-link>
      <button @click="onResetBattery" class="button is-danger" type="reset">
        reset batteria
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { clone } from "@/utils/utilityFns";
import formRadioGroup from "@/_components/form/form-radio-group";
import batteryTable from "./_components/battery-table";
import batteryRandomizer from "./_components/battery-randomizer";

export default {
  name: "admin-battery-create",

  components: {
    formRadioGroup,
    batteryTable,
    batteryRandomizer,
  },

  setup() {
    // get store
    const store = useStore();

    // shouldShuffle options
    const shuffleOptions = [
      { label: "non randomizzare", value: 0 },
      { label: "randomizza", value: 1 },
    ];

    // shouldShuffle
    const shouldShuffle = computed({
      get: () => +store.state.battery.shouldShuffle,
      set: (value) => {
        shuffleSchema.value = Array.from(
          { length: templateBattery.value.length * value },
          () => false
        );
        store.dispatch("battery/setShouldShuffle", !!value);
      },
    });

    // shuffle schema
    const shuffleSchema = computed({
      get: () => store.state.battery.shuffleSchema,
      set: (value) => store.dispatch("battery/setShuffleSchema", value),
    });

    // template Battery
    const templateBattery = computed({
      get: () => store.getters["battery/getTemplateBattery"],
      set: (value) => store.dispatch("battery/setTemplateBattery", value),
    });

    // handle on shuffle schema
    const onShuffleSchema = (schema) => (shuffleSchema.value = schema);

    // handle on reset battery
    const onResetBattery = () => {
      // reset templateBattery to available tasks
      templateBattery.value = store.getters["catalogue/getAvailableTasks"];
      // clear shouldShuffle
      shouldShuffle.value = 0;
      // clear shuffleSchema
      shuffleSchema.value = [];
      // clear battery from vuex
      store.dispatch("battery/setBattery", []);
      // clear answer from vuex
      store.dispatch("answers/wipe");
    };

    // on mounted
    onMounted(() => {
      // little hack to set the initial value of templateBattery
      templateBattery.value = clone(templateBattery.value);
    });

    // return setup object
    return {
      templateBattery,
      shouldShuffle,
      shuffleOptions,
      shuffleSchema,
      onShuffleSchema,
      onResetBattery,
    };
  },
};
</script>

<style lang="scss" scoped>
#presenter-item div:nth-child(2) p:nth-child(1) {
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}
</style>
