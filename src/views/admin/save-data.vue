<template>
  <div id="presenter-wrapper">
    <div id="title" class="mb-3">
      <h1 class="is-size-3 has-text-weight-bold">
        {{ i18n.title }}
      </h1>
    </div>
    <div id="presenter" class="box">
      <div id="stats" class="mt-3">
        <p class="is-size-5 has-text-weight-bold mt-5 mb-3">
          {{ i18n.protocolsHeader }}
        </p>
        <p>
          <span>{{ i18n.protocolsQuantity }}: </span>
          <span class="has-text-weight-bold">{{ indexDbCount }}</span>
        </p>
      </div>
      <div class="mt-5">
        <save-data-to-local :index-db-count="indexDbCount" />
      </div>
      <div class="mt-5">
        <save-data-to-server :index-db-count="indexDbCount" />
      </div>
    </div>
  </div>
</template>

<script>
import { saveData as i18n } from "@/i18n/it/views/admin";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import indexDbExecuter from "@/views/_composables/indexDbExecuter";
import saveDataToLocal from "./_components/save-data-to-local";
import saveDataToServer from "./_components/save-data-to-server";

export default {
  // name
  name: "data-save",

  // components
  components: {
    saveDataToLocal,
    saveDataToServer,
  },

  // setup
  setup() {
    // use store
    const store = useStore();

    // index db count
    const indexDbCount = computed(() => store.state.answers.indexDbCount || 0);

    // handle on mounted
    onMounted(async () => {
      // count number of records in indexDb
      const { result: count } = await indexDbExecuter({
        action: "count",
      });
      // persist number of records in vuex
      store.dispatch("answers/setIndexDbCount", count);
    });

    // return setup object
    return {
      i18n,
      indexDbCount,
    };
  },
};
</script>

<style lang="scss" scoped>
#stats {
  & > p:first-child {
    border-bottom: 1px solid #ddd;
  }
}
</style>
