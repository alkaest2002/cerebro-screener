<template>
  <div
    class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
  >
    <div
      :class="cssState"
      id="circle"
      class="mb-2 is-size-2 is-flex is-justify-content-center is-align-items-center"
    >
      <transition name="fade" mode="out-in">
        <span :key="numberToShow" @click="onClickPlay">
          {{ numberToShow }}
        </span>
      </transition>
    </div>
    <mem-starter :cssState="cssState" @click="onClickPlay">
      clicca in sequenza i {{ sequence.length }} numeri
    </mem-starter>
  </div>
</template>

<script>
import setupShowSequenceAnimation from "./_composables/setupSequenceAnimation";
import memStarter from "./mem-starter";

export default {
  // name
  name: "task-mem-component-ds-display",

  // emitted events
  emits: {
    sequenceHasPlayed: (value) => typeof value == "boolean",
  },

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
    sequenceHasPlayed: {
      type: Boolean,
      default: false,
    },
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
