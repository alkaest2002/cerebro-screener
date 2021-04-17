<template>
  <div class="has-text-centered mt-5">
    <div id="footer">
      <small class="has-text-grey">
        vai al
        <router-link
          :to="{ name: 'route-main-about' }"
          class="has-text-grey"
          style="text-decoration: underline"
        >
          comitato scientifico </router-link
        ><br />
        <span class="has-text-grey">
          svg icons by freepik from www.flaticon.com
        </span>
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
}
</style>
