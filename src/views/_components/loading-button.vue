<template>
  <button
    class="button"
    :class="buttonCSSClass"
    :disabled="disabled"
    :type="buttonType"
    @click="$emit('update:modelValue', true)"
  >
    <slot />
  </button>
</template>

<script>
import { computed } from "vue";
export default {
  // name
  name: "loading-button",

  // props:
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },

    buttonCss: {
      type: String,
      default: "",
    },

    buttonType: {
      type: String,
      default: "button",
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  // emitted events
  emits: {
    "update:modelValue": (value) => typeof value == "boolean",
  },

  // setup
  setup(props) {
    // define button css class
    const buttonCSSClass = computed(() => {
      return `${props.buttonCss} ${props.modelValue ? "is-loading" : null}`;
    });

    // return setup object
    return {
      buttonCSSClass,
    };
  },
};
</script>
