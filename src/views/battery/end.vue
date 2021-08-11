<template>
  <div id="presenter-wrapper">
    <div id="presenter" class="box">
      <div
        class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
        style="height: 100%"
      >
        <img src="@/assets/images/fireworks.svg" style="height: 150px" />
        <p class="is-size-2 has-text-weight-bold has-text-centerd mt-3">
          {{ i18n.title }}
        </p>
        <div class="has-text-centered">
          <p v-html="i18n.message" />
          <div>
            <loading-button
              v-model="isLoading"
              :disabled="disableArchive"
              class="is-link mt-5"
              @click="onClickArchive"
            >
              {{ i18n.buttons.save }}
            </loading-button>
            <p class="mt-2">
              <small
                v-if="localOp.message"
                class="has-text-grey"
                style="text-transform: lowercase"
              >
                {{ localOp.message }}
              </small>
              <small v-else class="has-text-grey">
                {{ i18n.waitingStatus }}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { end as i18n } from "@/i18n/it/views/battery";
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { clone } from "@/utils/utilityFns";
import manageIndexDb from "@/views/_composables/manageIndexDb";
import saveToLocal from "@/views/_composables/saveToLocal";

export default {
  // name
  name: "end",

  // setup
  setup() {
    // use store
    const store = useStore();

    // use router
    const router = useRouter();

    // from composables
    const { indexDbExecute } = manageIndexDb();

    // from composables
    const { localOp, onArchive } = saveToLocal(indexDbExecute);

    console.log(localOp);
    // disable archive button
    const disableArchive = computed(() =>
      ["running", "finished"].includes(localOp.value.status)
    );

    // watch
    watch(
      () => {
        return {
          localStatus: localOp.value.status,
          localIsOk: localOp.value.isOk,
        };
      },
      (value) => {
        // on proper archival of battery data
        if (value.localStatus == "finished" && value.localIsOk) {
          // go to main (after a bit)
          setTimeout(
            () => router.replace({ name: "route-admin-reset-battery" }),
            1500
          );
        }
      },
      { deep: true }
    );

    // isLoading
    const isLoading = ref(false);

    // watch
    watch(
      () => localOp.status,
      (value) => (isLoading.value = value == "running")
    );

    // handle on click arhive
    const onClickArchive = () => {
      // archive battery data
      onArchive(clone(store.getters["answers/getData"]));
    };

    // return setup object
    return {
      i18n,
      localOp,
      isLoading,
      disableArchive,
      onClickArchive,
    };
  },
};
</script>
