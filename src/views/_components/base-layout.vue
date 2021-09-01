<template>
  <div id="main" class="container is-max-desktop">
    <div class="is-flex is-flex-direction-column is-justify-content-center p-5">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "base-layout",
};
</script>

<style lang="scss" scoped>
#main {
  height: 100vh;

  > div {
    height: 100%;
    width: 100%;
  }
}
</style>
