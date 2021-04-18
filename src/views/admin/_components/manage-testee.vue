<template>
  <p class="is-size-5 has-text-weight-bold mb-0 mt-2">Dati anagrafici</p>
  <div id="testee">
    <span v-for="(value, key) in currentTestee" :key="key">
      <b class="has-text-grey">
        {{ key }}
      </b>
      {{ value }}
    </span>
  </div>
  <div>
    <router-link :to="{ name: 'route-battery-bio' }" replace>
      &rarr; anagrafica
    </router-link>
    <br />
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  // name
  name: "manage-testee",

  setup() {
    // get store & router
    const store = useStore();

    // get current testee (no need to be reactive)
    const currentTestee = store.state.testee.testee;

    // return setup object
    return {
      currentTestee,
    };
  },
};
</script>

<style lang="scss" scoped>
#testee {
  padding: 10px 2px;
  border-top: 1px solid #ddd;

  & span {
    display: inline-block;
    margin-right: 15px;
  }
}
</style>
