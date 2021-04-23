<template>
  <div id="presenter-wrapper">
    <div id="presenter" class="box">
      <div
        class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
        style="height: 100%"
      >
        <img
          src="@/assets/images/fireworks.svg"
          alt="trophy"
          style="height: 150px"
        />
        <p class="is-size-2 has-text-weight-bold has-text-centerd mt-3">
          {{ i18n.end.title }}
        </p>
        <div class="has-text-centered">
          <p>
            <span>{{ i18n.end.messageOne }}</span>
            <br />
            <span>{{ i18n.end.messageTwo }}</span>
          </p>
          <div>
            <loading-button
              :is-loading="localOp.status == 'running'"
              :disabled="disableArchive"
              class="is-link mt-5"
              @click="onClickArchive"
            >
              {{ i18n.end.butttons.save }}
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
                {{ i18n.end.waitingStatus }}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { battery as i18n } from "@/lang/it/views/battery";
import { computed, watch } from "vue";
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
    const { localOp, onArchive } = saveToLocal(indexDbExecute);

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
          // increment indexDb count
          store.dispatch("answers/setIndexDbCount", { type: "increment" });
          // go to main (after a bit)
          setTimeout(
            () => router.replace({ name: "route-admin-reset-battery" }),
            1500
          );
        }
      },
      { deep: true }
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
      disableArchive,
      onClickArchive,
    };
  },
};
</script>
