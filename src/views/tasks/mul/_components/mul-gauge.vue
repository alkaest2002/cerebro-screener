<template>
  <svg :percent="gagueValue">
    <circle cx="70" cy="70" r="64"></circle>
    <circle cx="70" cy="70" r="64"></circle>
    <text class="value" x="70" y="75" text-anchor="middle">
      <tspan>{{ gagueValue }}%</tspan>
    </text>
    <text class="caption" x="70" y="100" text-anchor="middle">
      <tspan>{{ name }}</tspan>
    </text>
  </svg>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
export default {
  // name
  name: "mul-gague",

  // props
  props: {
    percent: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
  },

  // setup
  setup(props) {

    // interval
    const interval = ref(null);

    // randomOffset
    const randomOffset = ref(0);

    // gagueValue
    const gagueValue = computed(
      () => {
        const offset = props.percent < 50
          ? -randomOffset.value
          : randomOffset.value
        console.log(offset);
        return props.percent + offset
      }
    );

    // on mounted, set interval
    onMounted(() => interval.value = setInterval(
      () => randomOffset.value = parseInt(Math.random()*10), 1000)
    );

    // on unmounted, clear interval
    onUnmounted(() => clearInterval(interval.value));

    // return setup object
    return {
      gagueValue
    }
  }
};
</script>

<style lang="scss" scoped>
$w: 140px;

svg {
  display: block;
  width: $w;
  height: $w;
  margin: 3px;

  circle {
    fill: none;
    stroke-width: 12px;
    transform-origin: $w/2 $w/2 0;
    transform: rotate(270deg);

    &:nth-child(1) {
      stroke: rgba(black, 0.2);
    }
    &:nth-child(2) {
      stroke: #7fc146;
      stroke-dasharray: 402.124;
      stroke-dashoffset: 402.124;
      transition: all 0.5s ease-out;
    }
  }

  @for $i from 1 through 100 {
    &[percent="#{$i}"] {
      circle {
        &:nth-child(2) {
          stroke-dashoffset: #{402.124 - (402.124 * ($i/100))};
          stroke: #ff9500;
        }
      }
    }
  }

  text {
    fill: rgb(136, 136, 136);

    &.value {
      font-size: 36px;
      font-weight: 300;
    }

    &.caption {
      font-weight: bold;
      font-size: 15px;
      text-transform: uppercase;
    }
  }
}
</style>
