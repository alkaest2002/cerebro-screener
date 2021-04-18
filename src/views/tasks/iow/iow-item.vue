<template>
  <div id="presenter-wrapper">
    <div id="title" class="mb-3">
      <h1 class="is-size-3 has-text-weight-bold">
        <slot name="title">
          Quesito {{ Math.min(100, flippedCards + 1) }} di
          {{ itemData.decks[0].cards.length }}
        </slot>
      </h1>
    </div>
    <div id="presenter" class="is-relative is-clipped box">
      <item-container>
        <div
          class="mb-4 has-text-grey is-size-5 is-flex is-align-items-center is-justify-content-center"
        >
          <span class="mr-3">carte rimanenti:</span>
          <span class="has-text-weight-bold number">{{
            itemData.decks[0].cards.length - flippedCards
          }}</span>
        </div>
        <div class="is-flex is-justify-content-center">
          <div
            v-for="(deck, deckIndex) in itemData.decks"
            :key="deckIndex"
            class="deck"
          >
            <iow-deck
              :key="deckIndex"
              :is-locked="lockDecks || flippedCards == deck.cards.length"
              :cards="deck.cards"
              :class="{
                'is-clickable': flippedCards < itemData.decks[0].cards.length,
              }"
              @click="onClickDeck({ deckId: deck.deckId, deckIndex })"
            />
          </div>
        </div>
        <iow-info :item-data="itemData" class="mt-5" />
        <slot name="explanation" :item-data="itemData" />
      </item-container>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { clone } from "@/utils/utilityFns";
import initPresenter from "@/views/tasks/_composables/initPresenter";
import itemContainer from "@/views/tasks/_components/item-container";
import iowDeck from "./_components/iow-deck";
import iowInfo from "./_components/iow-info";

export default {
  // name
  name: "iow-item",

  // components
  components: {
    itemContainer,
    iowDeck,
    iowInfo,
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
    // get store
    const store = useStore();

    // init presenter
    const { totalItems, itemData } = initPresenter(props.presenter.itemData);

    // locakDecks flag
    const lockDecks = ref(false);

    // computed
    const flippedCards = computed(() => {
      // count flipped cards
      return itemData.deckIds.length || 0;
    });

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

    // handle click deck
    const onClickDeck = ({ deckId, deckIndex }) => {
      // do nothing under these conditions
      if (
        [
          lockDecks.value,
          flippedCards.value == itemData.decks[0].cards.length,
        ].some((e) => e)
      )
        return;
      // lock decks temporarily
      lockDecks.value = true;
      // clone clicked deck
      const clickedDeck = clone(itemData.decks[deckIndex]);
      // get top card from clicked deck
      const flippedCard = clickedDeck.cards.filter((e) => e)[0];
      // replace top card in clicked deck with null
      clickedDeck.cards.splice(
        clickedDeck.cards.findIndex((e) => e),
        1,
        null
      );
      // update wins
      itemData.wins.push(flippedCard.win);
      // update losses
      itemData.losses.push(flippedCard.lose);
      // update netAmount
      itemData.netAmount += flippedCard.win + flippedCard.lose;
      // update other stuff after a bit
      setTimeout(() => {
        // update timeOut
        store.dispatch("presenters/updatePresenterEpoch", { type: "timeOut" });
        // update decks
        itemData.decks.splice(deckIndex, 1, clickedDeck);
        // update deckids
        itemData.deckIds.push(deckId);
        // enable next
        itemData.enableNext =
          flippedCards.value == itemData.decks[0].cards.length;
        // unlock decks
        lockDecks.value = false;
      }, 700);
    };

    // return
    return {
      totalItems,
      lockDecks,
      itemData,
      flippedCards,
      onClickDeck,
    };
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transition: opacity 0s;
}
</style>
