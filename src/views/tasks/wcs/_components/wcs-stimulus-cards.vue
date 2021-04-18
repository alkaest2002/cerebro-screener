<template>
  <div id="stimulus-cards" class="is-flex is-justify-content-center">
    <wcs-card
      v-for="(card, index) of stimulusCards"
      :key="index"
      :class="{
        'is-clickable': itemData.droppedCards.length < itemData.cards.length,
        hover: itemData.droppedCards.length < itemData.cards.length,
      }"
      v-bind="{ ...card }"
      @click="$emit('onClickStimulusCard', { index, card })"
    />
  </div>
</template>

<script>
import wcsCard from "./wcs-card";

export default {
  // name
  name: "task-wcs-component-stimulus-cards",

  // components
  components: {
    wcsCard,
  },

  // do not inherit attributs
  inheritAttrs: false,

  // props
  props: {
    itemData: {
      type: Object,
      required: true,
    },
  },

  // emitted events
  emits: {
    onClickStimulusCard: (value) =>
      ["index", "card"].every((e) => Object.keys(value).includes(e)),
  },

  // setup
  setup() {
    // stimulus cards (no need to be reactive)
    const stimulusCards = [
      { color: "red", figure: "circle", number: "one" },
      { color: "green", figure: "star", number: "two" },
      { color: "blue", figure: "diamond", number: "three" },
      { color: "yellow", figure: "cross", number: "four" },
    ];

    // return setup object
    return {
      stimulusCards,
    };
  },
};
</script>

<style lang="scss" scoped>
$hover-shadow-color: #ccc;
$hover-shadow-color-highlight: #bababa;

#stimulus-cards {
  > div.hover {
    box-shadow: 4px 4px 3px 0px $hover-shadow-color;

    &:hover {
      box-shadow: 4px 4px 3px 0px $hover-shadow-color-highlight;
    }
  }
}
</style>
