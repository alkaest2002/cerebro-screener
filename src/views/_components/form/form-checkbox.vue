<template>
  <div class="field">
    <div class="control">
      <label class="checkbox">
        <input
          type="checkbox"
          :checked="modelValue"
          @change="$emit('update:modelValue', $event.target.checked)"
        />
        {{ label }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  //name
  name: "form-checkbox",

  // props
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      required: true,
    },
  },

  // emitted events
  emits: {
    "update:modelValue": (value) => typeof value === "boolean",
  },
};
</script>
