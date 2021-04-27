<template>
  <div id="gagues-panel" class="is-flex is-flex-wrap-wrap is-justify-content-center">
    <div 
      v-for="(percent, idx) of gauges"
      :key="idx"
    >
      <mul-gauge :percent="percent" :name="`g${idx+1}`" />
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
    mulGauge
  },

  // props
  props: {
    gauges: {
      type: Array,
      required: true,
      validator: (value) => value.every((e) => typeof e == "number" && e>=0 && e<=100 )
    }
  },
}
</script>