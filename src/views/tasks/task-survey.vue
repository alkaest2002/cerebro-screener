<template>
  <div id="presenter-wrapper">
    <div id="title" class="mb-3">
      <h1 class="is-size-3 has-text-weight-bold">{{ i18n.title }}</h1>
    </div>
    <div id="presenter" class="box">
      <slot>
        <div class="block mt-3">
          {{ i18n.message }}
        </div>
      </slot>
      <div class="block mt-6">
        <p class="is-size-6 has-text-weight-bold" style="line-height: 1em">
          {{ i18n.questions[0].question }}
        </p>
        <small class="has-text-grey-light">
          {{ i18n.questions[0].likert }}
        </small>
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
          {{ i18n.questions[1].question }}
        </p>
        <small class="has-text-grey-light">
          {{ i18n.questions[0].likert }}
        </small>
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
          {{ i18n.questions[2].question }}
        </p>
        <small class="has-text-grey-light">
          {{ i18n.questions[2].likert }}
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
import { taskSurvey as i18n } from "@/i18n/it/views/tasks";
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
    // use store
    const store = useStore();

    // init surveyData
    const surveyData = reactive(clone(props.presenter.itemData));

    // get task key
    const taskKey = store.getters["battery/getCurrentTask"].key.toUpperCase();

    // handle change slider
    const onChangeLikert = () => {
      // cache likert
      const { q1, q2, q3 } = surveyData;
      // update surveyData
      const data = Object.assign({}, surveyData, {
        enableNext: [q1, q2, q3].every((e) => typeof e == "number"),
      });
      // persist survey data to vuex
      store.dispatch("presenters/updatePresenterByKey", {
        key: "itemData",
        value: data,
      });
    };

    // return setup object
    return {
      i18n,
      taskKey,
      surveyData,
      onChangeLikert,
    };
  },
};
</script>
