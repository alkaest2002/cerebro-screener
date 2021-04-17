<template>
  <label class="radio">
    <input
      type="radio"
      :checked="modelValue === value"
      :value="value"
      v-bind="$attrs"
      @change="$emit('update:modelValue', value)"
    />
    {{ label }}
  </label>
</template>

<script>
export default {
  // name
  name: "form-radio",

  // emitted events
  emits: {
    "update:modelValue": (value) => ["string", "number"].includes(typeof value),
  },

  // props
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    value: {
      type: [String, Number, null],
      required: true,
    },
  },
};
</script>
