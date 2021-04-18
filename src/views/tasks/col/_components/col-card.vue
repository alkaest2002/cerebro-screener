<template>
  <div class="col-card is-relative">
    <div
      :class="{ 'is-overlay': card.isCovered }"
      class="face is-covered is-fkex is-justify-content-center is-align-items-center"
    >
      <span class="is-size-3">?</span>
    </div>
    <div
      :class="{
        win: card.amount > 0,
        lose: card.amount < 0,
        'is-overlay': !card.isCovered,
      }"
      class="face"
    >
      {{ card.amount > 0 ? `+${card.amount}` : card.amount }}
    </div>
  </div>
</template>

<script>
export default {
  // name
  name: "col-card",
  
  // props
  props: {
    card: {
      type: Object,
      required: true,
      validator: (value) =>
        Object.keys(value).every((e) => ["isCovered", "amount"].includes(e)),
    },
  },
};
</script>

<style lang="scss" scoped>
$cover-color: #ddd;
$win-color: #32d296;
$lose-color: #f0506e;

.col-card {
  height: 80px;
  width: 60px;

  .face {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 1.3em;
    border-radius: 5px;

    &.is-covered {
      background-color: $cover-color;
      color: darken($cover-color, 30%);
      border: 3px solid darken($cover-color, 10%);
      cursor: pointer;
    }

    &.win {
      background-color: $win-color;
      color: lighten($win-color, 50%);
      border: 3px solid darken($win-color, 10%);
    }

    &.lose {
      background-color: $lose-color;
      color: lighten($lose-color, 50%);
      border: 3px solid darken($lose-color, 10%);
    }
  }
}
</style>
