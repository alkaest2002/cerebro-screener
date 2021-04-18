<template>
  <div class="has-text-centered mt-1">
    <div id="footer" class="has-text-grey-light">
      <small>
        vai al
        <router-link
          :to="{ name: 'route-main-about' }"
          class="has-text-grey-light"
        >
          comitato scientifico
        </router-link>
        <br />
        <span> svg icons by freepik from www.flaticon.com </span>
      </small>
    </div>
  </div>
</template>

<script>
export default {
  // name
  name: "main-component-footer",
};
</script>

<style lang="scss" scoped>
#footer {
  line-height: 1.25em;

  a {
    text-decoration: underline;
  }
}
</style>
