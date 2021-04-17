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
          Numero di protocolli in archivio:
          <span class="has-text-weight-bold">{{ indexDbCount }}</span>
        </p>
      </div>
      <div id="download-to-local" class="block">
        <p class="is-size-5 has-text-weight-bold mt-5 mb-3">
          Scarica dati in locale
        </p>
        <p>
          Per scaricare i dati in locale non hai bisogno di alcuna connessione a
          internet. Una volta scaricati i dati, dovrai inviare il file al
          seguente indirizzo di posta elettronica
          <em>{{ $store.state.main.email }}</em
          >.
        </p>
        <div class="mt-5 mb-0">
          <div>
            <loading-button
              :is-loading="localOp.status == 'running'"
              :disabled="localOp.status == 'running' || indexDbCount == 0"
              @click="onClickDownload"
              class="is-link"
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
      <div id="upload-to-server" class="mt-5">
        <p class="is-size-5 has-text-weight-bold mt-2 mb-3">
          Carica dati sul server
        </p>
        <p>
          Per caricare i dati sul sever, il computer deve disporre di una
          connessione a internet che renda possibile l'accesso a
          <em>{{ $store.state.main.firebaseEndpoint }}</em
          >.<br />
          Una volta avviato l'upload, ti chiediamo di attenderne il
          completamento senza interagire con il software.
        </p>
        <div class="mt-5 mb-0">
          <loading-button
            :is-loading="serverOp.status == 'running'"
            :disabled="serverOp.status == 'running' || indexDbCount == 0"
            @click="onClickUpload"
            class="is-link"
          >
            carica dati sul server
          </loading-button>
        </div>
        <div class="mt-3 has-text-grey">
          <span v-if="isOnline">
            <small v-if="serverOp.status != null">
              {{ serverOp.message }}
            </small>
            <small v-else> upload dei dati non effettuato </small>
          </span>
          <span v-else>
            <small>connessione internet assente</small>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import saveToServer from "@/views/_composables/saveToServer";
import saveToLocal from "@/views/_composables/saveToLocal";
import manageIndexDb from "@/views/_composables/manageIndexDb";

export default {
  // name
  name: "admin-battery-save",

  // setup
  setup() {
    // get store
    const store = useStore();

    // from composables
    const { indexDbExecute } = manageIndexDb();
    const { localOp, onDownload: onClickDownload } = saveToLocal(
      indexDbExecute
    );
    const { isOnline, serverOp, onUpload: onClickUpload } = saveToServer(
      indexDbExecute
    );

    // index db count
    const indexDbCount = computed(() => store.state.answers.indexDbCount);

    // return setup object
    return {
      isOnline,
      serverOp,
      localOp,
      indexDbCount,
      onClickUpload,
      onClickDownload,
    };
  },
};
</script>

<style lang="scss" scoped>
#stats,
#download-to-local,
#upload-to-server {
  & > p:first-child {
    border-bottom: 1px solid #ddd;
  }
}
</style>
