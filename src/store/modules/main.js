export const main = {
  namespaced: true,
  state: {
    version: "ITA",
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
