<template>
  <div 
    id="mul-counter" 
    class="is-flex is-justify-content-center is-align-items-center"
  >
    {{ currenCounterValue }}
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  // name
  name: "mul-counter",

  // props
  props: {
    counterData: {
      type: Array,
      required: true
    }
  },

  // setup
  setup(props) {
    
    // current counter
    const currenCounterValue = computed(
      () => props.counterData[0]
    );

    // return setup object
    return {
      currenCounterValue
    }
  }
}
</script>

<style lang="scss" scoped>
$background-color: #ff0053;
#mul-counter {
  font-size: 3em;
  background-color: $background-color;
  border: 1px solid darken($background-color, 10%);
  color: lighten($background-color, 50%);
  border-radius: 6px;;
}
</style>