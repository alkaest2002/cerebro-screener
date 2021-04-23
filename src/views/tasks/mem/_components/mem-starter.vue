<template>
  <div id="starter" class="has-text-grey">
    <div v-show="cssState == 'idle'" v-bind="$attrs">
      {{ i18n.tasks.mem.startAnimation }}
    </div>
    <div v-show="['started', 'playing'].includes(cssState)">
       {{ i18n.tasks.mem.animationStarted }}
    </div>
    <div v-show="cssState == 'finished'">
      <slot />
    </div>
  </div>
</template>

<script>
import { tasks as i18n } from "@/i18n/it/views/tasks";

export default {
  // name
  name: "mem-starter",

  // do not inherit attrs
  inheritAttrs: false,

  // props
  props: {
    cssState: {
      type: String,
      required: true,
    },
  },

  // setup
  setup() {
    // return setup object
    return {
      i18n,
    }
  },
};
</script>

<style lang="scss" scoped>
#starter > div:first-child {
  cursor: pointer;
}
</style>
