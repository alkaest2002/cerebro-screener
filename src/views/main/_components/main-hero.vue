<template>
  <div class="has-text-centered">
    <img src="@/assets/images/am.svg" style="height: 320px" />
    <div class="block">
      <h1 class="is-size-3 has-text-weight-bold">
        {{ i18n.title }} - {{ $store.state.main.version }}
      </h1>
      <slot>
        <p>{{ i18n.subTitle }}</p>
      </slot>
    </div>
  </div>
</template>

<script>
import { mainHero as i18n } from "@/i18n/it/views/main";

export default {
  // name
  name: "main-logo",

  // setup
  setup() {
    // return setup object
    return {
      i18n,
    };
  },
};
</script>
