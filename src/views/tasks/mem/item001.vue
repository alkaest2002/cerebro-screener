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
          class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
        >
          <ds-display
            :sequence="itemData.sequence"
            @sequence-has-played="onSequenceHasPlayed"
          />
          <ds-calc
            :user-sequence="itemData.userSequence"
            :sequence-has-played="itemData.sequenceHasPlayed"
            @add-number-to-user-sequence="onAddNumberToUserSequence"
            @reset-user-sequence="onResetUserSequence"
          />
        </div>
        <slot name="explanation" :item-data="itemData" />
      </item-container>
    </div>
  </div>
</template>

<script>
import initPresenter from "@/views/tasks/_composables/initPresenter";
import itemContainer from "../_components/item-container.vue";
import dsDisplay from "./_components/mem-ds-display";
import dsCalc from "./_components/mem-ds-calc";

export default {
  // name
  name: "task-mem-ds-item",

  // components
  components: {
    itemContainer,
    dsDisplay,
    dsCalc,
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

    // handle on sequnce has played
    const onSequenceHasPlayed = () => {
      itemData.sequenceHasPlayed = true;
    };

    // handle number added to user sequence
    const onAddNumberToUserSequence = (value) => {
      itemData.actions++;
      itemData.userSequence = value;
      itemData.enableNext =
        itemData.userSequence.length == itemData.sequence.length;
    };

    // handle reset user sequence
    const onResetUserSequence = () => {
      itemData.actions++;
      itemData.userSequence = [];
      itemData.enableNext = false;
    };

    // return setup object
    return {
      totalItems,
      itemData,
      onSequenceHasPlayed,
      onAddNumberToUserSequence,
      onResetUserSequence,
    };
  },
};
</script>
