<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="control">
      <component
        :is="vertical ? 'div' : 'span'"
        v-for="option in options"
        :key="option.value"
        :class="{ horizontal: !vertical }"
      >
        <form-radio
          :label="option.label"
          :name="name"
          :value="option.value"
          :model-value="modelValue"
          :disabled="disabled"
          @update:model-value="$emit('update:modelValue', $event)"
        />
      </component>
    </div>
    <small v-if="localErrors.length" class="has-text-danger">
      <div v-for="(error, index) in localErrors" :key="index">{{ error }}</div>
    </small>
  </div>
</template>

<script>
import { computed } from "vue";
import formRadio from "./form-radio";

export default {
  // name
  name: "form-radio-group",

  // components
  components: {
    formRadio,
  },

  // props
  props: {
    options: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Object,
      default: () => new Map(),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  // emitted events
  emits: {
    "update:modelValue": (value) => ["string", "number"].includes(typeof value),
  },

  // setup
  setup(props) {
    // computed
    const localErrors = computed(() => {
      // filter out map entries in the form of null => null
      // such entries comes from successful validations
      return Array.from(props.errors.values()).filter((e) => e);
    });

    // computed
    const inputClass = computed(() => {
      // on validation error
      if (localErrors.value.length > 0) {
        return [...props.cssClass, "is-danger"];
      }

      // no error css
      return props.cssClass;
    });

    // return setup object
    return {
      inputClass,
      localErrors,
    };
  },
};
</script>

<style scoped>
.horizontal {
  margin-right: 20px;
}
</style>
