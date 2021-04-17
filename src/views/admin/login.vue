<template>
  <div id="presenter-wrapper">
    <main-hero />
    <div class="mt-5 columns is-tablet is-centered">
      <div class="column is-one-third">
        <form class="form">
          <form-input
            v-model="password"
            :errors="errors.password"
            @input="errors.password.clear()"
            autoFocus
            type="password"
            placeholder="Inserisci password"
          />
          <div class="buttons">
            <button
              :class="{ 'is-loading': isLoading }"
              @click.prevent="onClickLogin('route-admin-create-battery')"
              class="button is-link is-fullwidth"
            >
              admin &middot; batteria
            </button>
            <button
              :class="{ 'is-loading': isLoading }"
              @click.prevent="onClickLogin('route-admin-save-battery')"
              class="button is-success is-fullwidth"
            >
              admin &middot; dati
            </button>
          </div>
        </form>
      </div>
    </div>
    <main-footer />
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { authenticate } from "@/services/authenticate";
import formInput from "@/_components/form/form-input";
import mainHero from "@/views/main/_components/main-hero";
import mainFooter from "@/views/main/_components/main-footer";

export default {
  name: "admin-login",

  components: {
    formInput,
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
      // try to authentucate
      try {
        // check password
        await authenticate({ userId: null, password: password.value });
        // go to admin dashboard
        router.replace({ name: routeName });
      } catch (err) {
        // set password error value
        errors.password.set("mismatch", "password non corretta");
      } finally {
        // set is loading to false
        isLoading.value = false;
      }
    };

    // return setup object
    return {
      password,
      errors,
      isLoading,
      version,
      onClickLogin,
    };
  },
};
</script>
