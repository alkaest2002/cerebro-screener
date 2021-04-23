<template>
  <div id="presenter-wrapper">
    <div id="title" class="mb-3">
      <h1 class="is-size-3 has-text-weight-bold">
        {{ i18n.end.title }} #{{ taskKey }}
      </h1>
    </div>
    <div
      id="presenter"
      class="is-flex is-align-items-center is-justify-content-center box"
    >
      <div class="has-text-centered">
        <img
          src="@/assets/images/trophy.svg"
          alt="trophy"
          style="height: 128px"
        />
        <p class="is-size-3 has-text-weight-bold mt-3">{{ i18n.end.title }}</p>
        <p>
          <span>{{ i18n.end.messageOne }}</span>
          <br />
          <span>{{ i18n.end.messageTwo }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { tasks as i18n } from "@/lang/it/views/tasks";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  // name
  name: "task-end",

  // setup
  setup() {
    // use store
    const store = useStore();

    // get task key and make it uppercase
    const taskKey = computed(() =>
      store.getters["battery/getCurrentTask"].key.toUpperCase()
    );

    // reset any timer on mounting
    onMounted(() => store.dispatch("timer/wipe"));

    // return setup object
    return {
      i18n,
      taskKey,
    };
  },
};
</script>
