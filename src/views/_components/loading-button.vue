<template>
  <button
    class="button"
    :class="buttonCSSClass"
    :disabled="disabled"
    :type="buttonType"
    @click="onClick"
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
  setup(props, { emit }) {
    // button css class
    const buttonCSSClass = computed(() => {
      return `${props.buttonCss} ${props.modelValue ? "is-loading" : null}`;
    });

    // handle on click
    const onClick = () => {
      emit("update:modelValue", true);
    };

    // return setup object
    return {
      buttonCSSClass,
      onClick,
    };
  },
};
</script>
