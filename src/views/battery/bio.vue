<template>
  <div id="presenter-wrapper">
    <div class="mb-3">
      <h1 class="is-size-3 has-text-weight-bold">Sezione anagrafica</h1>
    </div>
    <div id="presenter" class="box">
      <form-input
        v-model.trim="testee.id"
        :errors="errors.id"
        label="Codice identificativo"
        placeholder="Inserisci codice identificativo"
      />
      <bio-keyboard v-model="testee.id" :text="testee.id" type="full" />
      <form-input
        v-model="testee.age"
        :errors="errors.age"
        label="Età"
        type="number"
        placeholder="Inserisci età in cifre"
      />
      <bio-keyboard v-model="testee.age" :text="testee.age" type="numbers" />
      <form-radio-group
        v-model="testee.gender"
        :options="genderOptions"
        :errors="errors.gender"
        class="mt-4"
        label="Genere"
        name="gender"
      />
      <form-radio-group
        v-model="testee.edu"
        :options="eduOptions"
        :errors="errors.edu"
        class="mt-4"
        label="Titolo di studio"
        name="edu"
      />
    </div>
    <div id="navigation" class="buttons">
      <button class="button is-link" type="submit" @click="onClickSubmit">
        continua
      </button>
    </div>
  </div>
</template>

<script>
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
    // get store & router
    const store = useStore();
    const router = useRouter();

    // get data from store (no need to be reactive)
    const genderOptions = store.state.testee.genderOptions;
    const eduOptions = store.state.testee.eduOptions;

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
      // validate id
      errors.id.set(
        ...required(testee.id, null, "Codice identificativo obbligatorio")
      );
      // validate age
      errors.age.set(...required(testee.age, null, "Età obbligatoria"));
      errors.age.set(
        ...numRange(
          testee.age,
          12,
          100,
          "L'età deve essere compresa nell'intervallo 13-99"
        )
      );
      // validate gender
      errors.gender.set(...required(testee.gender, -1, "Genere obbligatorio"));
      // validate edu
      errors.edu.set(
        ...required(testee.edu, -1, "Titolo di studio obbligatorio")
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
