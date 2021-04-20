<template>
  <div id="presenter-wrapper">
    <div id="title" class="mb-3">
      <h1 class="is-size-3 has-text-weight-bold">
        <slot name="title">
          Quesito {{ presenter.itemIndex + 1 }} di {{ totalItems }}
        </slot>
      </h1>
    </div>
    <div
      id="presenter"
      class="is-relative is-clipped box"
      @dragenter.prevent=""
      @dragover.prevent=""
      @drop="onTileDroppedOutsideFigure"
    >
      <item-container>
        <div id="outer-drop" class="is-flex is-flex-direction-column is-align-items-center">
          <div class="mb-5 has-text-grey has-text-centered is-size-7">
            <em>click sinistro mouse</em>
            &rarr; ruota tessera in senso orario<br />
            <em>click destro mouse</em>
            &rarr; ruota tessera in senso anti-orario<br />
            <em>trascina tessera a destra, fuori dal riquadro</em>
            &rarr; rimuovi tessera
          </div>
          <div class="is-flex is-justify-content-center mb-5">
            <div class="figure-wrapper mr-5">
              <div class="figure-container is-flex">
                <koh-figure
                  :is-locked="true"
                  :figure-type="itemData.endFigure.figureType"
                  :figure-tiles="itemData.endFigure.figureTiles"
                />
              </div>
              <p class="mt-3 has-text-grey has-text-centered">Riquadro A</p>
            </div>
            <div class="figure-wrapper ml-5">
              <div class="figure-container is-flex">
                <koh-figure
                  :is-locked="false"
                  :figure-type="itemData.userFigure.figureType"
                  :figure-tiles="itemData.userFigure.figureTiles"
                  @tile-dragged="onTileDragged"
                  @tile-dropped="onTileDropped"
                  @tile-rotated="onTileRotated"
                />
              </div>
              <p class="mt-3 has-text-grey has-text-centered">Riquadro B</p>
            </div>
          </div>
          <koh-reference-tiles
            :is-locked="userFigureIsCorrect"
            @tile-dragged="onTileDragged"
          />
        </div>
        <slot name="explanation" :item-data="itemData" />
      </item-container>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { clone } from "@/utils/utilityFns";
import initItem from "@/views/tasks/_composables/initItem";
import itemContainer from "@/views/tasks/_components/item-container";
import kohReferenceTiles from "./_components/koh-reference-tiles";
import kohFigure from "./_components/koh-figure";

export default {
  // name
  name: "koh-item",

  // components
  components: {
    itemContainer,
    kohReferenceTiles,
    kohFigure,
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

    // void tile (no need to be reactive)
    const voidTile = {
      tileIndex: null,
      tileType: "figure",
      tileColor: "void",
      tileRotation: "clock-0",
    };

    // dragged tile
    const draggedTile = ref(null);

    //function to stringify figure
    const stringifyFigure = (figure) => {
      // extract tileColor and tileRotataion from tiles in figure
      const data = figure.map((t) => {
        const { tileColor, tileRotation } = t;
        return { tileColor, tileRotation };
      });
      // return stringified version of it
      return JSON.stringify(data);
    };

    // determine whether userFigure is correct (equal to endFigure)
    const userFigureIsCorrect = computed(
      () =>
        stringifyFigure(itemData.userFigure.figureTiles) ==
        stringifyFigure(itemData.endFigure.figureTiles)
    );

    // function to update userFigure
    const updateUserFigure = (figure) => {
      // update user figure
      itemData.userFigure = figure;
      // increment actions
      itemData.actions++;
      // determine whether answer is correct
      itemData.isCorrect = userFigureIsCorrect.value;
    };

    // handle on drag event
    const onTileDragged = (tile) => {
      // store  dragged tile
      draggedTile.value = clone(tile);
    };

    // handle on drop event
    const onTileDropped = (tile) => {
      // clone user figure
      const clonedUserFigure = clone(itemData.userFigure);
      // do nothing if destination place is not void
      if (clonedUserFigure.figureTiles[tile.tileIndex].tileColor != "void") return;
      // update tile
      tile = Object.assign({}, draggedTile.value, {
        tileIndex: tile.tileIndex,
        tileType: "figure",
      });
      // put tile in new place of figure
      clonedUserFigure.figureTiles.splice(tile.tileIndex, 1, tile);
      // if dragged tile comes from figure, put a void tile where
      // the dragged tile once was
      if (draggedTile.value.tileType === "figure")
        clonedUserFigure.figureTiles.splice(
          draggedTile.value.tileIndex,
          1,
          Object.assign({}, voidTile, {
            tileIndex: draggedTile.value.tileIndex,
          })
        );
      // update user figure
      updateUserFigure(clonedUserFigure);
    };

    // handle on rotate tile
    const onTileRotated = ({ tileIndex, tileRotationValue }) => {
      // clone user figure
      const clonedUserFigure = clone(itemData.userFigure);
      // update cloned user figure with rotation
      clonedUserFigure.figureTiles[tileIndex].tileRotation = tileRotationValue;
      // update user figure
      updateUserFigure(clonedUserFigure);
    };

    // handle on drop tile outside figure
    const onTileDroppedOutsideFigure = ($event) => {
      // do nothing under these conditions
      if (![
        draggedTile.value.tileType == "figure",
        $event.target.getAttribute("id") == "outer-drop"
      ].every(e => e)) 
        return;
      // clone user figure
      const clonedUserFigure = clone(itemData.userFigure);
      // delete tile (actually replace it with a void one)
      clonedUserFigure.figureTiles.splice(
        draggedTile.value.tileIndex,
        1,
        Object.assign({}, voidTile, { tileIndex: draggedTile.value.tileIndex })
      );
      // update user figure
      updateUserFigure(clonedUserFigure);
    };

    // return
    return {
      itemData,
      totalItems,
      userFigureIsCorrect,
      onTileDragged,
      onTileDropped,
      onTileDroppedOutsideFigure,
      onTileRotated,
    };
  },
};
</script>

<style lang="scss" scoped>
.figure-wrapper {
  border: 3px solid #ddd;
  padding: 5px;
  border-radius: 6px;

  .figure-container {
    background-color: #f0f0f0;
  }
}
</style>
