import { clone } from "@/utils/utilityFns";

const initState = {
  answers: {},
  indexDbCount: null,
  saveOp: {
    local: {
      isOk: null,
      status: null,
      message: null,
    },
    server: {
      isOk: null,
      status: null,
      message: null,
    },
  },
};

const getters = {
  getData(state, getters, rootState) {
    const data = {
      isoTime: new Date(Date.now()).toISOString(),
      testee: rootState.testee.testee,
      answers: state.answers,
    };
    return data;
  },
};

const mutations = {
  mutateTaskAnswers(state, { taskKey, answers }) {
    state.answers[taskKey] = answers;
  },

  mutateSaveOp(state, { key, data }) {
    state.saveOp[key] = data;
  },

  mutateIndexDbCount(state, { type, value }) {
    if (type == "set") state.indexDbCount = value;
    if (type == "reset") state.indexDbCount = 0;
    if (type == "increment") state.indexDbCount += 1;
  },

  // wipe
  mutateWipe(state) {
    // preserve indexDbCount
    Object.assign(state, clone(initState), {
      indexDbCount: state.indexDbCount,
    });
  },
};

const actions = {
  setTaskAnswers({ commit, rootGetters }, answers) {
    const taskKey = rootGetters["battery/getCurrentTask"].key;
    commit("mutateTaskAnswers", { taskKey, answers });
  },

  setSaveOp({ commit }, saveOp) {
    commit("mutateSaveOp", saveOp);
  },

  setIndexDbCount({ commit }, payload) {
    commit("mutateIndexDbCount", payload);
  },

  // wipe
  wipe({ commit }) {
    commit("mutateWipe");
  },
};

export const answers = {
  namespaced: true,
  state: clone(initState),
  getters,
  mutations,
  actions,
};
