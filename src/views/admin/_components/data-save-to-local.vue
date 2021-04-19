<template>
  <div id="download-to-local">
    <p class="is-size-5 has-text-weight-bold mt-5 mb-3">
      Scarica dati in locale
    </p>
    <p>
      Per scaricare i dati in locale non hai bisogno di alcuna connessione a
      internet. Una volta scaricati i dati, dovrai inviare il file al seguente
      indirizzo di posta elettronica
      <em> {{ emailTo }} </em>.
    </p>
    <div class="mt-5 mb-0">
      <div>
        <loading-button
          :is-loading="localOp.status == 'running'"
          :disabled="localOp.status == 'running' || indexDbCount == 0"
          class="is-link"
          @click="onClickDownload"
        >
          scarica dati in locale
        </loading-button>
      </div>
      <div class="mt-3 has-text-grey">
        <small v-if="localOp.isOk">
          {{ localOp.message }}
        </small>
        <small v-else> download dei dati non effettuato </small>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import manageIndexDb from "@/views/_composables/manageIndexDb";
import saveToLocal from "@/views/_composables/saveToLocal";

export default {
  // name
  name: "data-save-to-local",

  // setup
  setup() {
    // get store
    const store = useStore();

    // from composables
    const { indexDbExecute } = manageIndexDb();

    // emailTo (no need to be reactive)
    const emailTo = store.state.main.email;

    // from composables
    const { localOp, onDownload: onClickDownload } = saveToLocal(
      indexDbExecute
    );

    // index db count
    const indexDbCount = computed(() => store.state.answers.indexDbCount);

    // return setup object
    return {
      emailTo,
      localOp,
      indexDbCount,
      onClickDownload,
    };
  },
};
</script>

<style lang="scss" scoped>
#download-to-local {
  & > p:first-child {
    border-bottom: 1px solid #ddd;
  }
}
</style>
