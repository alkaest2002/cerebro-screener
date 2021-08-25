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
              :disabled="!password.length"
              class="button is-link is-fullwidth"
              button-type="submit"
              @click.prevent="onClickLogin('route-admin-create-battery')"
            >
              <span v-html="i18n.buttons.battery" />
            </loading-button>
            <loading-button
              v-model="isLoading"
              :disabled="!password.length"
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
    // use router
    const router = useRouter();

    // isLoading flag
    const isLoading = ref(false);

    // password
    const password = ref("");

    // form inputs errors
    const errors = reactive({ password: new Map() });

    // handle on login
    const onClickLogin = async (routeName) => {
      // check credentials
      const credentialsCheck = await authenticate({ userId: null, password: password.value });
      // set is loading to false
      isLoading.value = false;
      // if credentials are ok
      if (credentialsCheck)
        // go to specified route
        return router.replace({ name: routeName });
      // otherwise set password error value
      errors.password.set("mismatch", i18n.fields.password.errors.mismatch);
    };

    // return setup object
    return {
      i18n,
      password,
      errors,
      isLoading,
      onClickLogin,
    };
  },
};
</script>
