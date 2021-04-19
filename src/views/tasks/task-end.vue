<template>
  <div id="presenter-wrapper">
    <div id="title" class="mb-3">
      <h1 class="is-size-3 has-text-weight-bold">Fine task #{{ taskKey }}</h1>
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
        <p class="is-size-3 has-text-weight-bold mt-3">Fine del task</p>
        <p>
          Complimenti! Hai ultimato la prova.<br />Rilassati per qualche secondo
          e poi vai avanti.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  // name
  name: "task-end",

  // setup
  setup() {
    // use store
    const store = useStore();

    // get task key
    const taskKey = computed(() =>
      store.getters["battery/getCurrentTask"].key.toUpperCase()
    );

    // reset any timer on mounting
    onMounted(() => store.dispatch("timer/wipe"));

    // return setup object
    return {
      taskKey,
    };
  },
};
</script>
