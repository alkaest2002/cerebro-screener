<template>
  <div id="presenter-wrapper">
    <div id="title" class="mb-3">
      <h1 class="is-size-3 has-text-weight-bold">Questionario</h1>
    </div>
    <div id="presenter" class="box">
      <slot>
        <div class="block mt-3">
          Rifletti con calma sulla prova appena conclusa e sugli stati d'animo
          che provi in questo momento. Ti chiediamo di rispondere alle seguenti
          tre domande.
        </div>
      </slot>
      <div class="block mt-6">
        <p class="is-size-6 has-text-weight-bold" style="line-height: 1em">
          Come valuti la tua prestazione?
        </p>
        <small class="has-text-grey-light">0 pessima, 10 eccellente</small>
        <div class="block mt-3">
          <item-likert
            v-model="surveyData.q1"
            :min-value="0"
            :max-value="10"
            @click="onChangeLikert"
          />
        </div>
      </div>
      <div class="block mt-6">
        <p class="is-size-6 has-text-weight-bold" style="line-height: 1em">
          In che misura ti senti soddisfatto della tua prestazione?
        </p>
        <small class="has-text-grey-light">0 per nulla, 10 completamente</small>
        <div class="block mt-3">
          <item-likert
            v-model="surveyData.q2"
            :min-value="0"
            :max-value="10"
            @click="onChangeLikert"
          />
        </div>
      </div>
      <div class="block mt-6">
        <p class="is-size-6 has-text-weight-bold" style="line-height: 1em">
          Come credi di essere andato rispetto agli altri?
        </p>
        <small class="has-text-grey-light">
          0 decisamente peggio, 10 decissamente meglio
        </small>
        <div class="block mt-3">
          <item-likert
            v-model="surveyData.q3"
            :min-value="0"
            :max-value="10"
            @click="onChangeLikert"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import { clone } from "@/utils/utilityFns";
import itemLikert from "./_components/item-likert";

export default {
  // name
  name: "task-survey",

  // components
  components: {
    itemLikert,
  },

  // props
  props: {
    presenter: {
      type: Object,
      required: true,
    },
  },

  // setup
  setup(props) {
    // get store
    const store = useStore();
    // init surveyData
    const surveyData = reactive(clone(props.presenter.itemData));
    // get task key
    const taskKey = store.getters["battery/getCurrentTask"].key.toUpperCase();
    // handle change slider
    const onChangeLikert = () => {
      // persist survey data to vuex
      store.dispatch("presenters/updatePresenterByKey", {
        key: "itemData",
        value: surveyData,
        canGoForth:
          Object.values(surveyData).filter((e) => e != null).length == 3,
      });
    };
    // return setup object
    return {
      taskKey,
      surveyData,
      onChangeLikert,
    };
  },
};
</script>
