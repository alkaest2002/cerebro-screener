<template>
  <fak-item>
    <template #title> Versione demo </template>
    <template #explanation>
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          rutrum, tellus sed scelerisque pharetra, dolor urna bibendum purus,
          sit amet pulvinar elit sem sed urna.
        </p>
      </div>
    </template>
  </fak-item>
</template>

<script>
import fakItem from "./fak-item";

export default {
  // name
  name: "fak-demo",

  // components
  components: {
    fakItem,
  },
};
</script>
