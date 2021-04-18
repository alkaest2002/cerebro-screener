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
import item from "./item";

export default {
  // name
  name: "task-fak-demo",

  // components
  components: {
    fakItem: item,
  },
};
</script>
