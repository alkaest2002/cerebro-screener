<template>
  <div
    class="is-flex is-flex-direction-column is-align-items-center is-justify-content-center"
  >
    <div
      :class="{ [`grid-size-${gridSize}`]: true }"
      id="grid"
      class="is-flex is-flex-wrap-wrap"
    >
      <div v-for="(numbers, index) in grid" :key="index">
        <div
          :class="{
            'has-background-danger-light':
              numbers[0] && numbers[0] == clickedNumber,
          }"
          @click="onClickNumber({ number: numbers[0] })"
          class="grid-number is-flex is-justify-content-center is-align-items-center"
        >
          <span
            :class="{
              'has-text-danger-dark': numbers[0] && numbers[0] == clickedNumber,
            }"
            class="is-size-2"
          >
            {{ numbers[0] }}
          </span>
        </div>
      </div>
    </div>
    <div id="next-number" class="mt-2 has-text-centered">
      <span class="has-text-grey">
        Prossimo numero: {{ numberToClick || "-" }}
      </span>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { clone } from "@/utils/utilityFns";

export default {
  // name
  name: "task-att-component-att-grid",

  // emitted events
  emits: {
    updateNumbers: (value) =>
      ["numbers", "errors"].every((e) => Object.keys(value).includes(e)),
  },

  // props
  props: {
    numbers: {
      type: Array,
      required: true,
    },
  },

  // setup
  setup(props, { emit }) {
    // no need to be reactive
    const gridSizes = [36, 25, 16, 9];

    // refs
    const gridNumbers = ref(clone(props.numbers));
    const clickedNumber = ref(null);

    // gridSize
    const gridSize = computed(
      () => gridSizes.filter((e) => gridNumbers.value.length % e == 0)[0]
    );

    // grid of numbers
    const grid = computed(() => {
      // slice numbers into grids of specified gridSize
      let grids = [];
      for (let i = 0; i < gridNumbers.value.length / gridSize.value; i++) {
        grids.push(
          gridNumbers.value.slice(i * gridSize.value, (i + 1) * gridSize.value)
        );
      }
      // build and return grid
      return grids.reduce((acc, itr) => {
        itr.forEach((e, index) => {
          acc[index] = (acc[index] ? acc[index].concat(e) : [e]).filter(
            (e) => e
          );
        });
        return acc;
      }, []);
    });

    // last clicked Number
    const numberToClick = computed(() => {
      // clone numbers
      const clonedNumbers = [...gridNumbers.value];
      // sort cloned numbers (stripping nullish values) and return first one
      return clonedNumbers.filter((e) => e).sort((a, b) => a - b)[0];
    });

    // handle on click number
    const onClickNumber = ({ number }) => {
      // if clicked number is the correct one
      if (number == numberToClick.value)
        // delete number from local numbers
        gridNumbers.value.splice(
          gridNumbers.value.findIndex((e) => e == number),
          1,
          null
        );
      // store clicked number
      clickedNumber.value = number;
      // emit event
      emit("updateNumbers", {
        numbers: gridNumbers.value,
        errors: +(number != numberToClick.value - 1),
      });
    };

    // return setup object
    return {
      grid,
      gridSize,
      clickedNumber,
      numberToClick,
      onClickNumber,
    };
  },
};
</script>

<style lang="scss" scoped>
$background-color: #eee;
$border-color: #ddd;

.grid-number {
  background: $background-color;
  border-radius: 5px;
  border: 2px solid $border-color;
  padding: 10px;
  margin: 1px;
  cursor: pointer;
}

.grid-size-9 {
  width: 231px;

  .grid-number {
    width: 75px;
    height: 75px;
  }

  #next-number {
    width: 231px;
  }
}

.grid-size-16 {
  width: 308px;

  .grid-number {
    width: 75px;
    height: 75px;
  }

  #next-number {
    width: 308px;
  }
}

.grid-size-25 {
  width: 385px;

  .grid-number {
    width: 75px;
    height: 75px;
  }

  #next-number {
    width: 385px;
  }
}

.grid-size-36 {
  width: 462px;

  .grid-number {
    width: 75px;
    height: 75px;
  }

  & + #next-number {
    width: 462px;
  }
}
</style>
