<template>
  <base-layout>
    <main-hero>
      <p class="is-size-5 has-text-weight-bold">{{ i18n.commitee }}</p>
    </main-hero>
    <div
      class="
        mt-5
        is-flex
        is-flex-direction-column
        is-justify-content-center
        is-align-items-center
      "
    >
      <div id="commitee" class="has-text-centered">
        <div class="is-flex is-flex-wrap-wrap is-justify-content-center">
          <span
            v-for="member in sortedCommitee"
            :key="member.id"
            class="member mr-3"
          >
            {{ member.title }} {{ member.name }} {{ member.surname }}
          </span>
        </div>
      </div>
      <div class="buttons mt-5">
        <router-link :to="{ name: 'route-main-home' }" class="button is-link">
          <span v-html="i18n.buttons.back" />
        </router-link>
      </div>
    </div>
  </base-layout>
</template>

<script>
import { about as i18n } from "@/i18n/it/views/main";
import mainHero from "./_components/main-hero";

export default {
  name: "about",

  components: {
    mainHero,
  },

  setup() {
    // commitee
    const commitee = [
      { id: 1, title: "Dr.", surname: "Calanna", name: "Pierpaolo" },
      { id: 2, title: "Dr.", surname: "Buonaiuto", name: "Gaetano" },
      { id: 4, title: "Dr.", surname: "Izzo", name: "Simeone" },
      { id: 5, title: "Dr.", surname: "Arduino", name: "Gualbero" },
    ];

    // sorting fn
    const sortingFns = {
      bySurname: (a, b) => (a.surname > b.surname ? 1 : -1),
      byId: (a, b) => a.id - b.id,
    };

    // sorted committed
    const sortedCommitee = commitee.sort(sortingFns["bySurname"]);

    // return setup object
    return {
      i18n,
      sortedCommitee,
    };
  },
};
</script>

<style lang="scss" scoped>
#commitee {
  width: 400px;
}
</style>
