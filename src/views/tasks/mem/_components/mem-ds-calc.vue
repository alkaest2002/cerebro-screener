<template>
  <div id="calc" class="is-relative is-flex is-flex-direction-column p-1 mt-5">
    <div
      v-if="!sequenceHasPlayed"
      class="cover is-overlay is-flex is-justify-content-center is-align-items-center"
    >
      <img src="@/assets/images/lock.svg" style="height: 60px" />
    </div>
    <div
      id="calc-screen"
      class="is-flex is-justify-content-center is-align-items-center"
    >
      <span class="is-size-2 has-text-grey has-text-weight-bold">
        {{ screen.join("").slice(0, 9) }}
      </span>
    </div>
    <div id="first-row" class="is-flex">
      <div
        v-for="n in [1, 2, 3]"
        :key="n"
        class="calc-number"
        @click="onClickNumber(n)"
      >
        {{ n }}
      </div>
    </div>
    <div id="second-row" class="is-flex">
      <div
        v-for="n in [4, 5, 6]"
        :key="n"
        class="calc-number"
        @click="onClickNumber(n)"
      >
        {{ n }}
      </div>
    </div>
    <div id="third-row" class="is-flex">
      <div
        v-for="n in [7, 8, 9]"
        :key="n"
        class="calc-number"
        @click="onClickNumber(n)"
      >
        {{ n }}
      </div>
    </div>
    <div id="forth-row" class="is-flex">
      <div id="reset" class="is-flex-grow-1" @click="onClickReset">
        {{ i18n.buttons.reset }}
      </div>
    </div>
  </div>
</template>

<script>
import { memDsItem as i18n } from "@/i18n/it/views/tasks";
import { ref } from "vue";
import { clone } from "@/utils/utilityFns";

export default {
  // name
  name: "mem-ds-calc",

  // props
  props: {
    userSequence: {
      type: Array,
      default: () => [],
    },

    sequenceHasPlayed: {
      type: Boolean,
      default: false,
    },
  },

  // emitted events
  emits: {
    "add-number-to-user-sequence": (value) => Array.isArray(value),
    "reset-user-sequence": null,
  },

  // setup
  setup(props, { emit }) {
    // calculator screen
    const screen = ref(clone(props.userSequence));

    // handle on click number
    const onClickNumber = (number) => {
      // do nothing if numbers are more than 9
      if (screen.value.length == 9) return;
      // add number to screen
      screen.value.push(number);
      // emit event
      emit("add-number-to-user-sequence", screen.value);
    };

    // handle on reset user sequence
    const onClickReset = () => {
      // reset sequence
      screen.value = [];
      // emit event
      emit("reset-user-sequence");
    };

    // return setup object
    return {
      i18n,
      screen,
      onClickNumber,
      onClickReset,
    };
  },
};
</script>

<style lang="scss" scoped>
$background-dark: #ddd;
$background-light: #eee;
$digit-color: #7a7a7a;
$reset-color: #ff8202;
$cover-color: rgba(200, 200, 200, 0.85);
$border-radius: 6px;

#calc {
  width: 265px;
  height: 300px;
  border: 6px solid $background-dark;
  background-color: $background-dark;
  border-radius: $border-radius;
  overflow: hidden;

  .cover {
    background-color: $cover-color;
  }

  #calc-screen {
    height: 70px;
    width: 100%;
    background-color: $background-light;
    margin-bottom: 5px;
    border-radius: $border-radius;
  }

  .calc-number {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: $background-dark;
    color: $digit-color;
    font-size: 1.7em;
    border-radius: $border-radius;

    &:hover {
      cursor: pointer;
      color: lighten($digit-color, 50%);
      background-color: darken($background-dark, 10%);
    }
  }

  #reset {
    @extend .calc-number;
    margin-top: 5px;
    border-radius: $border-radius;
    background-color: $reset-color;
    color: lighten($reset-color, 50%);

    &:hover {
      cursor: pointer;
      background-color: darken($reset-color, 5%);
    }
  }
}
</style>
