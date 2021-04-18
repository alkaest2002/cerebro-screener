<template>
  <div class="buttons has-addons mb-1">
    <button
      v-for="[task, status] in shuffledTasksMap.entries()"
      :key="task.key"
      :class="{ 'is-link': status }"
      :disabled="disabled"
      class="button"
      type="button"
      @click="onClickTask(task)"
    >
      {{ task.key }}
    </button>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { clone } from "@/utils/utilityFns";

export default {
  // name
  name: "admin-component-battery-randomizer",

  // props
  props: {
    templateBattery: {
      type: Array,
      required: true,
    },
    shuffleSchema: {
      type: Array,
      default: () => {
        return [];
      },
    },
    disabled: {
      type: Boolean,
      default: true,
    },
  },

  // emitted events
  emits: {
    shuffleSchema: (value) => Array.isArray(value),
  },

  // setup object
  setup(props, { emit }) {
    // ref
    const randomizationMap = ref(new Map());

    // computed
    const shuffledTasksMap = computed({
      get: () => {
        // if randomizationMap is already populated just return it
        if (randomizationMap.value.size > 0) return randomizationMap.value;
        // clone tasks
        const clonedTasks = clone(props.templateBattery);
        // get shuffle schema
        const shuffleSchema =
          props.shuffleSchema.length > 0
            ? props.shuffleSchema
            : Array.from({ length: props.templateBattery.length }, () => false);
        // loop through each task and update randomizationMap
        clonedTasks.forEach((e, i) =>
          randomizationMap.value.set(e, shuffleSchema[i])
        );
        // return randomizationMap
        return randomizationMap.value;
      },
      set: (value) =>
        shuffledTasksMap.value.set(value, !shuffledTasksMap.value.get(value)),
    });

    // watch
    watch(
      () => {
        return { tasks: props.templateBattery, disabled: props.disabled };
      },
      () => (randomizationMap.value = new Map()),
      { deep: true }
    );

    // handle on click task
    const onClickTask = (task) => {
      // toggle task in randomizationMap (if task parameter is defined)
      if (task) shuffledTasksMap.value = task;
      // emit event
      emit("shuffle-schema", [...shuffledTasksMap.value.values()]);
    };

    // return setup object
    return {
      shuffledTasksMap,
      onClickTask,
    };
  },
};
</script>

<style lang="scss" scoped>
.button {
  height: 30px;
  width: 50px;
  padding: 4px;
  text-transform: uppercase;
}
</style>
