<template>
  <h2 class="is-size-5 has-text-weight-bold mb-0">
    {{ i18n.testee }}
  </h2>
  <div id="testee" class="columns is-multiline is-gapless mb-0">
    <div
      v-for="(value, key) in currentTestee"
      :key="key"
      class="column is-one-third"
    >
      <b class="has-text-grey">
        {{ i18n.data[key] }}
      </b>
      {{ value }}
    </div>
  </div>
  <div class="links">
    <router-link :to="{ name: 'route-battery-bio' }" class="is-block" replace>
      {{ i18n.links.bio }}
    </router-link>
  </div>
</template>

<script>
import { manageTestee as i18n } from "@/i18n/it/views/admin";
import { useStore } from "vuex";

export default {
  // name
  name: "manage-testee",

  // setup
  setup() {
    // use store
    const store = useStore();

    // define currentTestee (no need to be reactive)
    const currentTestee = store.state.testee.testee;

    // return setup object
    return {
      i18n,
      currentTestee,
    };
  },
};
</script>
