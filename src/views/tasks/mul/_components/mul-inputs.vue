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
            <mul-input v-model="userResponse[0]" />
            <mul-keyboard
              v-model="userResponse[0]"
              :text="userResponse[0]"
              type="numbers"
            />
          </div>
        </div>
      </div>
      <div class="mt-5">
        <div class="p-3">
          {{ i18n.whatIsCounterSum }}
          <div class="mt-3">
            <mul-input v-model="userResponse[1]" />
            <mul-keyboard
              v-model="userResponse[1]"
              :text="userResponse[1]"
              type="numbers"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mulInputs as i18n } from "@/i18n/it/views/tasks";
import { reactive, watchEffect } from "vue";
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


  // emitted events
  emits: {
    "user-response": (value) => Array.isArray(value),
  },

  // setup
  setup(props, { emit }) {
    // usert response data
    const userResponse = reactive([null, null]);

    // watch
    watchEffect(() => {
      emit(
        "user-response",
        userResponse.filter((e) => e).map((e) => parseInt(e))
      );
    });

    // return setup object
    return {
      i18n,
      userResponse,
    };
  },
};
</script>

<style lang="scss" scoped>
#mul-inputs {
  margin-top: 10px;
}
</style>
