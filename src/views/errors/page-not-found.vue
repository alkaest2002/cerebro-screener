<template>
  <base-layout>
    <div
      class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
    >
      <img
        src="@/assets/images/404-error.svg"
        alt="404 error"
        style="height: 256px"
      />
      <div class="has-text-centered block">
        <p class="is-size-2 has-text-weight-bold">Errore 404</p>
        <span>Oops! La pagina richiesta non è disponibile</span>
      </div>
      <div>
        Vai alla
        <router-link :to="{ name: 'route-main-home' }" replace
          >Homepage</router-link
        >
      </div>
    </div>
  </base-layout>
</template>

<script>
export default {
  // name
  name: "page-not-found",
};
</script>
