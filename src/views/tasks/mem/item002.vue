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
        <div
          class="is-flex is-align-content-space-around is-justify-content-center"
        >
          <cb-grid
            :sequence="itemData.sequence"
            :user-sequence="itemData.userSequence"
            :sequence-has-played="itemData.sequenceHasPlayed"
            @sequence-has-played="onSequenceHasPlayed"
            @click-number="onClickNumber"
          />
        </div>
        <slot name="explanation" :item-data="itemData" />
      </item-container>
    </div>
  </div>
</template>

<script>
import initPresenter from "@/views/tasks/_composables/initPresenter";
import ItemContainer from "../_components/item-container.vue";
import cbGrid from "./_components/mem-cb-grid";

export default {
  // name
  name: "task-mem-cb-item",

  // components
  components: {
    ItemContainer,
    cbGrid,
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
    const { totalItems, itemData } = initPresenter(props.presenter.itemData);

    // handle on sequence has played
    const onSequenceHasPlayed = () => {
      // update itemData
      itemData.sequenceHasPlayed = true;
    };

    // handle on click number
    const onClickNumber = (number) => {
      // if number is already in sequence
      if (itemData.userSequence.includes(number)) {
        // if number is the last one in sequence
        if (itemData.userSequence.slice(-1)[0] == number)
          // increment actions
          itemData.actions++;
        // remove number
        itemData.userSequence.splice(itemData.userSequence.indexOf(number), 1);
      } else {
        // increment actions
        itemData.actions++;
        // push number to user sequence
        itemData.userSequence.push(number);
      }
      // enable next
      itemData.enableNext =
        itemData.userSequence.length == itemData.sequence.length;
    };

    // return
    return {
      totalItems,
      itemData,
      onSequenceHasPlayed,
      onClickNumber,
    };
  },
};
</script>
