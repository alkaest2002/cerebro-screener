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
        <div
          class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
        >
          <div class="block">
            {{ presenter }}
          </div>
          <div class="block">
            <button class="button is-primary" @click="itemData.actions += 1">
              simula azione
            </button>
          </div>
        </div>
        <slot name="explanation" :item-data="itemData" />
      </item-container>
    </div>
  </div>
</template>

<script>
import initPresenter from "@/views/tasks/_composables/initPresenter";
import itemContainer from "@/views/tasks/_components/item-container";

export default {
  // name
  name: "task-fak-item",

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
    const { totalItems, itemData } = initPresenter(props.presenter.itemData);

    // return
    return {
      totalItems,
      itemData,
    };
  },
};
</script>
