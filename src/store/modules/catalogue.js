export const tasks = [
  {
    id: 1,
    key: "dom",
    description: "Dominoes",
    type: "intelligenza (logica deduttiva)",
    items: 18,
    duration: 18 * 45,
    isAvailable: true,
  },
  {
    id: 2,
    key: "tol",
    description: "London Tower",
    type: "intelligenza (pianificazione)",
    items: 16,
    duration: 16 * 45,
    isAvailable: true,
  },
  {
    id: 3,
    key: "koh",
    description: "Kohs Patterns",
    type: "intelligenza (visuo-spaziale)",
    items: 10,
    duration: 10 * 60,
    isAvailable: true,
  },
  {
    id: 4,
    key: "wcs",
    description: "Cards Sorting",
    type: "intelligenza (flessibilità)",
    items: 60,
    duration: 10 * 60,
    isAvailable: true,
  },
  {
    id: 5,
    key: "col",
    description: "Cards Flipping",
    type: "propensione al rischio",
    items: 12,
    duration: 12 * 60,
    isAvailable: true,
  },
  {
    id: 6,
    key: "mem",
    description: "Memory",
    type: "memoria",
    items: 14,
    duration: 14 * 20,
    isAvailable: true,
  },
  {
    id: 7,
    key: "iow",
    description: "Decks Searching",
    type: "apprendimento",
    items: 100,
    duration: 100 * 10,
    isAvailable: true,
  },
  {
    id: 8,
    key: "att",
    description: "Numbers Tracking",
    type: "attenzione",
    items: 3,
    duration: 3 * 60,
    isAvailable: true,
  },
  {
    id: 9,
    key: "srv",
    description: "Questionario fine batteria",
    type: "insight",
    items: 3,
    duration: 60,
    isAvailable: true,
  },
  {
    id: 10,
    key: "fak",
    description: "Questionario fake",
    type: "task app",
    items: 9,
    duration: 25 * 60,
    isAvailable: true,
  },
];

const getters = {
  getAvailableTasks: (state) => {
    return state.tasks.filter((e) => e.isAvailable);
  },
};

export const catalogue = {
  namespaced: true,
  state: {
    tasks: [...tasks],
  },
  getters,
};
