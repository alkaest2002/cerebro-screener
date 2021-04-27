<template>
  <div
    id="mul-inputs"
    class="is-flex is-justify-content-center is-align-items-center"
    style="height: 50%"
  >
    <span 
      class="has-text-gray is-clickable"
      @click="$attrs.onClick"
    >
      {{ i18n.startAnimation }}
    </span>
  </div>
</template>

<script>
import { mulInputs as i18n } from "@/i18n/it/views/tasks";

export default {
  // name
  name: "nul-inputs",

  // do not inherit attrs
  inheritAttrs: false,

  // setup
  setup() {
    
    // return setup object
    return {
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
