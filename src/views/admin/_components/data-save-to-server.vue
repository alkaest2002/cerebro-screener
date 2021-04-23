<template>
  <div id="upload-to-server">
    <p class="is-size-5 has-text-weight-bold mt-2 mb-3">
      {{ i18n.saveToServer.title }}
    </p>
    <p>
      <span>{{ i18n.saveToServer.messageOne }}: </span>
      <em> {{ firebaseEndpoint }} </em>.
      <br />
      <span>{{ i18n.saveToServer.messagetwo }}</span>
    </p>
    <div class="mt-5 mb-0">
      <loading-button
        :is-loading="serverOp.status == 'running'"
        :disabled="serverOp.status == 'running' || indexDbCount == 0"
        class="is-link"
        @click="onClickUpload"
      >
        {{ i18n.saveToServer.buttons.save }}
      </loading-button>
    </div>
    <div class="mt-3 has-text-grey">
      <span v-if="isOnline">
        <small v-if="serverOp.status != null">
          {{ serverOp.message }}
        </small>
        <small v-else>{{ i18n.saveToServer.status.notUploaded }}</small>
      </span>
      <span v-else>
        <small>{{ i18n.saveToServer.status.noConnection }}</small>
      </span>
    </div>
  </div>
</template>

<script>
import { admin as i18n } from "@/i18n/it/views/admin";
import { computed } from "vue";
import { useStore } from "vuex";
import manageIndexDb from "@/views/_composables/manageIndexDb";
import saveToServer from "@/views/_composables/saveToServer";

export default {
  // name
  name: "data-save-to-server",

  // setup
  setup() {
    // use store
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
    const firebaseEndpoint = store.state.main.firebaseEndpoint;

    // return setup object
    return {
      i18n,
      isOnline,
      serverOp,
      indexDbCount,
      firebaseEndpoint,
      onClickUpload,
    };
  },
};
</script>

<style lang="scss" scoped>
#upload-to-server {
  & > p:first-child {
    border-bottom: 1px solid #ddd;
  }
}
</style>
