<template>
  <div :class="cardClass" class="iow-card" @click="onClickCard">
    <div>{{ win }}</div>
    <div>{{ lose }}</div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  // name
  name: "iow-card",

  // props
  props: {
    win: {
      type: Number,
      default: 0,
    },

    lose: {
      type: Number,
      default: 0,
    },

    isLocked: {
      type: Boolean,
      default: false,
    },
  },

  // setup
  setup(props) {
    // should cover flag
    const shouldCover = ref(true);

    // card css class
    const cardClass = computed(() => {
      let css = "";
      if (props.win > 0) css = "win";
      if (props.lose < 0) css = "lose";
      if (props.win > 0 && props.lose < 0) css = "win-lose";
      if (shouldCover.value) css += " covered";
      return css;
    });

    // handle on click card
    const onClickCard = () => {
      // do nothing if card is locked
      if (props.isLocked) return;
      // uncover card
      shouldCover.value = false;
    };

    // return setup object
    return {
      cardClass,
      onClickCard,
    };
  },
};
</script>

<style lang="scss" scoped>
$winColor: #32d296;
$loseColor: #f0506e;
$coverColor: #ddd;
$cardHeight: 180px;
$cardWidth: 120px;
$cardBorderDimension: 4px;
$cardBorderRadius: 6px;
$cardFontSizeFull: $cardHeight/5;
$cardFontSizeHalf: $cardHeight/5;
$back-cover-card-pattern: repeating-linear-gradient(
  45deg,
  #e5e5e5,
  #e5e5e5 10px,
  #eee 10px,
  #eee 20px
);

.iow-card {
  float: left;
  margin: 0px 10px;
  position: relative;
  height: $cardHeight;
  width: $cardWidth;

  &.covered::after {
    position: absolute;
    content: "?";
    color: darken($coverColor, 40%);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    font-size: $cardFontSizeFull * 1.5;
    line-height: $cardHeight;
    background-color: $coverColor;
    border: $cardBorderDimension solid darken($coverColor, 10%);
    border-radius: $cardBorderRadius;
    background: $back-cover-card-pattern;
  }

  > div {
    width: $cardWidth;
    color: #fff;
    text-align: center;
  }

  &.win-lose {
    font-size: $cardFontSizeHalf;
    line-height: $cardHeight/2;

    > div:first-child {
      height: $cardHeight/2;
      width: $cardWidth;
      background-color: $winColor;
      border-top: $cardBorderDimension solid darken($winColor, 10%);
      border-left: $cardBorderDimension solid darken($winColor, 10%);
      border-right: $cardBorderDimension solid darken($winColor, 10%);
      border-top-right-radius: $cardBorderRadius;
      border-top-left-radius: $cardBorderRadius;
    }

    > div:last-child {
      height: $cardHeight/2;
      width: $cardWidth;
      background-color: $loseColor;
      border-bottom: $cardBorderDimension solid darken($loseColor, 10%);
      border-left: $cardBorderDimension solid darken($loseColor, 10%);
      border-right: $cardBorderDimension solid darken($loseColor, 10%);
      border-bottom-right-radius: $cardBorderRadius;
      border-bottom-left-radius: $cardBorderRadius;
    }
  }

  &.win {
    > div {
      font-size: $cardFontSizeFull;
      line-height: $cardHeight;
      background-color: $winColor;
      border: $cardBorderDimension solid darken($winColor, 10%);
      height: $cardHeight;
      line-height: $cardHeight;
      border-radius: $cardBorderRadius;
    }

    > div:last-child {
      display: none;
    }
  }

  &.lose {
    > div {
      font-size: $cardFontSizeFull;
      background-color: $loseColor;
      height: $cardHeight;
      line-height: $cardHeight;
      border: $cardBorderDimension solid darken($loseColor, 10%);
      border-radius: $cardBorderRadius;
    }

    > div:last-child {
      display: none;
    }
  }
}
</style>
