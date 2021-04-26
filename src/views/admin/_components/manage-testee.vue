<template>
  <h2 class="is-size-5 has-text-weight-bold mb-0">
    {{ i18n.testee }}
  </h2>
  <div id="testee" class="columns is-gapless mb-0">
    <div 
      v-for="(value, key) in currentTestee" 
      :key="key"
      class="column is-one-quarter"
    >
      <b class="has-text-grey">
        {{ i18n.data[key] }}
      </b>
      {{ value }}
    </div>
  </div>
  <router-link 
    :to="{ name: 'route-battery-bio' }" 
    class="is-block mt-2"
    replace
  >
    {{ i18n.links.bio }}
  </router-link>
</template>

<script>
import { manageTestee as i18n } from "@/i18n/it/views/admin";
import { useStore } from "vuex";

export default {
  // name
  name: "manage-testee",

  setup() {
    // use store
    const store = useStore();

    // get current testee (no need to be reactive)
    const currentTestee = store.state.testee.testee;

    // return setup object
    return {
      i18n,
      currentTestee,
    };
  },
};
</script>
