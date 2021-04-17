<template>
  <div :class="$attrs.class">
    <div :class="currentTaskIndex == taskIndex ? 'active' : ''" class="card">
      <div class="card-content">
        <div class="content">
          <p class="is-size-4 has-text-weight-bold mb-2">
            task #{{ task.key.toUpperCase() }}
          </p>
          <p class="mb-0 has-text-grey"><b>Quesiti:</b> {{ task.items }}</p>
          <p class="mb-0 has-text-grey">
            <b>Durata:</b> {{ formatTime(task.duration) }} minuti
          </p>
        </div>
      </div>
      <footer class="card-footer">
        <a
          v-if="taskIndex == currentTaskIndex"
          @click.prevent="$attrs.onClick"
          href="#"
          class="card-footer-item"
        >
          continua
        </a>
        <span v-else class="card-footer-item has-text-grey-light">
          {{ taskIndex > currentTaskIndex ? "in attesa" : "completato" }}
        </span>
      </footer>
    </div>
  </div>
</template>

<script>
import { formatTime } from "@/utils/utilityFns";

export default {
  //name
  name: "task-component-task-card",

  // do not inherit attributes
  inheritAttrs: false,

  // props
  props: {
    task: {
      type: Object,
      required: true,
    },
    taskIndex: {
      type: Number,
      required: true,
    },
    currentTaskIndex: {
      type: Number,
      required: true,
    },
  },

  // setup
  setup() {
    // return setup object
    return {
      formatTime,
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  &.active {
    .card-footer {
      background-color: #3273dc;
      a {
        color: #fff;
      }
    }
  }
  .card-footer {
    background-color: #eee;
  }
}
</style>
