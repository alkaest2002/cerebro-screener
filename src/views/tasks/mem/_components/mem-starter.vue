<template>
  <div id="starter" class="has-text-grey">
    <div v-show="cssState == 'idle'" v-bind="$attrs">
      clicca qui per avviare l'animazione
    </div>
    <div v-show="['started', 'playing'].includes(cssState)">
      animazione avviata
    </div>
    <div v-show="cssState == 'finished'">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  // name
  name: "task-mem-component-starter",

  // do not inherit attrs
  inheritAttrs: false,

  // props
  props: {
    cssState: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
#starter > div:first-child {
  cursor: pointer;
}
</style>
