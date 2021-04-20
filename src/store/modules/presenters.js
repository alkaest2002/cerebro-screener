import { clone } from "@/utils/utilityFns";
import makePresenters from "@/setup/tasks/_composables/makePresenters";

const initState = {
  presenters: [],
  currentPresenterIndex: null,
  currentPresenterSubIndex: null,
};

const getters = {
  // get current presenter
  getCurrentPresenter(state, getters) {
    if (state.currentPresenterIndex == null) return state.presenters[0];
    return getters.getPresenterAt(state.currentPresenterIndex);
  },

  getPresenterAt: (state) => (presenterIndex) => {
    presenterIndex = Math.max(
      0,
      Math.min(state.presenters.length - 1, presenterIndex)
    );
    return state.presenters[presenterIndex];
  },

  getSameBlockPreviousPresentersItemData(state, getters) {
    const currentPresenter = getters.getCurrentPresenter;
    const currentPresenterIndex = state.currentPresenterIndex || 0;
    return state.presenters
      .slice(0, currentPresenterIndex)
      .filter((e) => e.blockIndex == currentPresenter.blockIndex)
      .map((e) => e.itemData);
  },

  // get last presenter
  getLastPresenterIndex(state) {
    return state.presenters.length - 1;
  },

  // get presenters length
  getPresentersLength(state) {
    return state.presenters.length;
  },
};

const mutations = {
  mutatePresenters(state, presenters) {
    state.presenters = presenters;
  },

  mutateBlockPresenters(state, { startIndex, blockPresenters }) {
    state.presenters.splice(
      startIndex,
      blockPresenters.length,
      ...blockPresenters
    );
  },

  mutateCurrentPresenterIndex(state, presenterIndex) {
    state.currentPresenterIndex = presenterIndex;
  },

  mutateCurrentPresenterSubIndex(state, presenterSubIndex) {
    state.currentPresenterSubIndex = presenterSubIndex;
  },

  mutatePresenterEpoch(state, { type, itemId, epoch }) {
    if (!(itemId in state.presenters[state.currentPresenterIndex][type]))
      state.presenters[state.currentPresenterIndex][type][itemId] = [];
    state.presenters[state.currentPresenterIndex][type][itemId].push(epoch);
  },

  mutatePresenterByKey(state, { key, value, canGoForth }) {
    state.presenters[state.currentPresenterIndex][key] = value;
    // enable canGoForth if it's set
    if (canGoForth != undefined)
      state.presenters[state.currentPresenterIndex].canGoForth = canGoForth;
  },

  mutateWipe(state) {
    Object.assign(state, clone(initState));
  },
};

const actions = {
  setPresenters({ commit }, presenters) {
    commit("mutatePresenters", presenters);
  },

  setCurrentPresenterIndex({ commit, dispatch, getters }, presenterIndex) {
    // get props from "old" current presenter
    const { blockIndex: oldBlockIndex } = getters.getCurrentPresenter;
    // update timeOut on "old" current presenter
    dispatch("updatePresenterEpoch", { type: "timeOut" });
    // set "new" current presenterIndex
    commit("mutateCurrentPresenterIndex", presenterIndex);
    // get props from "new" current presenter
    const {
      blockIndex: newBlockIndex,
      isLocked: newPresenterIsLocked,
      timer: newTimer,
    } = getters.getCurrentPresenter;
    // reset current presenter sub index if it's the case
    if (oldBlockIndex < newBlockIndex)
      commit("mutateCurrentPresenterSubIndex", null);
    // update timeIn on "new" current presenter
    dispatch("updatePresenterEpoch", { type: "timeIn" });
    // update current blockIndex if it's different from "old" current blockIndex
    if (oldBlockIndex != newBlockIndex)
      dispatch("blocks/setCurrentBlockIndex", newBlockIndex, { root: true });
    // set item timer if item is not locked
    if (!newPresenterIsLocked)
      dispatch(
        "timer/setTimer",
        { id: presenterIndex, type: "item", status: "started", ...newTimer },
        { root: true }
      );
  },

  setCurrentPresenterSubIndex({ commit }, subIndex) {
    commit("mutateCurrentPresenterSubIndex", subIndex);
  },

  updatePresenterEpoch({ commit, state }, { type }) {
    // get current presenter
    const currentPresenter = state.presenters[state.currentPresenterIndex];
    // get current item id
    const itemId =
      state.currentPresenterSubIndex != null
        ? `${currentPresenter?.id}.${state.currentPresenterSubIndex}`
        : currentPresenter?.id;
    // do nothing under these conditions
    if (
      [
        itemId == undefined,
        state.currentPresenterIndex == null,
        currentPresenter?.isLocked,
        currentPresenter?.timeIn?.[itemId]?.length == 0 && type == "timeOut",
        currentPresenter?.timeIn?.[itemId]?.length ==
          currentPresenter?.timeOut?.[itemId]?.length && type == "timeOut",
        currentPresenter?.timeFirstReaction?.[itemId]?.length > 0 &&
          type == "timeFirstReaction",
      ].some((e) => e)
    )
      return;
    // update epoch
    commit("mutatePresenterEpoch", { type, itemId, epoch: Date.now() });
  },

  updatePresenterByKey({ commit, dispatch, state }, payload) {
    // do nothing under these conditions
    if (
      [
        state.currentPresenterIndex == null,
        state.presenters[state.currentPresenterIndex]?.isLocked,
      ].some((e) => e)
    )
      return;
    // if itemData is being changed
    if (payload.key == "itemData") {
      // update timeFirstReaction
      dispatch("updatePresenterEpoch", { type: "timeFirstReaction" });
    }
    // update presenter key with payload
    commit("mutatePresenterByKey", payload);
  },

  resetBlockPresenters({ commit, dispatch, state, rootState }) {
    // get fresh blocks
    const presenters = makePresenters(clone(rootState.blocks.blocks));
    // find instructions blocks for current items block, get last one
    const targetPresenter = presenters
      .slice(0, state.currentPresenterIndex)
      .reverse()
      .filter((e) => e.blockType == "instructions")[0];
    // find index of target presenter
    const targetPresenterIndex = presenters.findIndex(
      (e) =>
        e.blockType == "instructions" &&
        e.blockIndex == targetPresenter.blockIndex
    );
    // get presenters to be replaced
    const newPresenters = presenters.filter(
      (e) =>
        e.blockIndex >= targetPresenter.blockIndex &&
        e.blockIndex <= rootState.blocks.currentBlockIndex
    );
    // reset current block presenters
    commit("mutateBlockPresenters", {
      startIndex: targetPresenterIndex,
      blockPresenters: newPresenters,
    });
    // set current presenter index to index of target persenter
    commit("mutateCurrentPresenterIndex", targetPresenterIndex);
    // set curernt block index to block index of target presenter
    dispatch("blocks/setCurrentBlockIndex", targetPresenter.blockIndex, {
      root: true,
    });
    // reset timer
    dispatch("timer/wipe", null, { root: true });
  },

  wipe({ commit }) {
    commit("mutateWipe");
  },
};

export const presenters = {
  namespaced: true,
  state: clone(initState),
  getters,
  mutations,
  actions,
};
