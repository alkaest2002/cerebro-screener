<template>
  <base-layout>
    <main-hero />
    <div class="mt-5 columns is-tablet is-centered">
      <div class="column is-one-third">
        <button
          id="enter-click"
          class="button is-link is-fullwidth"
          type="button"
          @click="onEnterAsParticipant"
        >
          {{ i18n.buttons.enter }}
        </button>
      </div>
    </div>
  </base-layout>
</template>

<script>
import { home as i18n } from "@/i18n/it/views/main";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
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

    // use router
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
      i18n,
      onEnterAsParticipant,
    };
  },
};
</script>
