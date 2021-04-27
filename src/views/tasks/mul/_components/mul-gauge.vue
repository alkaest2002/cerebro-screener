<template>
  <div class="is-relative">
    <div v-if="animationHasEnded" class="lid is-overlay" />
    <svg :percent="percent">
      <circle cx="70" cy="70" r="64"></circle>
      <circle cx="70" cy="70" r="64"></circle>
      <text class="value" x="70" y="75" text-anchor="middle">
        <tspan>{{ percent }}%</tspan>
      </text>
      <text class="caption" x="70" y="100" text-anchor="middle">
        <tspan>{{ name }}</tspan>
      </text>
    </svg>
  </div>
</template>

<script>
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

    animationHasEnded: {
      type: Boolean,
      required: true
    }
  },
};
</script>

<style lang="scss" scoped>
$w: 140px;
$lid-background-color: #ddd;
$lid-background-pattern: repeating-linear-gradient(
  45deg,
  #e5e5e5,
  #e5e5e5 10px,
  #eee 10px,
  #eee 20px
);
$gauge-color-stroke: #ff9500;
$gauge-color-text: #aaa;

.lid {
  border-radius: 50%;
  border: 6px solid $lid-background-color;
  background: $lid-background-pattern;
}

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
      stroke: $gauge-color-stroke;
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
          stroke: $gauge-color-stroke;
        }
      }
    }
  }

  text {
    fill: $gauge-color-text;

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
