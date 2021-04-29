<template>
  <div id="starter">
    <div v-if="!sequenceHasPlayed">
      <div v-if="!sequenceIsPlaying">
        <a href="#" @click.prevent="onClick">{{ i18n.startAnimation }}</a>
      </div>
      <div v-else>
        <span class="has-text-grey">{{ i18n.animationStarted }}</span>
      </div>
    </div>
    <div v-else>
      <span class="has-text-grey">
        <slot />
      </span>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { memStarter as i18n } from "@/i18n/it/views/tasks";

export default {
  // name
  name: "mem-starter",

  // do not inherit attrs
  inheritAttrs: false,

  // props
  props: {
    sequenceHasPlayed: {
      type: Boolean,
      required: true,
    },
  },

  // setup
  setup(props, { attrs }) {
    // animation is running flag
    const sequenceIsPlaying = ref(false);

    const onClick = () => {
      // set sequence is playing flag
      sequenceIsPlaying.value = true;

      // call parent click method
      attrs.onClick();
    };

    // return setup object
    return {
      i18n,
      sequenceIsPlaying,
      onClick,
    };
  },
};
</script>
