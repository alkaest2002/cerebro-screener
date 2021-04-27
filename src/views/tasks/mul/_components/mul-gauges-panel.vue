<template>
  <div
    id="gagues-panel"
    class="is-flex is-flex-wrap-wrap is-justify-content-center"
  >
    <div v-for="(percent, idx) in gaugesData" :key="idx">
      <mul-gauge :percent="percent" :name="`g${idx + 1}`" />
    </div>
  </div>
</template>

<script>
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
};
</script>
