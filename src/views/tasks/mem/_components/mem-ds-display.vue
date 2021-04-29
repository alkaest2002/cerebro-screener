<template>
  <div
    class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
  >
    <div
      id="display"
      :class="cssState"
      class="mb-2 is-size-2 is-flex is-justify-content-center is-align-items-center"
    >
      <transition name="fade" mode="out-in">
        <span :key="numberToShow">
          {{ numberToShow }}
        </span>
      </transition>
    </div>
  </div>
</template>

<script>
import { memDsItem as i18n } from "@/i18n/it/views/tasks";
import { computed } from "vue";

export default {
  // name
  name: "mem-ds-display",

  // props
  props: {
    sequenceToPlay: {
      type: Array,
      required: true,
      validator: (value) => value.every((e) => "123456789".indexOf(e) > -1),
    },

    cssState: {
      type: String,
      required: true
    }
  },

  // setup
  setup(props) {
    
    // number to show
    const numberToShow = computed(() => {
      if (props.cssState == "idle") return "";
      if (props.cssState == "finished") return "fine";
      return props.sequenceToPlay[0];
    });

    // return setup object
    return {
      i18n,
      numberToShow
    };
  },
};
</script>

<style lang="scss" scoped>
$number-color: #7a7a7a;
$background-color: #eee;

#display {
  height: 75px;
  width: 120px;
  border-radius: 10px;
  color: $number-color;
  background-color: $background-color;

  &.finished:hover,
  &.playing:hover {
    cursor: default;
    color: $number-color;
  }

  &:hover {
    cursor: pointer;
    color: lighten($number-color, 10%);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s linear;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transition: opacity 0, 0.3s linear;
  }
}
</style>
