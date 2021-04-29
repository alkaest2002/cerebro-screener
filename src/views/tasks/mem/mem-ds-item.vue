<template>
  <div id="presenter-wrapper">
    <div id="title" class="mb-3">
      <h1 class="is-size-3 has-text-weight-bold">
        <slot name="title">
          {{ i18n.task }} {{ presenter.itemIndex + 1 }}|{{ totalItems }}
        </slot>
      </h1>
    </div>
    <div id="presenter" class="is-relative is-clipped box">
      <item-container>
        <div
          class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
        >
          <ds-display
            :sequence-to-play="sequenceToPlay"
            :css-state="cssState"
          />
          <mem-starter
            :sequence-has-played="itemData.sequenceHasPlayed"
            @click="onClickPlay"
          >
            {{ i18n.clickNumbersOne }} {{ itemData.sequence.length }}
            {{ i18n.clickNumbersTwo }}
          </mem-starter>
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
import { memDsItem as i18n } from "@/i18n/it/views/tasks";
import initItem from "@/views/tasks/_composables/initItem";
import itemContainer from "../_components/item-container.vue";
import setupShowSequenceAnimation from "./_composables/setupSequenceAnimation";
import dsDisplay from "./_components/mem-ds-display";
import dsCalc from "./_components/mem-ds-calc";
import memStarter from "./_components/mem-starter";

export default {
  // name
  name: "mem-ds-item",

  // components
  components: {
    itemContainer,
    dsDisplay,
    dsCalc,
    memStarter,
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

    // mem setup
    const {
      sequenceToPlay,
      cssState,
      onClickPlay,
    } = setupShowSequenceAnimation(itemData);

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
      i18n,
      totalItems,
      itemData,
      cssState,
      sequenceToPlay,
      onClickPlay,
      onAddNumberToUserSequence,
      onResetUserSequence,
    };
  },
};
</script>
