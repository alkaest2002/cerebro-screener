<template>
  <p class="is-size-5 has-text-weight-bold mb-0 mt-2">
    {{ i18n.manageTestee.testee }}
  </p>
  <div id="testee">
    <span v-for="(value, key) in currentTestee" :key="key">
      <b class="has-text-grey">
        {{ i18n.manageTestee.data[key] }}
      </b>
      {{ value }}
    </span>
  </div>
  <div>
    <router-link :to="{ name: 'route-battery-bio' }" replace>
      &rarr; {{ i18n.manageTestee.links.bio }}
    </router-link>
    <br />
  </div>
</template>

<script>
import { admin as i18n } from "@/lang/it/views/admin";
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
