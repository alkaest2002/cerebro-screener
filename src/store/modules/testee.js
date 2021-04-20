import { clone } from "@/utils/utilityFns";

const initState = {
  testee: {
    id: null,
    age: null,
    gender: -1,
    edu: -1,
  },
};

const mutations = {
  mutateTestee(state, testee) {
    state.testee = testee;
    // ensure testee id
    state.testee.id =
      testee.id ||
      `${(Math.random().toString(36) + "00000000000000000").slice(
        2,
        5
      )}-${new Date().getTime()}`;
  },

  mutateWipe(state) {
    Object.assign(state, clone(initState));
  },
};

const actions = {
  setTestee({ commit }, testee) {
    commit("mutateTestee", testee);
  },

  wipe({ commit }) {
    commit("mutateWipe");
  },
};

export const testee = {
  namespaced: true,
  state: clone(initState),
  mutations,
  actions,
};
