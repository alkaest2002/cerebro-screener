<template>
  <div
    id="blocks"
    :class="cssState"
    class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
  >
    <div class="is-flex is-flex-wrap-wrap mb-5">
      <div v-for="number in [1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="number">
        <div
          v-if="cssState != 'finished'"
          :class="{ glow: cssState == 'playing' && numberToShow == number }"
          class="block is-size-2 is-flex is-justify-content-center is-align-items-center m-1"
        >
          {{ number }}
        </div>
        <div
          v-else
          :class="{ clicked: userSequence.includes(number) }"
          class="block is-size-2 is-flex is-justify-content-center is-align-items-center m-1"
          @click="$emit('click-number', number)"
        >
          {{ userSequence.indexOf(number) + 1 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { memDs as i18n } from "@/i18n/it/views/tasks";
import { computed } from "vue";

export default {
  // name
  name: "mem-cb-grid",

  // props
  props: {
    sequenceToPlay: {
      type: Array,
      required: true,
      validator: (value) => value.every((e) => "123456789".indexOf(e) > -1),
    },

    userSequence: {
      type: Array,
      required: true,
      validator: (value) => value.every((e) => "123456789".indexOf(e) > -1),
    },

    cssState: {
      type: String,
      required: true,
    },
  },

  // emitted events
  emits: {
    "click-number": (value) => [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(value),
  },

  // setup
  setup(props) {
    // number to show
    const numberToShow = computed(() => {
      if (props.cssState == "idle") return "";
      return props.sequenceToPlay[0];
    });

    // return setup object
    return {
      i18n,
      numberToShow,
    };
  },
};
</script>

<style lang="scss" scoped>
$background-color: #ddd;
$border-size: 8px;
$glow-color: #c42180;

#play-animation {
  cursor: pointer;
}

#blocks {
  width: 324px;

  &.idle .block {
    color: $background-color;
  }

  .block {
    cursor: pointer;
    height: 100px;
    width: 100px;
    background-color: $background-color;
    color: $background-color;
    border: $border-size solid $background-color;
    border-radius: 50%;
    animation: background-color, 0.5 ease;

    &.glow {
      color: $glow-color;
      background-color: $glow-color;
      border: $border-size solid $glow-color;
      animation: pulse 0.5s infinite;
    }

    &.clicked {
      border: $border-size solid $glow-color;
      color: $glow-color;
      box-shadow: 5px 5px 10px 1px #eee;
    }
  }
}
</style>
