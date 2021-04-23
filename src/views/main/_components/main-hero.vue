<template>
  <div class="has-text-centered">
    <img src="@/assets/images/logo.svg" style="height: 200px" />
    <div class="block">
      <h1 class="is-size-3 has-text-weight-bold">
        Cerebro Screener - {{ $store.state.main.version }}
      </h1>
      <slot>
        <p>{{ i18n.hero.title }}</p>
      </slot>
    </div>
  </div>
</template>

<script>
import { main as i18n } from "@/i18n/it/views/main";

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
