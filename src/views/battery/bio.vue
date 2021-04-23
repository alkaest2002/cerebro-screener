<template>
  <div id="presenter-wrapper">
    <div class="mb-3">
      <h1 class="is-size-3 has-text-weight-bold">{{ i18n.bio.title }}</h1>
    </div>
    <div id="presenter" class="box">
      <form-input
        v-model.trim="testee.id"
        :errors="errors.id"
        :label="i18n.bio.fields.id.label"
        :placeholder="i18n.bio.fields.id.placeholder"
      />
      <bio-keyboard v-model="testee.id" :text="testee.id" type="full" />
      <form-input
        v-model="testee.age"
        :errors="errors.age"
        :label="i18n.bio.fields.age.label"
        :placeholder="i18n.bio.fields.age.placeholder"
        type="number"
      />
      <bio-keyboard v-model="testee.age" :text="testee.age" type="numbers" />
      <form-radio-group
        v-model="testee.gender"
        :options="genderOptions"
        :errors="errors.gender"
        :label="i18n.bio.fields.gender.label"
        class="mt-4"
        name="gender"
      />
      <form-radio-group
        v-model="testee.edu"
        :options="eduOptions"
        :errors="errors.edu"
        :label="i18n.bio.fields.edu.label"
        class="mt-4"
        name="edu"
      />
    </div>
    <div id="navigation" class="buttons">
      <button class="button is-link" type="submit" @click="onClickSubmit">
        {{ i18n.bio.buttons.continue }}
      </button>
    </div>
  </div>
</template>

<script>
import { battery as i18n } from "@/i18n/it/views/battery";
import { reactive, watch, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { required, numRange } from "@/utils/validators";
import { clone } from "@/utils/utilityFns";
import formInput from "@/views/_components/form/form-input";
import formRadioGroup from "@/views/_components/form/form-radio-group";
import bioKeyboard from "./_components/bio-keyboard";

export default {
  // name
  name: "bio",

  // components
  components: {
    formInput,
    formRadioGroup,
    bioKeyboard,
  },

  // setup
  setup() {
    // use store
    const store = useStore();

    // use router
    const router = useRouter();

    // gender options (no need to be reactive)
    const genderOptions = i18n.bio.fields.gender.options.reduce((acc, itr) => {
      acc.push({ label: itr, value: itr });
      return acc;
    }, []);

    // gender options (no need to be reactive)
    const eduOptions = i18n.bio.fields.edu.options.reduce((acc, itr) => {
      acc.push({ label: itr, value: itr });
      return acc;
    }, []);

    // init testee data
    const testee = reactive(clone(store.state.testee.testee));

    // init testee fields errors
    const errors = reactive({
      id: new Map(),
      gender: new Map(),
      age: new Map(),
      edu: new Map(),
    });

    // get testee toRefs
    const { id, gender, age, edu } = toRefs(testee);

    // watch testee toRefs
    watch(
      [id, gender, age, edu],
      (
        [idNew, genderNew, ageNew, eduNew],
        [idOld, genderOld, ageOld, eduOld]
      ) => {
        if (idNew != idOld) errors.id.clear();
        if (genderNew != genderOld) errors.gender.clear();
        if (ageNew != ageOld) errors.age.clear();
        if (eduNew != eduOld) errors.edu.clear();
      }
    );

    // handle submit click
    const onClickSubmit = () => {
      // validate id (required)
      errors.id.set(
        ...required(testee.id, null, i18n.bio.fields.id.errors.required)
      );
      // validate age (required)
      errors.age.set(
        ...required(testee.age, null, i18n.bio.fields.age.errors.required)
      );
      // validate age (num range)
      errors.age.set(
        ...numRange(testee.age, 12, 100, i18n.bio.fields.age.errors.range)
      );
      // validate gender (required)
      errors.gender.set(
        ...required(testee.gender, -1, i18n.bio.fields.gender.errors.required)
      );
      // validate edu (required)
      errors.edu.set(
        ...required(testee.edu, -1, i18n.bio.fields.edu.errors.required)
      );
      // if there are no validation errors
      if (
        Object.keys(errors).reduce(
          (acc, itr) =>
            acc + Array.from(errors[itr].values()).filter((e) => e).length,
          0
        ) == 0
      ) {
        // persist testee to vuex
        store.dispatch("testee/setTestee", testee);
        // go to battery tasks
        router.replace({ name: "route-battery-tasks" });
      }
    };

    // return setup object
    return {
      i18n,
      testee,
      genderOptions,
      eduOptions,
      errors,
      onClickSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
.field {
  margin-top: 15px;
}

.column.is-half:first-child {
  margin-right: 5px;
}
</style>
