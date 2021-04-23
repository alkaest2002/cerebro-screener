<template>
  <div id="presenter-wrapper">
    <div id="title" class="mb-3">
      <h1 class="is-size-3 has-text-weight-bold">
        <slot name="title">
          {{ i18n.tasks.task }}
          {{ Math.min(60, itemData.droppedCards.length + 1) }} di
          {{ itemData.cards.length }}
        </slot>
      </h1>
    </div>
    <div id="presenter" class="is-relative is-clipped box">
      <item-container>
        <div
          class="is-flex is-flex-direction-column is-align-items-center mb-4"
        >
          <div class="mb-1">
            <span>{{ i18n.tasks.wcs.cards }}:</span>&nbsp;
            <span class="mr-0 has-text-grey has-text-weight-bold">{{
              itemData.cards.length - itemData.droppedCards.length
            }}</span>
          </div>
          <wcs-card v-bind="{ ...currentCard }" id="card" />
        </div>
        <wcs-decks :item-data="itemData" />
        <wcs-stimulus-cards
          :item-data="itemData"
          @click-stimulus-card="onClickStimulusCard"
        />
        <slot name="explanation" :item-data="itemData" />
      </item-container>
    </div>
  </div>
</template>

<script>
import { tasks as i18n } from "@/i18n/it/views/tasks";
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { clone } from "@/utils/utilityFns";
import initItem from "@/views/tasks/_composables/initItem";
import ItemContainer from "../_components/item-container.vue";
import wcsCard from "./_components/wcs-card";
import wcsDecks from "./_components/wcs-decks";
import wcsStimulusCards from "./_components/wcs-stimulus-cards";

export default {
  // name
  name: "wcs-item",

  // components
  components: {
    ItemContainer,
    wcsCard,
    wcsDecks,
    wcsStimulusCards,
  },

  // props
  props: {
    presenter: {
      type: Object,
      required: true,
    },
  },

  // setup
  setup(props) {
    // init presenter
    const { totalItems, itemData } = initItem(props.presenter.itemData);

    // use store
    const store = useStore();

    // rule sequence (no need to be reactive)
    const ruleSequence = ["color", "figure", "number", "color"];

    // void card (no need to be reactive)
    const voidCard = { color: "gray", figure: "none", number: "zero" };

    // current rule
    const currentRule = computed(() => {
      // get current rule
      const currentRule = itemData.rules.slice(-1)[0] || itemData.initialRule;
      // return current rule or new one (if it's the case)
      return itemData.rules.slice(-10).length == 10 &&
        itemData.rules.slice(-10).every((e) => e == currentRule)
        ? ruleSequence[ruleSequence.findIndex((e) => e == currentRule) + 1]
        : currentRule;
    });

    // current card
    const currentCard = computed(() => {
      // on last card, next card is a void one
      if (itemData.cards.length == itemData.droppedCards.length)
        return { ...voidCard };
      // return current card
      return itemData.cards[itemData.droppedCards.length];
    });

    // flipped cards
    const flippedCards = computed(() => itemData.droppedCards.length || 0);

    // watch flipped cards
    watch(
      flippedCards,
      (value) => {
        // update currentPresenterSubIndex
        store.dispatch("presenters/setCurrentPresenterSubIndex", value);
        // update time in
        store.dispatch("presenters/updatePresenterEpoch", { type: "timeIn" });
      },
      { immediate: true }
    );

    // handle on click deck
    const onClickStimulusCard = ({
      index: cardIndex,
      card: clickedStimulusCard,
    }) => {
      // do nothing under this condition
      if (itemData.droppedCards.length == itemData.cards.length) return;
      // check wheter answer is correct
      const answerIsCorrect =
        currentCard.value[currentRule.value] ==
        clickedStimulusCard[currentRule.value];
      // clone current card
      const clonedCurrentCard = clone(currentCard);
      // create empty decks
      let decks = Array.from({ length: 4 }, () => {
        return { ...voidCard };
      });
      // add clciked card to  empty decks
      decks.splice(cardIndex, 1, clonedCurrentCard);
      // update decks
      itemData.decks = clone(decks);
      // update feedback
      itemData.feedback = {
        index: cardIndex,
        message: answerIsCorrect
          ? i18n.tasks.wcs.feedback.right
          : i18n.tasks.wcs.feedback.wrong,
      };
      // update rules
      itemData.rules = itemData.rules.concat(
        [currentRule.value].slice(0, !!answerIsCorrect)
      );
      // update timeOut
      setTimeout(
        () =>
          store.dispatch("presenters/updatePresenterEpoch", {
            type: "timeOut",
          }),
        0
      );
      // update dropped cards
      itemData.droppedCards = itemData.droppedCards.concat([answerIsCorrect]);
      // enable next
      itemData.enableNext =
        itemData.droppedCards.length == itemData.cards.length;
    };

    // return setup object
    return {
      i18n,
      totalItems,
      itemData,
      currentCard,
      onClickStimulusCard,
    };
  },
};
</script>
