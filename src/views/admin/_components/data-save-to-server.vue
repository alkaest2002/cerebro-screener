<template>
  <div id="upload-to-server">
    <p class="is-size-5 has-text-weight-bold mt-2 mb-3">
      Carica dati sul server
    </p>
    <p>
      Per caricare i dati sul sever, il computer deve disporre di una
      connessione a internet che renda possibile l'accesso a
      <em> {{ firebaseEndpoint }} </em>.
      <br />
      Una volta avviato l'upload, ti chiediamo di attenderne il
      completamento senza interagire con il software.
    </p>
    <div class="mt-5 mb-0">
      <loading-button
        :is-loading="serverOp.status == 'running'"
        :disabled="serverOp.status == 'running' || indexDbCount == 0"
        class="is-link"
        @click="onClickUpload"
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
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import manageIndexDb from "@/views/_composables/manageIndexDb";
import saveToServer from "@/views/_composables/saveToServer";

export default {
  // name
  name: "data-save-to-server",

  // setup
  setup() {
    // get store
    const store = useStore();

    // from composables
    const { indexDbExecute } = manageIndexDb();
    
    // from composables
    const { isOnline, serverOp, onUpload: onClickUpload } = saveToServer(
      indexDbExecute
    );

    // index db count
    const indexDbCount = computed(() => store.state.answers.indexDbCount);

    // firebase endpoit (no need to be reactive)
    const firebaseEndpoint =  store.state.main.firebaseEndpoint;

    // return setup object
    return {
      isOnline,
      serverOp,
      indexDbCount,
      firebaseEndpoint,
      onClickUpload,
    };
  },
}
</script>

<style lang="scss" scoped>
#upload-to-server {
  & > p:first-child {
    border-bottom: 1px solid #ddd;
  }
}
</style>
