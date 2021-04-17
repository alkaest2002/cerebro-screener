import { computed } from "vue";
import { useStore } from "vuex";

export default (getTaskData) => {
  // get store
  const store = useStore();
  const { blocks, presenters } = getTaskData();

  // if task setup data is already in vuex
  if (
    [
      store.getters["blocks/getBlocksLength"],
      store.getters["presenters/getPresentersLength"],
    ].every((e) => e)
  ) {
    // update currentPresenterIndex (for timestamp purposes)
    store.dispatch(
      "presenters/setCurrentPresenterIndex",
      store.state.presenters.currentPresenterIndex
    );
  } else {
    // persist to vuex task data
    store.dispatch("blocks/setBlocks", blocks);
    store.dispatch("blocks/setCurrentBlockIndex", 0);
    store.dispatch("presenters/setPresenters", presenters);
    store.dispatch("presenters/setCurrentPresenterIndex", 0);
  }

  // get current presenter
  const presenter = computed(
    () => store.getters["presenters/getCurrentPresenter"]
  );

  // return data
  return {
    presenter,
  };
};
