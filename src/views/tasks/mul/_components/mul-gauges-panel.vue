<template>
  <div
    id="gagues-panel"
    class="is-flex is-flex-wrap-wrap is-justify-content-center"
  >
    <div v-for="(percent, idx) in currentGauges" :key="idx">
      <mul-gauge :percent="percent" :name="`g${idx + 1}`" />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import mulGauge from "./mul-gauge";

export default {
  // name
  name: "mul-gauges-panel",

  // components
  components: {
    mulGauge,
  },

  // props
  props: {
    gaugesData: {
      type: Array,
      required: true,
    },
  },

  // setup
  setup(props) {
    // current gauges
    const currentGauges = computed(() => props.gaugesData[0]);

    // return setup object
    return {
      currentGauges,
    };
  },
};
</script>
