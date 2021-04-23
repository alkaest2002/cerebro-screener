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
        <div class="is-flex is-justify-content-space-around">
          <div>
            <tol-tower :tower="itemData.endTower" :is-locked="true" />
            <div class="mt-3 ml-3 has-text-grey has-text-centered">
              <span class="has-text-weight-bold">
                {{ i18n.tasks.tol.figureA }}
              </span>
            </div>
          </div>
          <div>
            <tol-tower
              :tower="tower"
              :is-locked="false"
              @disc-dropped="onDiscDropped"
            />
            <div class="mt-3 ml-3 has-text-grey has-text-centered">
              <span class="has-text-weight-bold">
                {{ i18n.tasks.tol.figureB }}
              </span>
              <br />
              <span>
                {{ i18n.tasks.tol.figureHint }}
              </span>
            </div>
          </div>
        </div>
        <slot name="explanation" :item-data="itemData" />
      </item-container>
    </div>
  </div>
</template>

<script>
import { tasks as i18n } from "@/i18n/it/views/tasks";
import { computed } from "vue";
import { clone } from "@/utils/utilityFns";
import initItem from "@/views/tasks/_composables/initItem";
import ItemContainer from "../_components/item-container.vue";
import tolTower from "./_components/tol-tower";

export default {
  // name
  name: "tol-item",

  // components
  components: {
    ItemContainer,
    tolTower,
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

    // tower
    const tower = computed(() => {
      if (itemData.userTower.reduce((acc, itr) => (acc += itr.length), 0) > 0)
        return itemData.userTower;
      return itemData.startTower;
    });

    // handle dropped disc
    const onDiscDropped = ({ pegFrom, pegTo }) => {
      // clone start tower
      let clonedTower = clone(tower.value);
      // do nothing if destination peg is full
      if (clonedTower[pegTo].length == 3 - pegTo) return;
      // take off dragged disk from source peg
      const draggedDisc = clonedTower[pegFrom].splice(0, 1)[0];
      // add dragged disk to destination peg
      clonedTower[pegTo].splice(0, 0, draggedDisc);
      // update userTower to reflect new changes
      itemData.userTower = clonedTower;
      // increment actions
      itemData.actions++;
      // determin whether user tower is correct
      itemData.isCorrect =
        JSON.stringify(clonedTower) == JSON.stringify(itemData.endTower);
    };

    // return
    return {
      i18n,
      totalItems,
      itemData,
      tower,
      onDiscDropped,
    };
  },
};
</script>
