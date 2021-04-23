<template>
  <div
    class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
  >
    <div
      id="circle"
      :class="cssState"
      class="mb-2 is-size-2 is-flex is-justify-content-center is-align-items-center"
    >
      <transition name="fade" mode="out-in">
        <span :key="numberToShow" @click="onClickPlay">
          {{ numberToShow }}
        </span>
      </transition>
    </div>
    <mem-starter :css-state="cssState" @click="onClickPlay">
      {{ i18n.tasks.mem.ds.clickNumbersOne }} {{ sequence.length }}
      {{ i18n.tasks.mem.ds.clickNumbersTwo }}
    </mem-starter>
  </div>
</template>

<script>
import { tasks as i18n } from "@/i18n/it/views/tasks";
import setupShowSequenceAnimation from "./_composables/setupSequenceAnimation";
import memStarter from "./mem-starter";

export default {
  // name
  name: "mem-ds-display",

  // components
  components: {
    memStarter,
  },

  // props
  props: {
    sequence: {
      type: Array,
      required: true,
      validator: (value) => value.every((e) => "123456789".indexOf(e) > -1),
    },
  },

  // emitted events
  emits: {
    "sequence-has-played": (value) => typeof value == "boolean",
  },

  // setup
  setup(props, { emit }) {
    // set up sequence animation
    const { cssState, numberToShow, onClickPlay } = setupShowSequenceAnimation(
      props,
      emit
    );
    // return setup object
    return {
      i18n,
      cssState,
      numberToShow,
      onClickPlay,
    };
  },
};
</script>

<style lang="scss" scoped>
$number-color: #7a7a7a;
$background-color: #eee;

#circle {
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
    transition: opacity 0.1s linear;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transition: opacity 0, 0.1s linear;
  }
}
</style>
