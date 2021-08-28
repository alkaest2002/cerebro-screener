<template>
  <base-layout>
    <main-hero />
    <div class="mt-5 columns is-tablet is-centered">
      <div class="column is-one-third">
        <router-link
          class="button is-link is-fullwidth"
          :to="{ name: 'route-admin-reset-battery', params: { next: 'route-battery-bio'}}"
        >
          {{ i18n.buttons.enter }}
        </router-link>
      </div>
    </div>
  </base-layout>
</template>

<script>
import { home as i18n } from "@/i18n/it/views/main";
import mainHero from "./_components/main-hero";

export default {
  name: "home",

  components: {
    mainHero,
  },

  // setup
  setup() {
    // return setup object
    return {
      i18n,
    };
  },
};
</script>
