<template>
  <label class="radio">
    <input
      type="radio"
      :checked="modelValue === value"
      :value="value"
      @change="$emit('update:modelValue', value)"
    />
    {{ label }}
  </label>
</template>

<script>
export default {
  // name
  name: "form-radio",

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

  // emitted events
  emits: {
    "update:modelValue": (value) => ["string", "number"].includes(typeof value),
  },
};
</script>
