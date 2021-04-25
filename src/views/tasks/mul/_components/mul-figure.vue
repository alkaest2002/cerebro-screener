<template>
  <div
    class="card is-relative is-flex is-align-items-center is-justify-content-center"
    :class="cardClass"
  />
</template>

<script>
export default {
  // name
  name: "mul-figure",

  // props
  props: {
    cardClass: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
$dim: 100px;

.card {
  height: $dim;
  width: $dim;
  color: #fff;
  font-size: $dim * 0.85;

  &.circle {
    border-radius: 50%;
  }

  &.rhombus {
    transform: rotate(45deg);

    &::after {
      transform: rotate(-45deg);
    }
  }

  &.a::after {
    content: "A";
  }

  &.b::after {
    content: "B";
  }

  &.c::after {
    content: "C";
  }

  &.d::after {
    content: "D";
  }

  &.e::after {
    content: "E";
  }

  &.f::after {
    content: "F";
  }

  &.g::after {
    content: "G";
  }

  &.h::after {
    content: "H";
  }

  &.j::after {
    content: "J";
  }

  &.k::after {
    content: "K";
  }

  &.blue {
    background-color: navy;
  }

  &.orange {
    background-color: orange;
  }

  &.fuchsia {
    background-color: fuchsia;
  }
}
</style>
