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
#mul-counter {
  font-size: 3em;
  border: 1px solid #ddd;
  border-radius: 6px;;
}
</style>