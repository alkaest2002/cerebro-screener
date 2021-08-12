<template>
  <base-layout>
    <div
      class="
        is-flex
        is-flex-direction-column
        is-justify-content-center
        is-align-items-center
      "
    >
      <img src="@/assets/images/404-error.svg" style="height: 256px" />
      <div class="has-text-centered block">
        <p class="is-size-2 has-text-weight-bold">
          {{ i18n.title }}
        </p>
        <span>{{ i18n.message }}</span>
      </div>
      <div>
        <span>{{ i18n.link }}</span>
        &nbsp;
        <router-link :to="{ name: 'route-main-home' }" replace>
          {{ i18n.homepage }}
        </router-link>
      </div>
    </div>
  </base-layout>
</template>

<script>
import { pageNotFound as i18n } from "@/i18n/it/views/errors";

export default {
  // name
  name: "page-not-found",

  // setup
  setup() {
    // return setup object
    return {
      i18n,
    };
  },
};
</script>
