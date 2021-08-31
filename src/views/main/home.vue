<template>
  <base-layout>
    <main-hero />
    <div class="mt-5 columns is-tablet is-centered">
      <div class="column is-one-third">
        <router-link class="button is-link is-fullwidth" :to="to">
          {{ i18n.buttons.enter }}
        </router-link>
      </div>
    </div>
  </base-layout>
</template>

<script>
import { useStore } from "vuex";
import { home as i18n } from "@/i18n/it/views/main";
import mainHero from "./_components/main-hero";

export default {
  name: "home",

  components: {
    mainHero,
  },

  // setup
  setup() {
    // use store
    const store = useStore();

    // determine next route
    const to = store.state.testee.testee.id
      ? { name: "route-battery-tasks" }
      : { name: "route-battery-bio" };

    // return setup object
    return {
      i18n,
      to,
    };
  },
};
</script>
