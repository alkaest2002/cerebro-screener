<template>
  <div id="download-to-local">
    <p class="is-size-5 has-text-weight-bold mt-5 mb-3">
      {{ i18n.title }}
    </p>
    <p>
      <span>{{ i18n.message }}: </span>
      <em> {{ emailTo }} </em>.
    </p>
    <div class="mt-5 mb-0">
      <div>
        <loading-button
          v-model="isLoading"
          :disabled="localOp.status == 'running' || indexDbCount == 0"
          class="is-link"
          @click="onClickDownload"
        >
          {{ i18n.buttons.save }}
        </loading-button>
      </div>
      <div class="mt-3 has-text-grey">
        <small v-if="localOp.isOk">
          {{ localOp.message }}
        </small>
        <small v-else>{{ i18n.status.notDownloaded }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import { saveDataToLocal as i18n } from "@/i18n/it/views/admin";
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import manageIndexDb from "@/views/_composables/manageIndexDb";
import saveToLocal from "@/views/_composables/saveToLocal";

export default {
  // name
  name: "data-save-to-local",

  // setup
  setup() {
    // use store
    const store = useStore();

    // emailTo (no need to be reactive)
    const emailTo = store.state.main.email;

    // from composables
    const { indexDbExecute } = manageIndexDb();

    // from composables
    const { localOp, onDownload: onClickDownload } = saveToLocal(
      indexDbExecute
    );

    // index db count
    const indexDbCount = computed(() => store.state.answers.indexDbCount);

    // isLoading
    const isLoading = ref(false);

    // watch
    watch(localOp, (value) => (isLoading.value = value.status == "running"), {
      deep: true,
    });

    // return setup object
    return {
      i18n,
      emailTo,
      localOp,
      indexDbCount,
      isLoading,
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
