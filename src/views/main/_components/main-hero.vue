<template>
  <div class="has-text-centered">
    <img src="@/assets/images/logo.svg" style="height: 200px" />
    <div class="block">
      <h1 class="is-size-3 has-text-weight-bold">Cerebro Screener</h1>
      <slot>
        <p>valutazione delle funzioni cognitive</p>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  // name
  name: "main-component-logo",
};
</script>
