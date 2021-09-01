<template>
  <div class="is-flex is-flex-wrap-wrap keyboard">
    <span
      v-for="key in keys"
      :key="key"
      class="keyb-key is-flex is-justify-content-center is-align-items-center"
      @click="onClickKey(key)"
      v-html="key"
    />
  </div>
</template>

<script>

// init numbers and letters
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const letters = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
const backspace = "&#8612;"

// check legal keys function
const checkLegalKey = (value) => [...numbers, ...letters].indexOf(value) > -1;

export default {
  // name
  name: "form-keyboard",

  // props
  props: {
    type: {
      type: String,
      default: "full",
      validator: (value) => ["full", "letters", "numbers"].includes(value),
    },

    text: {
      type: String,
      default: null,
    },
  },

  // emitted events
  emits: {
    "update:modelValue": null
  },

  // setup
  setup(props, { emit }) {
    // set full keyboard (letters + numbers)
    let keys = [...numbers, ...letters];
    // set keyboard to only letters if it's the case
    if (props.type == "letters") keys = letters;
    // set keyboard to only nymber if it's the case
    if (props.type == "numbers") keys = numbers;
    // add backspace to keyboard
    keys = [backspace, ...keys];

    // on handle clickKey
    const onClickKey = (key) => {
      // if key is backspace
      if (key == backspace)
        return emit("update:modelValue", (props.text || "").slice(0, -1));
      // if key is legal
      if (checkLegalKey(key))
        // emit event
        emit("update:modelValue", (props.text || "") + key);
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

  .keyb-key {
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
