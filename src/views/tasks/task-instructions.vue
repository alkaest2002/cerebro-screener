<template>
  <div id="presenter-wrapper">
    <div id="title" class="mb-3">
      <h1 class="is-size-3 has-text-weight-bold">Istruzioni</h1>
    </div>
    <div id="presenter" class="box">
      <table class="table is-fullwidth">
        <tr class="has-text-weight-bold">
          <td>Numero di quesiti</td>
          <td>Tempo a disposizione</td>
        </tr>
        <tr>
          <td>{{ block.items }}</td>
          <td>{{ formatTime(block.duration) }}</td>
        </tr>
        <tr class="has-text-weight-bold">
          <td colspan="2">Descrizione</td>
        </tr>
        <tr>
          <td colspan="2">
            <table id="description">
              <tr>
                <td
                  id="description-text"
                  class="pl-0"
                  :col-span="block.images.length > 0 ? 1 : 2"
                  v-html="block.description"
                />
                <td
                  v-if="block.images.length > 0"
                  id="description-images"
                  class="pr-0"
                >
                  <images-carousel
                    :images="block.images"
                    @click="onClickImages"
                  />
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr class="has-text-weight-bold">
          <td colspan="2">Calcolo del punteggio</td>
        </tr>
        <tr>
          <td colspan="2">{{ block.scoring }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { onMounted } from "vue";
import { formatTime, clone } from "@/utils/utilityFns";
import imagesCarousel from "@/views/tasks/_components/images-carousel";

export default {
  // name
  name: "task-instructions",

  // components
  components: {
    imagesCarousel,
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
    // get store
    const store = useStore();

    // handle on click images
    const onClickImages = () => {
      // clone itemData
      const clonedItemData = clone(props.presenter.itemData);
      // increment actions
      clonedItemData.actions++;
      // update item Data
      store.dispatch("presenters/updatePresenterByKey", {
        key: "itemData",
        value: clonedItemData,
        canGoForth: true,
      });
    };

    // reset any timer on mounting
    onMounted(() => store.dispatch("timer/wipe"));

    // return setup object
    return {
      block: props.presenter.itemData,
      onClickImages,
      formatTime,
    };
  },
};
</script>

<style lang="scss" scoped>
#description {
  height: 370px;

  td {
    border: none;
  }
  #description-text {
    width: 90%;

    &::v-deep p {
      margin-bottom: 0.5em;
    }
  }

  #description-images {
    background-color: #f9f9f9;
  }
}
</style>
