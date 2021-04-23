<template>
  <div id="presenter-wrapper">
    <div id="title" class="mb-3">
      <h1 class="is-size-3 has-text-weight-bold">
        {{ i18n.batteryManage.title }}
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
        {{ i18n.batteryManage.buttons.reset }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { admin as i18n } from "@/lang/it/views/admin";
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
