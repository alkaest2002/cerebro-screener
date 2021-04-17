import { clone } from "@/utils/utilityFns";

const initState = {
  blocks: [],
  currentBlockIndex: null,
};

const getters = {
  // get current block
  getCurrentBlock(state, getters) {
    if (state.currentBlockIndex === null) return state.blocks[0];
    const block = state.blocks.slice(
      state.currentBlockIndex,
      state.currentBlockIndex + 1
    )[0];
    return block || getters.getLastBlock;
  },

  // get current block items length
  getCurrentBlockItemsLength(state, getters) {
    return getters.getCurrentBlock.items.length;
  },

  // get last block
  getLastBlock(state) {
    return state.blocks.slice(-1)[0];
  },

  // get blocks length
  getBlocksLength(state) {
    return state.blocks.length;
  },
};

const mutations = {
  // mutate blocks
  mutateBlocks(state, blocks) {
    state.blocks = blocks;
  },

  // mutate current blockIndex
  mutateCurrentBlockIndex(state, blockIndex) {
    state.currentBlockIndex = blockIndex;
  },

  // mutate wipe out
  mutateWipe(state) {
    Object.assign(state, clone(initState));
  },
};

const actions = {
  // set blocks
  setBlocks({ commit }, blocks) {
    commit("mutateBlocks", blocks);
  },

  // set current blockIndex
  setCurrentBlockIndex({ commit, dispatch, getters, rootState }, blockIndex) {
    // set new currentBlockIndex
    commit("mutateCurrentBlockIndex", blockIndex);
    // get current block props
    const { id: blockId, timer: blockTimer } = getters.getCurrentBlock;
    // set current block timer under these conditions
    if (rootState.timer.id != blockId)
      dispatch(
        "timer/setTimer",
        {
          id: rootState.presenters.currentPresenterIndex || 0,
          type: "block",
          status: "started",
          ...blockTimer,
        },
        { root: true }
      );
  },

  // wipe out
  wipe({ commit }) {
    commit("mutateWipe");
  },
};

export const blocks = {
  namespaced: true,
  state: clone(initState),
  getters,
  mutations,
  actions,
};
