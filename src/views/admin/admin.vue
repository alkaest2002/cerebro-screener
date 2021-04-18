<template>
  <base-layout>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
  </base-layout>
</template>

<script>
export default {
  // name
  name: "admin",
};
</script>
