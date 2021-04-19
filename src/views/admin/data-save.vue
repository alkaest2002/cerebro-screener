<template>
  <div id="presenter-wrapper">
    <div id="title" class="mb-3">
      <h1 class="is-size-3 has-text-weight-bold">Salva dati memorizzati</h1>
    </div>
    <div id="presenter" class="box">
      <div id="stats" class="mt-3">
        <p class="is-size-5 has-text-weight-bold mt-5 mb-3">
          Protocolli in archivio
        </p>
        <p>
          <span>Numero di protocolli in archivio:</span>
          <span class="has-text-weight-bold">{{ indexDbCount }}</span>
        </p>
      </div>
      <div class="mt-5">
        <data-save-to-local />
      </div>
      <div class="mt-5">
        <data-save-to-server />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import dataSaveToServer from "./_components/data-save-to-server";
import dataSaveToLocal from "./_components/data-save-to-local";
import DataSaveToServer from "./_components/data-save-to-server.vue";

export default {
  // name
  name: "data-save",

  // components
  components: {
    dataSaveToServer,
    dataSaveToLocal,
    DataSaveToServer,
  },

  // setup
  setup() {
    // get store
    const store = useStore();

    // index db count
    const indexDbCount = computed(() => store.state.answers.indexDbCount);

    // return setup object
    return {
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
