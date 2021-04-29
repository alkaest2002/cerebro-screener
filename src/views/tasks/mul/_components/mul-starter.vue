<template>
  <a v-if="currentIndex == 0" href="#" @click.prevent="$attrs.onClick">
    {{ i18n.startAnimation }}
  </a>
  <span v-else class="has-text-grey">
    {{ i18n.animationStarted }}
  </span>
</template>

<script>
import { mulStarter as i18n } from "@/i18n/it/views/tasks";

export default {
  // name
  name: "mul-starter",

  // do not inherit attributes
  inheritAttrs: false,

  // props
  props: {
    currentIndex: {
      type: Number,
      required: true,
    },
  },

  // setup
  setup() {
    // return setup object
    return {
      i18n,
    };
  },
};
</script>
