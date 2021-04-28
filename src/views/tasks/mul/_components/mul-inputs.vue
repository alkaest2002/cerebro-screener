<template>
  <div
    id="mul-inputs"
    class="is-flex is-flex-wrap-wrap is-justify-content-center is-align-items-center"
    style="height: 100%"
  >
    <div v-if="!animationHasEnded">
      <a
        v-if="steps == 'start animation'"
        class="is-clickable"
        @click.prevent="onClick"
      >
        {{ i18n.startAnimation }}
      </a>
      <span v-else>
        {{ i18n.animationStarted }}
      </span>
    </div>
    <div v-else class="is-flex is-flex-wrap-wrap is-flex-direction-column">
      <div class="p-3">
        {{ i18n.howManyGauges }}
      </div>
      <div class="p-3">
        {{ i18n.whatIsCounterSum }}
      </div>
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
      required: true,
    },
  },

  // setup
  setup(props, { attrs }) {
    // steps
    const steps = ref("start animation");

    // handle on click
    const onClick = () => {
      console.log("click");
      steps.value = "animation started";
      attrs.onClick();
    };

    // return setup object
    return {
      i18n,
      steps,
      onClick,
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
