<template>
  <div 
    id="mul-counter" 
    class="is-flex is-justify-content-center is-align-items-center"
  >
    {{ counterValue }}
  </div>
</template>

<script>
export default {
  // name
  name: "mul-counter",

  // props
  props: {
    counterValue: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
$background-color: #ff0053;
#mul-counter {
  font-size: 3em;
  background-color: $background-color;
  border: 1px solid darken($background-color, 10%);
  color: lighten($background-color, 50%);
  border-radius: 6px;;
}
</style>