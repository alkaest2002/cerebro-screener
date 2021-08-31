<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in" appear>
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default {
  // name
  name: "app",

  // setup
  setup() {
    // use store
    const store = useStore();

    // use router
    const router = useRouter();

    // use route
    const route = useRoute();

    // on mounted app
    onMounted(() => {
      // disable backbutton
      history.pushState(null, null, location.href);
      window.addEventListener("popstate", () => {
        history.go(1);
      });
      // add keystroke event listener
      window.addEventListener("keydown", ({ key, shiftKey }) => {
        // if key is F2
        if (
          [
            key == "F2" && !store.state.testee.testee.id,
            key == "F2" &&
              store.state.testee.testee.id &&
              route.name.indexOf("admin-save") > -1,
          ].some((e) => e)
        )
          // go to main
          router.replace({ name: "route-main-home" });
        // if key is F2 with SHIFT
        if (key == "F2" && shiftKey)
          // go to admin
          router.replace({ name: "route-admin-login" });
        // if key is Enter
        if (key == "Enter")
          // simulate click on element with id "enter-click" (if any)
          document.getElementById("enter-click")?.click();
      });
      // store current online status
      store.dispatch("main/setIsOnline", window.navigator.onLine);
      // add online/offline event listener
      window.addEventListener("online", () => {
        store.dispatch("main/setIsOnline", true);
      });
      window.addEventListener("offline", () => {
        store.dispatch("main/setIsOnline", false);
      });
    });
  },
};
</script>

<style lang="scss">
$global-bacground-color: #e2e1e1;
$global-border-radius: 6px;

html,
body {
  background-color: $global-bacground-color !important;
}

::-webkit-scrollbar {
  width: 0px;
}

a {
  color: #628fd7;
}

#app {
  user-select: none;
  -webkit-user-select: none;

  .button:focus,
  .button.is-focused {
    border-color: none;
  }

  button {
    -webkit-tap-highlight-color: transparent;
    &:focus,
    &:active,
    &.is-focused {
      outline: none !important;
      box-shadow: none !important;
    }
  }

  #presenter {
    height: 650px;
    position: relative;
    overflow: scroll;
  }

  #navigation {
    margin-top: 20px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transition: opacity 0, 0.5s;
}
</style>
