<template>
  <div
    :class="{ [discColor]: true, 'is-clickable': !isLocked }"
    :draggable="!isLocked"
    class="disc"
  />
</template>

<script>
export default {
  // name
  name: "tol-disc",

  // props
  props: {
    discColor: {
      type: String,
      required: true,
    },
    isLocked: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin disc-color($color) {
  background-color: $color;
  border-radius: 6px;
}

.disc {
  align-self: flex-end;
  margin-top: 5px;
  height: 71px;
  width: 100%;

  &:first-child {
    margin-top: 0;
  }

  &.red {
    @include disc-color(#ed5565);
  }

  &.green {
    @include disc-color(#48cfad);
  }

  &.blue {
    @include disc-color(#5d95ec);
  }
}
</style>
