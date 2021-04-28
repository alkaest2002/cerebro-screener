<template>
  <div
    id="mul-inputs"
    class="is-flex is-flex-wrap-wrap is-justify-content-center is-align-items-center"
    style="height:100%"
  >
    <div v-if="!animationHasEnded">
      <a 
        class="is-clickable"
        @click.prevent="$attrs.onClick"
      >
        {{ i18n.startAnimation }}
      </a>
    </div>
    <div v-else>
      :
    </div>
  </div>
</template>

<script>
import { ref } from "vue"; 
import { mulInputs as i18n } from "@/i18n/it/views/tasks";

export default {
  // name
  name: "nul-inputs",

  // do not inherit attrs
  inheritAttrs: false,

  // props
  props: {
    animationHasEnded: {
      type: Boolean,
      required: true
    },
  },

  // setup
  setup() {

    // steps
    const steps = ref("start animation");
    
    // return setup object
    return {
      steps,
      i18n,
    };
  },
};
</script>

<style lang="scss" scoped>
#mul-inputs {
  border: 1px solid #ddd;
  border-radius: 6px;
}
</style>
