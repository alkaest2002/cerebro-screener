import { useStore } from "vuex";

export default ({ blocks, presenters }) => {
  // get store
  const store = useStore();

  // if task data is already in vuex
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
    // persist task data
    store.dispatch("blocks/setBlocks", blocks);
    store.dispatch("blocks/setCurrentBlockIndex", 0);
    store.dispatch("presenters/setPresenters", presenters);
    store.dispatch("presenters/setCurrentPresenterIndex", 0);
  }
};
