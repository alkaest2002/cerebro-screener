export const main = {
  namespaced: true,
  state: {
    version: "1.0",
    isOnline: null,
    firebaseEndpoint:
      "https://firestore.googleapis.com/$discovery/rest?version=v1",
    email: "cerebro-screener@protonmail.com",
  },
  mutations: {
    mutateIsOnline(state, isOnline) {
      state.isOnline = isOnline;
    },
  },
  actions: {
    setIsOnline({ commit }, isOnline) {
      commit("mutateIsOnline", isOnline);
    },
  },
};
