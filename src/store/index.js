import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

// import modules
import { main } from "./modules/main";
import { admin } from "./modules/admin";
import { catalogue } from "./modules/catalogue";
import { testee } from "./modules/testee";
import { battery } from "./modules/battery";
import { blocks } from "./modules/blocks";
import { presenters } from "./modules/presenters";
import { answers } from "./modules/answers";
import { timer } from "./modules/timer";

// create a new store instance.
export const store = createStore({
  modules: {
    main,
    admin,
    catalogue,
    testee,
    battery,
    blocks,
    presenters,
    answers,
    timer,
  },
  plugins: [createPersistedState({ storage: window.localStorage })],
});
