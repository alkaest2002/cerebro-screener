<template>
  <div id="presenter-wrapper">
    <div id="title" class="mb-3">
      <h1 class="is-size-3 has-text-weight-bold">
        <slot name="title">
          {{ i18n.tasks.task }} {{ presenter.itemIndex + 1 }}/{{ totalItems }}
        </slot>
      </h1>
    </div>
    <div id="presenter" class="is-relative is-clipped box">
      <item-container>
        <div
          class="is-flex is-align-content-space-around is-justify-content-center"
        >
          <dom-tile
            v-for="(tile, index) in itemData.tiles"
            :key="index"
            :tile="tile"
            :is-locked="true"
          />
          <dom-tile
            :tile="itemData.userTile"
            :is-locked="false"
            @dropped-dots="onDropDots"
          />
        </div>
        <dom-tile-faces @dragstart="onDragDots" />
        <slot name="explanation" :item-data="itemData" />
      </item-container>
    </div>
  </div>
</template>

<script>
import { tasks as i18n } from "@/i18n/it/views/tasks";
import { ref } from "vue";
import initItem from "@/views/tasks/_composables/initItem";
import itemContainer from "@/views/tasks/_components/item-container";
import domTile from "./_components/dom-tile";
import domTileFaces from "./_components/dom-tile-faces";

export default {
  // name
  name: "dom-item",

  // components
  components: {
    itemContainer,
    domTile,
    domTileFaces,
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

    // init ref
    const draggedDots = ref(null);

    // handle on drag dots
    const onDragDots = (dots) => {
      draggedDots.value = dots;
    };

    // handle on drop dots
    const onDropDots = (index) => {
      // update user tile
      itemData.userTile[index] = draggedDots.value;
      // increment user actions
      itemData.actions++;
      // check whether answer is correct
      itemData.isCorrect =
        JSON.stringify(itemData.userTile) ==
        JSON.stringify(itemData.targetTile);
    };

    // return
    return {
      i18n,
      totalItems,
      itemData,
      onDragDots,
      onDropDots,
    };
  },
};
</script>
