<template>
  <transition name="fade" mode="out-in">
    <iow-card
      :key="card.id"
      :is-locked="isLocked || card.id == -1"
      v-bind="{ ...card }"
    />
  </transition>
</template>

<script>
import { computed } from "vue";
import iowCard from "./iow-card";

export default {
  // name
  name: "task-iow-component-deck",

  // components
  components: {
    iowCard,
  },

  //props
  props: {
    cards: {
      type: Array,
      required: true,
      validator: (value) => Array.isArray(value),
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
  },

  // setup
  setup(props) {
    // computed
    const card = computed(() => {
      // get first non null card
      const card = props.cards.filter((e) => e)[0];
      // return card or void one
      return card ? card : { id: -1 };
    });
    // return setup object
    return {
      card,
    };
  },
};
</script>
