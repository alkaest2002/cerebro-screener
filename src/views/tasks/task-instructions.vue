<template>
  <div id="presenter-wrapper">
    <div id="title" class="mb-3">
      <h1 class="is-size-3 has-text-weight-bold">
        {{ i18n.title }}
      </h1>
    </div>
    <div id="presenter" class="box">
      <table class="table is-fullwidth">
        <tr class="has-text-weight-bold">
          <td>{{ i18n.items }}</td>
          <td>{{ i18n.duration }}</td>
        </tr>
        <tr>
          <td>{{ block.items }}</td>
          <td>
            <span v-if="block.duration > 0">{{
              formatTime(block.duration)
            }}</span>
            <span v-else>{{ i18n.noTimeLimit }}</span>
          </td>
        </tr>
        <tr class="has-text-weight-bold">
          <td colspan="2">{{ i18n.description }}</td>
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
                  class="pt-3"
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
          <td colspan="2">{{ i18n.scoring }}</td>
        </tr>
        <tr>
          <td colspan="2">{{ block.scoring }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { taskInstructions as i18n } from "@/i18n/it/views/tasks";
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
    // use store
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
      i18n,
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
}
</style>
