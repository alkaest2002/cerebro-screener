<template>
  <div class="is-flex is-flex-wrap-wrap keyboard">
    <span
      v-for="key in keys"
      :key="key"
      class="keyboard-key is-flex is-justify-content-center is-align-items-center"
      @click="onClickKey(key)"
      v-html="key"
    />
  </div>
</template>

<script>
import { computed } from "vue";

// legal keys
const checkLegalKey = (value) =>
  "0123456789abcdefghijklmnopqrstuvwxyz".toUpperCase().indexOf(value) > -1;

export default {
  // name
  name: "bio-keyboard",

  // props
  props: {
    type: {
      type: String,
      default: "full",
      validator: (value) => ["full", "letters", "numbers"].includes(value),
    },

    text: {
      type: String,
      default: "",
    },
  },

  // emitted events
  emits: {
    "update:modelValue": (value) =>
      value.split("").every((e) => checkLegalKey(e)),
  },

  // setup
  setup(props, { emit }) {
    // build keys
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let letters = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
    let keys = [];
    if (props.type == "full") keys = [...numbers, ...letters];
    if (props.type == "numbers") keys = numbers;
    keys = ["&#8612;", ...keys];

    // input text
    const inputText = computed(() => props.text || "");

    // on handle clickKey
    const onClickKey = (key) => {
      // if key is cancel
      if (key == "&#8612;")
        return emit("update:modelValue", inputText.value.slice(0, -1));
      // if key is legal
      if (checkLegalKey(key))
        // emit event
        emit("update:modelValue", inputText.value + key.toString());
    };

    // return setup object
    return {
      keys,
      onClickKey,
    };
  },
};
</script>

<style lang="scss" scoped>
$key-border-color: #ddd;
$key-background-color: #eee;
$key-background-hover-color: #3273dc;
$key-hover-color: #fff;

.keyboard {
  width: 613px;

  .keyboard-key {
    display: inline-block;
    height: 30px;
    width: 30px;
    border: 1px solid $key-border-color;
    background-color: $key-background-color;
    border-radius: 3px;
    margin-left: 2px;
    margin-bottom: 2px;
    cursor: pointer;

    &:first-child {
      width: 62px;
    }

    &:nth-child(n + 12) {
      background-color: darken($key-background-color, 10%);
      border: 1px solid darken($key-border-color, 10%);
    }

    &:hover {
      background-color: $key-background-hover-color;
      color: $key-hover-color;
    }
  }
}
</style>
