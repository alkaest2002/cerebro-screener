<template>
  <div id="cards-info">
    <div class="block mt-1">
      <p class="is-size-5 has-text-weight-bold">
        {{ i18n.headerOne }}
      </p>
      <table class="table is-narrow is-fullwidth is-bordered mt-3">
        <tr>
          <td>{{ i18n.runningAmount }}</td>
          <td
            :class="{
              'has-text-danger-dark has-background-danger-light':
                runningAmount < 0,
              'has-text-success-dark has-background-success-light':
                runningAmount >= 0,
            }"
            class="has-text-centered"
          >
            {{ formatAmount(runningAmount) }}
          </td>
        </tr>
      </table>
    </div>
    <div class="block">
      <p class="is-size-5 has-text-weight-bold">
        {{ i18n.headerTwo }}
      </p>
      <table class="table is-narrow is-fullwidth is-bordered mt-3">
        <tr>
          <td>{{ i18n.winAmount }}</td>
          <td
            class="
              has-text-centered
              has-text-success-dark
              has-background-success-light
            "
          >
            +{{ itemData.win }}
          </td>
        </tr>
        <tr>
          <td>{{ i18n.loseAmount }}</td>
          <td
            class="
              has-text-centered has-text-danger-dark has-background-danger-light
            "
          >
            {{ itemData.lose }}
          </td>
        </tr>
        <tr>
          <td>{{ i18n.loseCards }}</td>
          <td
            class="
              has-text-centered has-text-danger-dark has-background-danger-light
            "
          >
            {{ itemData.loseCards }}
          </td>
        </tr>
      </table>

      <table class="table is-narrow is-fullwidth is-bordered mt-4">
        <tr>
          <td>{{ i18n.flippedCards }}</td>
          <td class="has-text-centered">
            {{ flippedAmounts.length }}
          </td>
        </tr>
        <tr>
          <td>{{ i18n.totalAmount }}</td>
          <td
            :class="{
              'has-text-danger-dark has-background-danger-light':
                totalAmount < 0,
              'has-text-success-dark has-background-success-light':
                totalAmount > 0,
            }"
            class="has-text-centered"
          >
            {{ formatAmount(totalAmount) }}
          </td>
        </tr>
      </table>
    </div>
    <div class="block buttons">
      <button
        :disabled="disableCollect"
        v-bind="$attrs"
        class="button is-warning is-fullwidth"
        type="button"
      >
        {{ i18n.buttons.collect }}
      </button>
    </div>
  </div>
</template>

<script>
import { colTableInfo as i18n } from "@/i18n/it/views/tasks";
import { computed } from "vue";
export default {
  // name
  name: "col-table-info",

  // do not inherit attrs
  inheritAttrs: false,

  // props
  props: {
    itemData: {
      type: Object,
      required: true,
    },

    flippedAmounts: {
      type: Array,
      required: true,
    },

    runningAmount: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },
  },

  // setup
  setup(props) {
    // disable collect
    const disableCollect = computed(
      () =>
        props.flippedAmounts.length == 0 ||
        props.itemData.cards.filter((e) => e.isCovered).length == 0
    );

    // return setup object
    return {
      i18n,
      disableCollect,
      formatAmount: (value) => (value > 0 ? `+${value}` : value),
    };
  },
};
</script>

<style lang="scss" scoped>
table {
  td {
    color: #7a7a7a;
    border-left: none;
    border-right: none;
  }

  td {
    &:first-child {
      padding-right: 30px !important;
    }

    &:nth-child(2) {
      width: 100px;
    }
  }
}
</style>
