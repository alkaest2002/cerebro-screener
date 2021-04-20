import { reactive, watch } from "vue";
import { useStore } from "vuex";

export default (data) => {
  // get store
  const store = useStore();

  // get items length
  const totalItems = store.getters["blocks/getCurrentBlockItemsLength"];

  // get previous itemData
  const previousItemsItemData =
    store.getters["presenters/getSameBlockPreviousPresentersItemData"];

  // make itemData reactive
  const itemData = reactive(data);

  // watch changes to data
  watch(
    () => itemData,
    (value) => {
      // determine canGoForth
      let canGoForth = typeof value.isCorrect == "boolean" 
        ? value.isCorrect 
        : value.canGoForth;
      if (!canGoForth && value.enableNext) canGoForth = true; 
      // update itemData
      store.dispatch("presenters/updatePresenterByKey", {
        key: "itemData", value, canGoForth }
      );
    },
    { deep: true }
  );

  // return setup object
  return {
    previousItemsItemData,
    itemData,
    totalItems,
  };
};
