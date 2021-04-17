<template>
  <base-layout>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in" appear>
        <template #default>
          <component :is="Component" @end-of-items="onEndOfItems" />
        </template>
      </transition>
    </router-view>
  </base-layout>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { clone } from "@/utils/utilityFns";

export default {
  // name
  name: "tasks-task",

  // set up function
  setup() {
    // get store and router
    const store = useStore();
    const router = useRouter();

    // handle end of items event
    const onEndOfItems = async () => {
      // update timeout of last item
      store.dispatch("presenters/updatePresenterEpoch", { type: "timeOut" });
      // get current task key
      const taskKey = store.getters["battery/getCurrentTask"].key;
      // clone presenters
      const presenters = clone(store.state.presenters.presenters);
      // import function to process presenters
      const { buildAnswersFn } = await import(`./${taskKey}/setup`);
      // process presenters and get answers
      const answers = buildAnswersFn(presenters);
      // persist answers to vuex
      store.dispatch("answers/setTaskAnswers", answers);
      // go to tasks battery
      router.replace({ name: "route-battery-next-task" });
    };

    // return setup object
    return {
      onEndOfItems,
    };
  },
};
</script>
