<template>
  <div id="presenter-wrapper">
    <div id="title" class="mb-3">
      <h1 class="is-size-3 has-text-weight-bold">
        <slot name="title">
          {{ i18n.tasks.task }} {{ presenter.itemIndex + 1 }}/{{ totalItems }}
        </slot>
      </h1>
    </div>
    <div id="presenter" class="box">
      <item-container>
        <att-grid
          :numbers="itemData.numbers"
          @update-numbers="onUpdateNumbers"
        />
        <slot name="explanation" :item-data="itemData" />
      </item-container>
    </div>
  </div>
</template>

<script>
import { tasks as i18n } from "@/i18n/it/views/tasks";
import initItem from "@/views/tasks/_composables/initItem";
import itemContainer from "@/views/tasks/_components/item-container";
import attGrid from "./_components/att-grid";

export default {
  // name
  name: "att-item",

  // components
  components: {
    itemContainer,
    attGrid,
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

    // handle on updateNumbers
    const onUpdateNumbers = ({ numbers, errors }) => {
      itemData.numbers = numbers;
      itemData.errors += errors;
      itemData.isCorrect = numbers.filter((e) => e).length == 0;
    };

    // return setup object
    return {
      i18n,
      totalItems,
      itemData,
      onUpdateNumbers,
    };
  },
};
</script>
