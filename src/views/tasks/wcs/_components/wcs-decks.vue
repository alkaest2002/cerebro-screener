<template>
  <div id="feedbacks" class="is-flex is-justify-content-center mt-2 mb-2">
    <div
      v-for="(feedback, feedbackIndex) in [0, 1, 2, 3]"
      :key="feedbackIndex"
      :style="{
        visibility:
          itemData.feedback.index != null &&
          feedbackIndex == itemData.feedback.index
            ? 'inherit'
            : 'hidden',
      }"
      class="feedback has-text-centered has-text-grey"
    >
      <span class="has-text-center">{{ itemData.feedback.message }}</span>
    </div>
  </div>
  <div id="decks" class="is-flex is-justify-content-center mb-1">
    <wcs-card
      v-for="(card, index) in currentDecks"
      :key="index"
      v-bind="{ ...card }"
      class="deck"
    />
  </div>
</template>

<script>
import { computed } from "vue";
import wcsCard from "./wcs-card";

export default {
  // name
  name: "task-wcs-component-decks",

  // componenents
  components: {
    wcsCard,
  },

  // props
  props: {
    itemData: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    // empty decks (no need to be reactive)
    const emptyDecks = [
      { color: "gray", figure: "none", number: "zero" },
      { color: "gray", figure: "none", number: "zero" },
      { color: "gray", figure: "none", number: "zero" },
      { color: "gray", figure: "none", number: "zero" },
    ];

    // current Decks
    const currentDecks = computed(() => {
      if (props.itemData.decks.length == 0) return [...emptyDecks];
      return props.itemData.decks;
    });

    // return setup object
    return {
      currentDecks,
    };
  },
};
</script>

<style lang="scss" scoped>
$hover-shadow-color: #ccc;
$hover-shadow-color-highlight: #bababa;

#decks > div:not(.gray) {
  opacity: 0.3;
}

#feedbacks {
  min-height: 25px;

  .feedback {
    width: 90px;
    margin: 0 10px;
    border-radius: 6px;
  }
}
</style>
