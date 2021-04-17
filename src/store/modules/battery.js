import { clone } from "@/utils/utilityFns";

const initState = {
  battery: [],
  templateBattery: [],
  shouldShuffle: false,
  shuffleSchema: [],
  currentTaskIndex: null,
  hasEnded: false,
};

const getters = {
  getBatteryLength(state) {
    return state.battery.length;
  },

  getBatteryDuration(state) {
    return state.battery.reduce((acc, itr) => acc + itr.duration, 0);
  },

  getCurrentTask(state, getters) {
    if (state.currentTaskIndex === null) return state.battery[0];
    const task = state.battery.slice(
      state.currentTaskIndex,
      state.currentTaskIndex + 1
    )[0];
    return task || getters.getLastTask;
  },

  getLastTask(state) {
    return state.battery.slice(-1)[0];
  },

  getTemplateBattery(state, getters, rootState, rootGetters) {
    if (state.templateBattery.length > 0) return state.templateBattery;
    return rootGetters["catalogue/getAvailableTasks"];
  },
};

const mutations = {
  mutateBattery(state, tasks) {
    state.battery = tasks;
  },

  mutateCurrentTaskIndex(state, taskIndex) {
    state.currentTaskIndex = taskIndex;
  },

  mutateTemplateBattery(state, templateBattery) {
    state.templateBattery = templateBattery;
  },

  mutateShoudShuffle(state, shouldShuffle) {
    state.shouldShuffle = shouldShuffle;
  },

  mutateShuffleSchema(state, shuffleSchema) {
    state.shuffleSchema = shuffleSchema;
  },

  mutateHasEnded(state, hasEnded) {
    state.hasEnded = hasEnded;
  },

  mutateWipe(state) {
    // when wiping preserve template battery, shuffle schema and souldShuffle
    Object.assign(state, clone(initState), {
      templateBattery: state.templateBattery,
      shuffleSchema: state.shuffleSchema,
      shouldShuffle: state.shouldShuffle,
    });
  },
};

const actions = {
  setBattery({ commit }, tasks) {
    commit("mutateBattery", tasks);
  },

  setCurrentTaskIndex({ commit }, taskIndex) {
    commit("mutateCurrentTaskIndex", taskIndex);
  },

  setTemplateBattery({ commit }, templateBattery) {
    commit("mutateTemplateBattery", templateBattery);
  },

  setShouldShuffle({ commit }, shouldShuffle) {
    commit("mutateShoudShuffle", shouldShuffle);
  },

  setShuffleSchema({ commit }, shuffleSchema) {
    commit("mutateShuffleSchema", shuffleSchema);
  },

  setHasEnded({ commit }, hasEnded) {
    commit("mutateHasEnded", hasEnded);
  },

  wipe({ commit }) {
    commit("mutateWipe");
  },
};

export const battery = {
  namespaced: true,
  state: clone(initState),
  getters,
  mutations,
  actions,
};
