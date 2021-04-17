<template>
  <base-layout>
    <main-hero />
    <div class="mt-5 columns is-tablet is-centered">
      <div class="column is-one-third">
        <button
          @click="onEnterAsParticipant"
          id="enter-click"
          class="button is-link is-fullwidth"
        >
          entra
        </button>
      </div>
    </div>
    <main-footer />
  </base-layout>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import mainHero from "./_components/main-hero";
import mainFooter from "./_components/main-footer";

export default {
  name: "main-home",

  components: {
    mainHero,
    mainFooter,
  },

  // setup
  setup() {
    // get store and router
    const store = useStore();
    const router = useRouter();

    // handle on enter as participant
    const onEnterAsParticipant = () => {
      // decide which route to go
      const name = store.state.testee.testee.id
        ? "route-battery-tasks"
        : "route-battery-bio";
      // go to route
      router.replace({ name });
    };

    // return setup object
    return {
      onEnterAsParticipant,
    };
  },
};
</script>
