<template>
  <div
    id="mul-counter"
    class="is-flex is-justify-content-center is-align-items-center"
  >
    <div
      v-if="!animationHasEnded"
      class="is-flex is-justify-content-center is-align-items-center"
    >
      <transition name="fade" mode="out-in" appear>
        <span v-show="counterValue > 0" :key="counterValue">
          {{ formatCounterValue(counterValue) }}
        </span>
      </transition>
    </div>
    <div
      v-if="!animationHasEnded"
      class="is-flex is-justify-content-center is-align-items-center"
    >
      <transition name="fade" mode="out-in" appear>
        <span v-show="counterValue < 0" :key="counterValue">
          {{ formatCounterValue(counterValue) }}
        </span>
      </transition>
    </div>
  </div>
  <div class="mt-3">
    <span id="legend-add" class="is-block" v-html="i18n.legendAdd" />
    <span id="legend-subtract" class="is-block" v-html="i18n.legendSubtract" />
  </div>
</template>

<script>
import { mulCounter as i18n } from "@/i18n/it/views/tasks";
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
    const counterValue = ref("");

    // watch
    watch(
      () => props.counterData,
      (value) => {
        // update gauges with random firing times
        setTimeout(
          () => (counterValue.value = value),
          parseInt(Math.random() * 700)
        );
      },
      { deep: true }
    );

    // format counter value
    const formatCounterValue = (value) => {
      if (typeof value == "string") return value;
      return Math.abs(Math.floor(value));
    };

    // return setup object
    return {
      i18n,
      counterValue,
      formatCounterValue,
    };
  },
};
</script>

<style lang="scss" scoped>
$background-color-1: #fe8c00;
$background-color-2: #dc3295;

#mul-counter {
  height: 180px;
  width: 280px;
  font-size: 6em;
  color: #000;

  div {
    height: 100%;
    width: 50%;
  }

  div:first-child {
    background-color: $background-color-1;
    color: lighten($background-color-1, 50%);
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  div:last-child {
    background-color: $background-color-2;
    color: lighten($background-color-2, 50%);
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
}

#legend-add {
  color: $background-color-1;
}

#legend-subtract {
  color: $background-color-2;
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
