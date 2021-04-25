import { reactive, watch } from "vue";
import { useStore } from "vuex";

export default (data) => {
  // use store
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
      // update itemData
      store.dispatch("presenters/updatePresenterByKey", {
        key: "itemData",
        value,
      });
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
