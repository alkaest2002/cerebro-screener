<template>
  <div
    :class="dotsCssClass"
    :style="{
      'background-color': highlight && !isLocked ? 'gold' : 'transparent',
    }"
    :draggable="isDraggable"
    class="half"
    @dragover.prevent="highlightFace(true)"
    @dragleave.prevent="highlightFace(false)"
    @drop="highlightFace(false)"
  >
    <div
      v-if="dots == -1"
      :style="{ 'background-color': highlight && !isLocked ? 'gold' : '#ddd' }"
      class="question"
    />
    <span>&#11044;</span>
    <span>&#11044;</span>
    <span>&#11044;</span>
    <span>&#11044;</span>
    <span>&#11044;</span>
    <span>&#11044;</span>
    <span>&#11044;</span>
    <span>&#11044;</span>
    <span>&#11044;</span>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  // name
  name: "dom-tile-face",

  //props
  props: {
    dots: {
      type: Number,
      default: -1,
    },

    isDraggable: {
      type: Boolean,
      default: false,
    },

    isLocked: {
      type: Boolean,
      required: true,
    },
  },

  // setup
  setup(props) {
    // highlight
    const highlight = ref(false);
    
    // convert number to class
    const dotsCssClass = computed(() => {
      // build css
      const css = [
        "is-zero",
        "is-one",
        "is-two",
        "is-three",
        "is-four",
        "is-five",
        "is-six",
      ][props.dots];
      // add highlight if it's the case
      return highlight.value && !props.isLocked ? css + " highlight" : css;
    });
    
    // handle on drag over
    const highlightFace = (state) => {
      // update highligth
      highlight.value = state;
    };
    
    // return object
    return {
      dotsCssClass,
      highlight,
      highlightFace,
    };
  },
};
</script>

<style lang="scss" scoped>
$dot-color: #333;
$ghost-dot-color: transparent;
$question-background: #eee;

.highlight {
  > div {
    background-color: red;
  }

  > span {
    display: none;
  }
}

.half {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  height: 56px;
  width: 56px;
  padding: 5px;
  color: $ghost-dot-color;

  .question {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 56px;
    height: 56px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $question-background;

    &::after {
      content: "?";
      color: $dot-color;
      font-size: 2.2em;
    }
  }

  span {
    font-size: 0.6em;
  }

  &.is-zero {
    span {
      color: $ghost-dot-color;
    }
  }

  &.is-one {
    span {
      color: $ghost-dot-color;
      &:nth-child(5) {
        color: $dot-color;
      }
    }
  }

  &.is-two {
    span {
      color: $ghost-dot-color;
      &:first-child,
      &:last-child {
        color: $dot-color;
      }
    }
  }

  &.is-three {
    @extend .is-one;
    @extend .is-two;
  }

  &.is-four {
    span {
      color: $ghost-dot-color;
      &:nth-child(1),
      &:nth-child(3),
      &:nth-child(7),
      &:nth-child(9) {
        color: $dot-color;
      }
    }
  }

  &.is-five {
    @extend .is-one;
    @extend .is-four;
  }

  &.is-six {
    @extend .is-four;
    span:nth-child(2),
    span:nth-child(8) {
      color: $dot-color;
    }
  }
}
</style>
