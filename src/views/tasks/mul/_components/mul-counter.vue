<template>
  <div
    id="mul-counter"
    class="is-flex is-justify-content-center is-align-items-center"
    style="height: 100%"
  >
    <transition name="fade" mode="out-in" appear>
      <div v-if="!animationHasEnded" :key="currenCounterValue">
        {{ formatCounterValue(currenCounterValue) }}
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  // name
  name: "mul-counter",

  // props
  props: {
    counterData: {
      type: [String, Number],
      required: true,
    },

    animationHasEnded: {
      type: Boolean,
      required: true,
    },
  },

  // setup
  setup(props) {
    // current counter
    const currenCounterValue = ref("");

    // watch
    watch(
      () => props.counterData,
      (value) => {
        // update counter in a random fashion
        setTimeout(
          () => (currenCounterValue.value = value),
          parseInt(Math.random() * 700)
        );
      },
      { deep: true }
    );

    // format counter value
    const formatCounterValue = (value) => {
      if (typeof value == "string") return value;
      return `${value > 0 ? "+" : ""}${Math.floor(value)}`;
    };

    // return setup object
    return {
      currenCounterValue,
      formatCounterValue,
    };
  },
};
</script>

<style lang="scss" scoped>
$background-color: #3273dc;

#mul-counter {
  font-size: 5em;
  color: #000;
  border-radius: 6px;
  background-color: $background-color;
  color: lighten($background-color, 50%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transition: opacity 0, 0.5s;
}
</style>
