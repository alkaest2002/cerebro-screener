import { jsonCatalogue } from "@/lang/it/catalogue";

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
