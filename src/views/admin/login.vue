<template>
  <div id="presenter-wrapper">
    <main-hero />
    <div class="mt-5 columns is-tablet is-centered">
      <div class="column is-one-third">
        <form class="form">
          <form-input
            v-model="password"
            :errors="errors.password"
            :auto-focus="true"
            :placeholder="i18n.fields.password.placeholder"
            type="password"
            @input="errors.password.clear()"
          />
          <div class="buttons">
            <loading-button
              v-model="isLoading"
              class="button is-link is-fullwidth"
              button-type="submit"
              @click.prevent="onClickLogin('route-admin-create-battery')"
            >
              <span v-html="i18n.buttons.battery" />
            </loading-button>
            <loading-button
              v-model="isLoading"
              class="button is-success is-fullwidth"
              button-type="submit"
              @click.prevent="onClickLogin('route-admin-save-data')"
            >
              <span v-html="i18n.buttons.data" />
            </loading-button>
          </div>
        </form>
      </div>
    </div>
    <main-footer />
  </div>
</template>

<script>
import { login as i18n } from "@/i18n/it/views/admin";
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { authenticate } from "@/services/authenticate";
import formInput from "@/views/_components/form/form-input";
import mainHero from "@/views/main/_components/main-hero";
import mainFooter from "@/views/main/_components/main-footer";

export default {
  name: "login",

  components: {
    formInput,
    mainHero,
    mainFooter,
  },

  setup() {
    // use store and router
    const store = useStore();
    const router = useRouter();

    // isLoading flag
    const isLoading = ref(false);

    // password
    const password = ref("");

    // password errors
    const errors = reactive({ password: new Map() });

    // get app version (no need to be reactive)
    const version = store.state.main.version;

    // handle on login
    const onClickLogin = async (routeName) => {
      // if password is void
      if (password.value == "") {
        // set isLoading to false
        isLoading.value = false;
        // do nothing
        return;
      }

      // try to authenticate
      try {
        // check credentials
        await authenticate({ userId: null, password: password.value });
        // go to specified route
        router.replace({ name: routeName });
      } catch (err) {
        // set password error value
        errors.password.set("mismatch", i18n.fields.password.errors.mismatch);
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
