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
          class="is-flex is-align-content-space-around is-justify-content-center"
        >
          <cb-grid
            :sequence-to-play="sequenceToPlay"
            :css-state="cssState"
            :user-sequence="itemData.userSequence"
            @click-number="onClickNumber"
          />
        </div>
        <div class="is-flex is-justify-content-center">
          <mem-starter
            :sequence-has-played="itemData.sequenceHasPlayed"
            @click="onClickPlay"
          >
            {{ i18n.clickCirclesOne }} {{ itemData.sequence.length }}
            {{ i18n.clickCirclesTwo }}
          </mem-starter>
        </div>
        <slot name="explanation" :item-data="itemData" />
      </item-container>
    </div>
  </div>
</template>

<script>
import { memCbItem as i18n } from "@/i18n/it/views/tasks";
import initItem from "@/views/tasks/_composables/initItem";
import ItemContainer from "../_components/item-container.vue";
import setupShowSequenceAnimation from "./_composables/setupSequenceAnimation";
import cbGrid from "./_components/mem-cb-grid";
import memStarter from "./_components/mem-starter";

export default {
  // name
  name: "mem-cb-item",

  // components
  components: {
    ItemContainer,
    cbGrid,
    memStarter
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
    const { sequenceToPlay, cssState, onClickPlay } = setupShowSequenceAnimation(itemData);

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
      i18n,
      totalItems,
      itemData,
      sequenceToPlay, 
      cssState, 
      onClickPlay,
      onClickNumber,
    };
  },
};
</script>
