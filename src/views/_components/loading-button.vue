<template>
  <button
    :class="buttonCSSClass"
    :disabled="disabled || buttonWasClicked"
    class="button"
    :type="buttonType"
    @click="onClick"
  >
    <slot> vai </slot>
  </button>
</template>

<script>
import { ref, computed, watch } from "vue";
export default {
  // name
  name: "loading-button",

  // props:
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },

    buttonCss: {
      type: String,
      default: "",
    },

    buttonType: {
      type: String,
      default: "button"
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  // setup
  setup(props) {
    // buttonWasClicked ref
    const buttonWasClicked = ref(false);

    // button css class
    const buttonCSSClass = computed(() => {
      const shouldSpin = buttonWasClicked.value || props.isLoading;
      return `${props.buttonCss} ${shouldSpin ? "is-loading" : null}`;
    });

    // watch isLoding prop
    watch(
      () => props.isLoading,
      (value) => (buttonWasClicked.value = value)
    );

    // handle on click
    const onClick = () => (buttonWasClicked.value = true);

    // return setup object
    return {
      buttonCSSClass,
      buttonWasClicked,
      onClick,
    };
  },
};
</script>
