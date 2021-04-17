import { clone } from "@/utils/utilityFns";

const initState = {
  testee: {
    id: null,
    age: null,
    gender: -1,
    edu: -1,
  },
  genderOptions: [
    { label: "maschio", value: "maschio" },
    { label: "femmina", value: "femmina" },
  ],
  eduOptions: [
    { label: "scuola obbligo", value: "scuola obbligo" },
    { label: "diploma", value: "diploma" },
    { label: "laurea breve", value: "laurea breve" },
    { label: "laurea magistrale", value: "laurea magistrale" },
    { label: "post laurea", value: "post laurea" },
  ],
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
