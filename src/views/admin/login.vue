<template>
  <div id="presenter-wrapper">
    <main-hero />
    <div class="mt-5 columns is-tablet is-centered">
      <div class="column is-one-third">
        <form class="form">
          <form-input
            v-model="password"
            :errors="errors.password"
            auto-focus
            type="password"
            :placeholder="i18n.login.fields.password.placeholder"
            @input="errors.password.clear()"
          />
          <div class="buttons">
            <loading-button
              :is-loading="isLoading"
              class="button is-link is-fullwidth"
              button-type="submit"
              @click.prevent="onClickLogin('route-admin-create-battery')"
            >
              <span v-html="i18n.login.buttons.battery" />
            </loading-button>
            <loading-button
              :is-loading="isLoading"
              class="button is-success is-fullwidth"
              button-type="submit"
              @click.prevent="onClickLogin('route-admin-save-battery')"
            >
              <span v-html="i18n.login.buttons.data" />
            </loading-button>
          </div>
        </form>
      </div>
    </div>
    <main-footer />
  </div>
</template>

<script>
import { admin as i18n } from "@/i18n/it/views/admin";
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { authenticate } from "@/services/authenticate";
import formInput from "@/views/_components/form/form-input";
import loadingButton from "@/views/_components/loading-button";
import mainHero from "@/views/main/_components/main-hero";
import mainFooter from "@/views/main/_components/main-footer";

export default {
  name: "login",

  components: {
    formInput,
    loadingButton,
    mainHero,
    mainFooter,
  },

  setup() {
    const router = useRouter();
    const store = useStore();

    // define refs and reactives
    const password = ref("");
    const isLoading = ref(false);
    const errors = reactive({ password: new Map() });

    // get app version (no need to be reactive)
    const version = store.state.main.version;

    // handle on login
    const onClickLogin = async (routeName) => {
      // do nothing if password is void
      if (password.value == "") return;
      // set is loading to true
      isLoading.value = true;
      // try to authenticate
      try {
        // check credentials
        await authenticate({ userId: null, password: password.value });
        // go to specified route
        router.replace({ name: routeName });
      } catch (err) {
        // set password error value
        errors.password.set(
          "mismatch",
          i18n.login.fields.password.errors.mismatch
        );
      } finally {
        // set is loading to false
        isLoading.value = false;
      }
    };

    // return setup object
    return {
      i18n,
      password,
      errors,
      isLoading,
      version,
      onClickLogin,
    };
  },
};
</script>
