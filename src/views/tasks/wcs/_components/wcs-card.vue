<template>
  <div
    :class="{ [color]: true, [figure]: true, [number]: true }"
    class="card is-flex is-flex-direction-column is-justify-content-center"
  >
    <div
      class="
        card-row
        lower
        is-flex is-justify-content-center is-align-items-center
      "
    >
      <div class="card-figure" />
    </div>
    <div
      class="
        card-row
        upper
        is-flex is-justify-content-center is-align-items-center
      "
    >
      <div v-for="n in [1, 2, 3, 4]" :key="n" class="card-number">
        {{ n }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // name
  name: "wcs-card",

  // props
  props: {
    color: {
      type: String,
      required: true,
      validator: (value) => {
        return /gray|red|green|blue|yellow/.test(value);
      },
    },

    figure: {
      type: String,
      required: true,
      validator: (value) => {
        return /none|circle|diamond|star|cross/.test(value);
      },
    },

    number: {
      type: String,
      required: true,
      validator: (value) => {
        return /zero|one|two|three|four/.test(value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin card-color($color) {
  background-color: $color;
  color: #fff;
}

$card-background-color: #fff;
$deck-background-color: #eee;
$figure-size: 2.5em;
$number-size: 3em;

.card {
  height: 130px;
  width: 90px;
  margin: 0 10px;
  border-radius: 5px;
  background-color: $card-background-color;
  box-shadow: none;

  &.gray {
    background-color: #f0f0f0;
    border: 2px dotted #ddd;
  }

  &.red {
    @include card-color(#ed5565);
  }

  &.green {
    @include card-color(#48cfad);
  }

  &.blue {
    @include card-color(#5d95ec);
  }

  &.yellow {
    @include card-color(#ffce54);
  }

  .card-number {
    display: none;
    color: #fff;
    font-size: $number-size;
  }

  &.one {
    .upper {
      .card-number:nth-child(1) {
        display: block;
      }
    }
  }

  &.two {
    .upper {
      .card-number:nth-child(2) {
        display: block;
      }
    }
  }

  &.three {
    .upper {
      .card-number:nth-child(3) {
        display: block;
      }
    }
  }

  &.four {
    .upper {
      .card-number:nth-child(4) {
        display: block;
      }
    }
  }
}

.circle .card-figure::after {
  font-size: $figure-size;
  content: "\0025CF";
}

.star .card-figure {
  &::after {
    font-size: $figure-size;
    content: "\2605";
  }
}

.diamond .card-figure {
  &::after {
    font-size: $figure-size;
    content: "\2666";
  }
}

.cross .card-figure {
  &::after {
    font-size: $figure-size;
    content: "\271A";
  }
}
</style>
