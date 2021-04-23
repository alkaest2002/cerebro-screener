<template>
  <div id="presenter-wrapper">
    <div id="title" class="mb-3">
      <h1 class="is-size-3 has-text-weight-bold">
        {{ i18n.batteryCreate.title }}
      </h1>
    </div>
    <div id="presenter" class="box">
      <div class="mt-3">
        <p class="is-size-5 has-text-weight-bold mb-3">
          {{ i18n.batteryCreate.administerHeader }}
        </p>
        <battery-table
          v-model:template-battery="templateBattery"
          v-model:should-shuffle="shouldShuffle"
        />
      </div>
      <div class="mt-5">
        <p class="is-size-5 has-text-weight-bold mb-3">
          {{ i18n.batteryCreate.randomizeHeader }}
        </p>
        <form-radio-group
          v-model="shouldShuffle"
          name="shouldShuffle"
          :options="shuffleOptions"
          :disabled="templateBattery.length < 2"
        />
        <battery-randomizer
          v-model:shuffle-schema="shuffleSchema"
          :template-battery="templateBattery"
          :disabled="!!!shouldShuffle"
        />
        <small class="has-text-grey is-block mt-1">
          {{ i18n.batteryCreate.randomizeNote }}
        </small>
      </div>
    </div>
    <div id="navigation" class="buttons">
      <router-link
        id="enter-click"
        :to="{ name: 'route-main-home' }"
        replace
        class="button is-link"
      >
        {{ i18n.batteryCreate.buttons.administer }}
      </router-link>
      <button class="button is-danger" type="reset" @click="onResetBattery">
        {{ i18n.batteryCreate.buttons.reset }}
      </button>
    </div>
  </div>
</template>

<script>
import { admin as i18n } from "@/i18n/it/views/admin";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { clone } from "@/utils/utilityFns";
import formRadioGroup from "@/views/_components/form/form-radio-group";
import batteryTable from "./_components/battery-table";
import batteryRandomizer from "./_components/battery-randomizer";

export default {
  name: "battery-create",

  components: {
    formRadioGroup,
    batteryTable,
    batteryRandomizer,
  },

  setup() {
    // use store
    const store = useStore();

    // shouldShuffle options (no need to be reactive)
    const shuffleOptions = [
      { label: i18n.batteryCreate.fields.randomize.optionLabel[0], value: 0 },
      { label: i18n.batteryCreate.fields.randomize.optionLabel[1], value: 1 },
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
      // clear answers from vuex
      store.dispatch("answers/wipe");
    };

    // on mounted
    onMounted(() => {
      // little hack to set the initial value of templateBattery
      templateBattery.value = clone(templateBattery.value);
    });

    // return setup object
    return {
      i18n,
      templateBattery,
      shouldShuffle,
      shuffleOptions,
      shuffleSchema,
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
