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
        <div class="is-flex is-flex-direction-column is-align-items-center">
          <koh-reference-tiles
            :is-locked="userFigureIsCorrect"
            @tile-dragged="onTileDragged"
          />
          <div class="mt-5 is-flex is-justify-content-center">
            <div class="figure-wrapper mr-5">
              <div class="figure-container is-flex">
                <koh-figure
                  :is-locked="true"
                  :figure-type="itemData.endFigure.figureType"
                  :figure-tiles="itemData.endFigure.figureTiles"
                />
              </div>
              <p class="mt-3 has-text-grey has-text-centered">Figura A</p>
            </div>
            <div class="figure-wrapper ml-5">
              <div class="figure-container is-flex">
                <koh-figure
                  :is-locked="userFigureIsCorrect"
                  :figure-type="itemData.userFigure.figureType"
                  :figure-tiles="itemData.userFigure.figureTiles"
                  @tile-dragged="onTileDragged"
                  @tile-dropped="onTileDropped"
                  @tile-rotated="onTileRotated"
                />
              </div>
              <p class="mt-3 has-text-grey has-text-centered">Figura B</p>
            </div>
          </div>
          <div class="mt-5 mb-3 has-text-grey has-text-centered is-size-7">
            <em>click sx</em>
            &rarr; ruota tessera in senso orario<br />
            <em>click dx</em>
            &rarr; ruota tessera in senso anti-orario<br />
            <em>trascina tessera fuori dalla figura</em>
            &rarr; rimuovi tessera
          </div>
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

    // void tile
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

    // determine whether user figure is correct
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

    // handle on drag tile
    const onTileDragged = (tile) => {
      // store  dragged tile
      draggedTile.value = clone(tile);
    };

    // handle on drop tile
    const onTileDropped = (tileIndex) => {
      // clone user figure
      const clonedUserFigure = clone(itemData.userFigure);
      // do nothing if destination place for dropped tile is not void
      if (clonedUserFigure.figureTiles[tileIndex].tileColor != "void") return;
      // update dropped tile
      const droppedTile = Object.assign({}, draggedTile.value, {
        tileIndex,
        tileType: "figure",
      });
      // put dropped tile in new place of figure
      clonedUserFigure.figureTiles.splice(tileIndex, 1, droppedTile);
      // if dropped tile comes from figure, put a void tile where
      // the dropped tile once was
      if (draggedTile.value.type === "figure")
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
    const onTileDroppedOutsideFigure = () => {
      // do nothing if tile type is reference
      if (draggedTile.value.tileType == "reference") return;
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
