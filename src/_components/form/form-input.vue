<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="control">
      <input
        class="input"
        ref="inputRef"
        :class="inputClass"
        :type="inputType"
        :placeholder="placeholder"
        :value="modelValue"
        v-bind="$attrs"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
    <small class="has-text-danger" v-if="localErrors.length">
      <div v-for="(error, index) in localErrors" :key="index">{{ error }}</div>
    </small>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";

export default {
  // name
  name: "form-input",

  // emitted events
  emits: {
    "update:modelValue": (value) => ["number", "string"].includes(typeof value),
  },

  // props
  props: {
    label: {
      default: null,
    },
    placeholder: {
      type: String,
      required: true,
    },
    inputType: {
      default: "text",
    },
    modelValue: {
      type: [String, Number, null],
      default: "",
    },
    cssClass: {
      default: [],
    },
    errors: {
      type: Object,
      default: () => new Map(),
    },
    autoFocus: {
      type: Boolean,
    },
  },

  // setup
  setup(props) {
    // define refs
    const inputRef = ref(null);

    // define computed props
    const localErrors = computed(() => {
      // if there is a required error, disregard the rest
      if (props.errors.has("required")) return [props.errors.get("required")];

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

    // if autofocus, focus
    onMounted(() => {
      if (props.autoFocus) inputRef.value.focus();
    });

    // return setup object
    return {
      inputRef,
      inputClass,
      localErrors,
    };
  },
};
</script>
