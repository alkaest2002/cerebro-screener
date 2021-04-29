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
          <div class="mt-3">
            <mul-input v-model="gaugesValue" />
            <mul-keyboard v-model="gaugesValue" :text="gaugesValue" type="numbers" />
          </div>
        </div>
      </div>
      <div class="mt-5">
        <div class="p-3">
          {{ i18n.whatIsCounterSum }}
          <div class="mt-3">
            <mul-input v-model="counterValue" />
            <mul-keyboard v-model="counterValue" :text="counterValue" type="numbers" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mulInputs as i18n } from "@/i18n/it/views/tasks";
import { ref } from "vue";
import mulInput from "@/views/_components/form/form-input";
import mulKeyboard from "@/views/_components/form/form-keyboard";

export default {
  // name
  name: "mul-inputs",

  // do not inherit attrs
  inheritAttrs: false,

  // components
  components: {
    mulInput,
    mulKeyboard,
  },

  // setup
  setup() {

    // gagues value
    const gaugesValue = ref(null);
    const counterValue = ref(null);

    // return setup object
    return {
      i18n,
      gaugesValue,
      counterValue
    };
  },
};
</script>

<style lang="scss" scoped>
#mul-inputs {
  margin-top: 10px;
}
</style>
