import { clone } from "@/utils/utilityFns";

const initState = {
  id: null,
  type: null,
  status: null,
  timeLimit: 0,
  timeElapsed: 0,
  alertThreshold: 0,
};

const mutations = {
  mutateTimer(state, timer) {
    Object.assign(state, { ...timer });
  },

  mutateTick(state) {
    state.timeElapsed++;
  },

  mutateStatus(state, status) {
    state.status = status;
  },

  mutateWipe(state) {
    Object.assign(state, clone(initState));
  },
};

const actions = {
  setTimer({ commit, state }, timer) {
    // do nothing under these conditions
    if ([!timer.timeLimit, timer.id <= state.id].some((e) => e)) return;
    // set timer
    commit("mutateTimer", Object.assign(clone(initState), timer));
  },

  setStatus({ commit, dispatch }, status) {
    if (status == "stopped")
      // unlock next button
      dispatch(
        "presenters/updatePresenterByKey",
        { key: "canGoForth", value: true },
        { root: true }
      );
    // update timer
    commit("mutateStatus", status);
  },

  setTick({ commit }) {
    commit("mutateTick");
  },

  wipe({ commit }) {
    commit("mutateWipe");
  },
};

export const timer = {
  namespaced: true,
  state: clone(initState),
  mutations,
  actions,
};
