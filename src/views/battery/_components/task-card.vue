<template>
  <div :class="$attrs.class">
    <div :class="currentTaskIndex == taskIndex ? 'active' : ''" class="card">
      <div class="card-content">
        <div class="content">
          <p class="is-size-4 has-text-weight-bold mb-2">
            {{ i18n.taskCard.task }} {{ hashedTaskKey }}
          </p>
          <p class="mb-0 has-text-grey"><b>Quesiti:</b> {{ task.items }}</p>
          <p class="mb-0 has-text-grey">
            <b>{{ i18n.taskCard.duration }}: </b>
            <span v-if="task.duration > 0">
              {{ formatTime(task.duration) }} {{ i18n.taskCard.minutes }}
            </span>
            <span v-else>{{ i18n.taskCard.noTimeLimit }}</span>
          </p>
        </div>
      </div>
      <footer class="card-footer">
        <a
          v-if="taskIndex == currentTaskIndex"
          href="#"
          class="card-footer-item"
          @click.prevent="$attrs.onClick"
        >
          {{ i18n.taskCard.buttons.continue }}
        </a>
        <span v-else class="card-footer-item has-text-grey-light">
          {{
            taskIndex > currentTaskIndex
              ? i18n.taskCard.buttons.waiting
              : i18n.taskCard.buttons.completed
          }}
        </span>
      </footer>
    </div>
  </div>
</template>

<script>
import { battery as i18n } from "@/i18n/it/views/battery";
import { computed } from "vue";
import { formatTime } from "@/utils/utilityFns";

export default {
  //name
  name: "task-card",

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
  setup(props) {
    // hashed task key
    const hashedTaskKey = computed(() => `#${props.task.key.toUpperCase()}`);

    // return setup object
    return {
      i18n,
      hashedTaskKey,
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
