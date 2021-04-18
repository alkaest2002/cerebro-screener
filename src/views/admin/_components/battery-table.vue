<template>
  <div id="task-table">
    <div
      v-for="(task, index) in tasks"
      :key="task.id"
      :class="tasks.length == 1 ? 'disable-hover' : null"
      class="task-row"
    >
      <div
        :draggable="tasks.length > 1"
        class="is-flex is-align-content-center"
        @dragenter.prevent=""
        @dragover.prevent=""
        @dragstart="onDragStart(index)"
        @drop="onDragDrop(index)"
      >
        <span class="task-cell has-text-centered">
          <span
            v-if="tasks.length > 1"
            class="is-clickable has-text-danger"
            @click="onClickDeleteTask(index)"
          >
            <img src="@/assets/images/trash.svg" />
          </span>
          <span v-else>
            <img src="@/assets/images/trash_disabled.svg" />
          </span>
        </span>
        <span class="task-cell is-hidden-mobile">
          {{ task.key.toUpperCase() }}
        </span>
        <span class="task-cell">
          {{ task.description }}
        </span>
        <span class="task-cell"> {{ formatTime(task.duration) }} min </span>
        <span class="task-cell">
          {{ task.type }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { formatTime, clone } from "@/utils/utilityFns";

export default {
  // name
  name: "admin-component-battery-table",

  // props
  props: {
    templateBattery: {
      type: Array,
      required: true,
    },
  },

  // emitted events
  emits: {
    "update:templateBattery": (value) =>
      Array.isArray(value) && value.length > 0,
    "update:shouldShuffle": (value) => value == 0,
  },

  // setup
  setup(props, { emit }) {
    // define refs
    const draggedIndex = ref(null);

    // computed
    const tasks = computed({
      get: () => props.templateBattery,
      set: (value) => {
        emit("update:shouldShuffle", 0);
        emit("update:templateBattery", value);
      },
    });

    // handle on drag task
    const onDragStart = (index) => {
      // store index of task being dragged
      draggedIndex.value = index;
    };

    // handle on drop dragged task
    const onDragDrop = (index) => {
      // clone tasks
      const clonedTasks = clone(tasks.value);
      // remove dragged task from its original position
      clonedTasks.splice(draggedIndex.value, 1);
      // place dragged task into its new position
      clonedTasks.splice(index, 0, tasks.value[draggedIndex.value]);
      // update tasks
      tasks.value = clonedTasks;
    };

    // handle on delete task
    const onClickDeleteTask = (index) => {
      // clone tasks
      const clonedTasks = clone(tasks.value);
      // remove task to be deleted
      clonedTasks.splice(index, 1);
      // update tasks
      tasks.value = clonedTasks;
    };

    // return setup object
    return {
      tasks,
      onDragStart,
      onDragDrop,
      onClickDeleteTask,
      formatTime,
    };
  },
};
</script>

<style lang="scss" scoped>
$border-color: #ddd;
$background-color: #eee;

#task-table {
  border-top: 1px solid $border-color;

  .task-row {
    border-bottom: 1px solid $border-color;

    &:hover {
      cursor: move;
    }

    &.disable-hover:hover {
      cursor: default;
    }

    &:nth-child(even) {
      background-color: $background-color;
    }

    .task-cell {
      padding: 3px 0;
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &:nth-child(1) {
        width: 4%;
      }

      &:nth-child(2) {
        width: 6%;
      }

      &:nth-child(3) {
        width: 35%;
      }

      &:nth-child(4) {
        width: 20%;
      }

      &:nth-child(5) {
        width: 35%;
      }

      img {
        height: 1.1em;
      }
    }
  }
}
</style>
