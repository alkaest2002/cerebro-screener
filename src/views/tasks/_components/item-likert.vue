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
  name: "task-component-likert",

  // emitted event
  emits: {
    "update:modelValue": (value) => typeof value === "number",
  },

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

  setup(props) {
    // create likert
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
.likert {
  cursor: pointer;

  & > div {
    height: 33px;
    width: 33px;
    padding: 3px;
    background-color: #eee;
    border: 2px solid darken(#eee, 10%);
    border-radius: 50%;
    color: #777;
    margin-right: 2px;

    &.active {
      background-color: #3273dc;
      border: 2px solid darken(#3273dc, 10%);
      color: #fff !important;
    }

    &:hover {
      @extend .active;
    }
  }
}
</style>
