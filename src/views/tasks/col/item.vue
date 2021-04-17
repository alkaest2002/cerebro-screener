<template>
  <div id="presenter-wrapper">
    <div id="title" class="mb-3">
      <h1 class="is-size-3 has-text-weight-bold">
        <slot name="title">
          Quesito {{ presenter.itemIndex + 1 }} di {{ totalItems }}
        </slot>
      </h1>
    </div>
    <div id="presenter" class="is-relative is-clipped box">
      <item-container>
        <div class="is-flex is-justify-content-center">
          <div id="cards-grid" class="is-flex is-flex-wrap-wrap mr-6">
            <col-card
              v-for="(card, index) in itemData.cards"
              :key="index"
              :card="card"
              @click="onClickCard(index)"
              class="m-1"
            />
          </div>
          <col-table-info
            :item-data="itemData"
            :flipped-amounts="flippedAmounts"
            :running-amount="runningAmount"
            :total-amount="totalAmount"
            @click="onClickCollect"
          />
        </div>
        <slot name="explanation" :item-data="itemData" />
      </item-container>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { shuffle, clone } from "@/utils/utilityFns";
import initPresenter from "@/views/tasks/_composables/initPresenter";
import itemContainer from "@/views/tasks/_components/item-container";
import colCard from "./_components/col-card";
import colTableInfo from "./_components/col-table-info";

export default {
  // name
  name: "task-col-item",

  // components
  components: {
    itemContainer,
    colCard,
    colTableInfo,
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
    const { totalItems, itemData, previousItemsItemData } = initPresenter(
      props.presenter.itemData
    );

    // flipped amounts
    const flippedAmounts = computed(() => itemData.flippedAmounts);

    // running amount
    const runningAmount = computed(
      () =>
        previousItemsItemData.reduce(
          (acc, itr) => (acc += itr.totalAmount),
          0
        ) + totalAmount.value
    );

    // total amount
    const totalAmount = computed(() =>
      flippedAmounts.value.reduce((acc, itr) => (acc += itr), 0)
    );

    // handle on click card
    const onClickCard = (index) => {
      // clone clicked card
      let clickedCard = clone(itemData.cards[index]);
      // do nothing if clicked card is not covered
      if (!clickedCard.isCovered) return;
      // set outcome to lose under these conditions
      const outcome = [
        flippedAmounts.value.length + 1 == itemData.loseAt,
        flippedAmounts.value.length ==
          itemData.cards.length - itemData.loseCards,
      ].some((e) => e)
        ? "lose"
        : "win";
      // determine amout
      const amount = outcome == "win" ? itemData.win : itemData.lose;
      // uncover all cards, if outcome is lose
      if (outcome == "lose") {
        // set clicked card amount to lose
        clickedCard.amount = itemData.lose;
        // uncover all cards
        itemData.cards = itemData.cards.map((e) => {
          e.isCovered = false;
          return e;
        });
        // enable next
        itemData.enableNext = true;
      }
      // update clicked card
      clickedCard = Object.assign(clickedCard, { isCovered: false });
      // update itemData
      itemData.cards.splice(index, 1, clickedCard);
      itemData.flippedAmounts.push(amount);
      itemData.totalAmount = totalAmount.value;
      itemData.outcome = outcome;
    };

    // handle on click finish
    const onClickCollect = () => {
      // clone cards
      let clonedCards = clone(itemData.cards);
      // update itemData cards
      itemData.cards = ((cards) => {
        // get indices of covered cards and shuffle them
        const targetIndices = shuffle(
          cards.map((e, index) => (e.isCovered ? index : null)).filter((e) => e)
        );
        // update some random cards to be lose cards
        for (let i = 0; i < itemData.loseCards; i++) {
          cards[targetIndices[i]].amount = itemData.lose;
        }
        // return cards
        return cards;
      })(clonedCards).map((e) => {
        // uncover all cards
        e.isCovered = false;
        return e;
      });
      // enable next
      itemData.enableNext = true;
    };

    // return
    return {
      totalItems,
      itemData,
      flippedAmounts,
      totalAmount,
      runningAmount,
      onClickCard,
      onClickCollect,
    };
  },
};
</script>

<style lang="scss" scoped>
#cards-grid {
  width: 340px;
}
</style>
