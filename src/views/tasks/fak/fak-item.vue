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
          <div class="block">
            {{ presenter }}
          </div>
          <div class="block">
            <button
              class="button is-primary"
              type="button"
              @click="itemData.actions += 1"
            >
              {{ i18n.buttons.simulateAction }}
            </button>
          </div>
        </div>
        <slot name="explanation" :item-data="itemData" />
      </item-container>
    </div>
  </div>
</template>

<script>
import { fak as i18n } from "@/i18n/it/views/tasks";
import initItem from "@/views/tasks/_composables/initItem";
import itemContainer from "@/views/tasks/_components/item-container";

export default {
  // name
  name: "fak-item",

  // components
  components: {
    itemContainer,
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

    // return
    return {
      i18n,
      totalItems,
      itemData,
    };
  },
};
</script>
