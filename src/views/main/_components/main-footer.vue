<template>
  <div class="has-text-centered mt-1">
    <div id="footer" class="has-text-grey-light">
      <small>
        <router-link
          :to="{ name: 'route-main-about' }"
          class="has-text-grey-light is-block"
        >
          {{ i18n.commitee }}
        </router-link>
        <span>{{ i18n.freepik }}</span>
      </small>
    </div>
  </div>
</template>

<script>
import { mainFooter as i18n } from "@/i18n/it/views/main";

export default {
  // name
  name: "main-footer",

  // setup
  setup() {
    // return setup object
    return {
      i18n,
    };
  },
};
</script>

<style lang="scss" scoped>
#footer {
  line-height: 1.25em;

  a {
    text-decoration: underline;
  }
}
</style>
