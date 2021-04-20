const jsonCatalogue = require("@/setup/catalogue/catalogue.json");

const getters = {
  getAvailableTasks: (state) => {
    return state.tasks.filter((e) => e.isAvailable);
  },
};

export const catalogue = {
  namespaced: true,
  state: {
    tasks: [...jsonCatalogue],
  },
  getters,
};
