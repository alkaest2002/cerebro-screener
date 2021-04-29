<template>
  <div
    id="mul-inputs"
    class="is-flex is-flex-wrap-wrap is-justify-content-center is-align-items-center"
  >
    <div
      class="is-flex is-flex-wrap-wrap is-flex-direction-column is-align-items-top"
    >
      <div class="p-3">
        <div>
          {{ i18n.howManyGauges }}
        </div>
      </div>
      <div>
        <div class="p-3">
          {{ i18n.whatIsCounterSum }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mulInputs as i18n } from "@/i18n/it/views/tasks";

export default {
  // name
  name: "mul-inputs",

  // do not inherit attrs
  inheritAttrs: false,

  // setup
  setup() {
    // return setup object
    return {
      i18n,
    };
  },
};
</script>

<style lang="scss" scoped>
#mul-inputs {
  margin-top: 10px;
}
</style>
