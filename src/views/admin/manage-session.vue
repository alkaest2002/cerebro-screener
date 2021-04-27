<template>
  <div id="presenter-wrapper">
    <div id="title" class="mb-3">
      <h1 class="is-size-3 has-text-weight-bold">
        {{ i18n.title }}
      </h1>
    </div>
    <div id="presenter" class="box">
      <div class="mt-3">
        <manage-task />
      </div>
      <div class="mt-5">
        <manage-battery />
      </div>
      <div class="mt-5">
        <manage-testee />
      </div>
    </div>
    <div id="navigation" class="buttons">
      <router-link
        id="enter-click"
        :to="{ name: 'route-admin-reset-battery' }"
        replace
        class="button is-danger"
      >
        {{ i18n.buttons.reset }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { manageSession as i18n } from "@/i18n/it/views/admin";
import manageTask from "./_components/manage-task";
import manageTestee from "./_components/manage-testee";
import manageBattery from "./_components/manage-battery";

export default {
  // name
  name: "battery-manage",

  // components
  components: {
    manageTask,
    manageBattery,
    manageTestee,
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

<style lang="scss" scoped>
::v-deep h2 {
  padding-bottom: 5px;

  & + div {
    padding-top: 5px;
    background-color: #f0f0f0;
    padding: 10px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
}

::v-deep .links {
  margin-top: 10px;
}
</style>
