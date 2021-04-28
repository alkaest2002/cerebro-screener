<template>
  <div
    id="mul-inputs"
    class="is-flex is-flex-wrap-wrap is-justify-content-center is-align-items-center"
  >
    <div class="is-flex is-flex-wrap-wrap is-flex-direction-column is-align-items-top">
      <div class="p-3">
        <div>
          {{ i18n.howManyGauges }}
        </div>
        <div class="buttons has-addons">
          <button 
            v-for="n of [0,1,2,3,4,5,6]" 
            :key="n"
            class="button" 
          >
            {{ n }}
          </button>
        </div>
      </div>
      <div>
        <div class="p-3">
        {{ i18n.whatIsCounterSum }}
        </div>
        <div class="buttons has-addons">
          <div>
            <button 
              v-for="n of [0,1,2,3,4,5,6,7,8,9]" 
              :key="n"
              class="button" 
            >
              {{ n }}
            </button>
          </div>
        </div>
        <div class="buttons has-addons">
          <div>
            <button 
              v-for="n of [0,1,2,3,4,5,6,7,8,9]" 
              :key="n"
              class="button" 
            >
              {{ n }}
            </button>
          </div>
        </div>
        <div class="buttons has-addons">
          <div>
            <button 
              v-for="n of [0,1,2,3,4,5,6,7,8,9]" 
              :key="n"
              class="button" 
            >
              {{ n }}
            </button>
          </div>
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
