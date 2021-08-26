<template>
  <base-layout>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
  </base-layout>
</template>

<script>
import { onMounted, onUpdated } from "vue";
import { useRouter, useRoute } from "vue-router";

// guard fn
const guardFn = (route, router) => {
  if (route.matched.length == 1)
    router.replace({ name: "route-admin-login" });
}

export default {
  // name
  name: "admin",

  // setup
  setup() {
    // get router
    const router = useRouter();

    // get current route
    const route = useRoute();

    // handle lifecycle events
    onMounted(() => guardFn(route, router));
    onUpdated(() => guardFn(route, router));
  }
};
</script>
