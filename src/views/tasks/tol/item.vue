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
        <div class="is-flex is-justify-content-space-around">
          <div>
            <tol-tower :tower="itemData.endTower" :is-locked="true" />
            <div class="mt-3 ml-3 has-text-grey has-text-centered">
              <span class="has-text-weight-bold">Figura A</span>
            </div>
          </div>
          <div>
            <tol-tower
              :tower="tower"
              :is-locked="false"
              @disc-dropped="onDiscDropped"
            />
            <div class="mt-3 ml-3 has-text-grey has-text-centered">
              <span class="has-text-weight-bold">Figura B</span>
              <br />sposta i dischi per ottenere la figura A
            </div>
          </div>
        </div>
        <slot name="explanation" :item-data="itemData" />
      </item-container>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { clone } from "@/utils/utilityFns";
import initPresenter from "@/views/tasks/_composables/initPresenter";
import ItemContainer from "../_components/item-container.vue";
import tolTower from "./_components/tol-tower";

export default {
  // name
  name: "task-tol-item",

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
    const { totalItems, itemData } = initPresenter(props.presenter.itemData);

    // computed prop
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
      totalItems,
      itemData,
      tower,
      onDiscDropped,
    };
  },
};
</script>
