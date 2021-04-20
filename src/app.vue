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
import { useRouter } from "vue-router";

export default {
  // name
  name: "app",

  // setup
  setup() {
    // get store and router
    const store = useStore();
    const router = useRouter();

    // on mounted app
    onMounted(() => {
      // disable backbutton
      history.pushState(null, null, location.href);
      window.addEventListener("popstate", () => {
        history.go(1);
      });
      // add keystroke event listener
      window.addEventListener("keydown", (event) => {
        // if pressed key is F2
        if (event.key == "F2")
          // go to main
          router.replace({ name: "route-main-home" });
        // if pressed key is F4
        if (event.key == "F4")
          // go to login
          router.replace({ name: "route-admin-login" });
        // if pressed key is F4
        if (event.key == "Enter") {
          // if page cointains an element with the id "enter-click"
          const $el = document.getElementById("enter-click");
          // simulate click
          if ($el) $el.click();
        }
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

html, body {
    background-color: $global-bacground-color !important;
}

::-webkit-scrollbar { 
  width: 0px; 
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
