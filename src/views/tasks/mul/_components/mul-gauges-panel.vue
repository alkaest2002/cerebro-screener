<template>
  <div
    id="gagues-panel"
    class="is-flex is-flex-wrap-wrap is-justify-content-center"
  >
    <div v-for="(percent, idx) in gauges" :key="idx">
      <mul-gauge 
        :percent="percent" 
        :name="`g${idx + 1}`"
        v-bind="$attrs"
      />
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import mulGauge from "./mul-gauge";

export default {
  // name
  name: "mul-gauges-panel",

  // do not inherit attrs
  inheritAttrs: false,

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

    // gauges
    const gauges = ref([0, 0, 0, 0, 0, 0]);

    // watch
    watch(() => props.gaugesData, value => {
      // if value is a populated array
      if (value?.length > 0) {
        // loop through value
        value.forEach((e, idx) => {
          // update gauges values in a random fashiom
          setTimeout(() => gauges.value[idx] = e, parseInt(Math.random()*1000)+100)
        });
      }
    }, { deep: true });

    // return setup object
    return {
      gauges
    }
  }
};
</script>
