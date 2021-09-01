<template>
  <div class="likert is-flex is-align-items-center is-relative">
    <div
      v-for="val in likert"
      :key="val"
      :class="{ active: val == modelValue }"
      class="is-flex is-justify-content-center is-align-items-center"
      @click="$emit('update:modelValue', val)"
    >
      <span>
        {{ val }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  // name
  name: "item-likert",

  // props
  props: {
    minValue: {
      type: Number,
      default: null,
    },

    maxValue: {
      type: Number,
      default: null,
    },

    modelValue: {
      type: Number,
      default: null,
    },
  },

  // emitted event
  emits: {
    "update:modelValue": (value) => typeof value === "number",
  },

  setup(props) {
    // define likert
    const likert = Array.apply(null, { length: props.maxValue + 1 })
      .map(Number.call, Number)
      .slice(props.minValue);

    // return setup object
    return {
      likert,
    };
  },
};
</script>

<style lang="scss" scoped>
$likert-text-color: #777;
$likert-active-text-color: #fff;
$likert-background-color: #eee;
$likert-active-background-color: #3273dc;

.likert {
  cursor: pointer;

  & > div {
    height: 33px;
    width: 33px;
    padding: 3px;
    background-color: $likert-background-color;
    border: 2px solid darken($likert-background-color, 10%);
    border-radius: 50%;
    color: $likert-text-color;
    margin-right: 2px;

    &.active {
      background-color: $likert-active-background-color;
      border: 2px solid darken($likert-active-background-color, 10%);
      color: $likert-active-text-color;
    }

    &:hover {
      @extend .active;
    }
  }
}
</style>
