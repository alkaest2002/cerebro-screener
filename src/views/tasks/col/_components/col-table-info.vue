<template>
  <div id="cards-info">
    <div class="block mt-1">
      <p class="is-size-5 has-text-weight-bold">Informazioni da inizio task</p>
      <table class="table is-narrow is-fullwidth is-bordered mt-3">
        <tr>
          <td>Totale generale</td>
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
      <p class="is-size-5 has-text-weight-bold">Informazioni mano corrente</p>
      <table class="table is-narrow is-fullwidth is-bordered mt-3">
        <tr>
          <td>Valore carte vincenti</td>
          <td
            class="has-text-centered has-text-success-dark has-background-success-light"
          >
            +{{ itemData.win }}
          </td>
        </tr>
        <tr>
          <td>Valore carte perdenti</td>
          <td
            class="has-text-centered has-text-danger-dark has-background-danger-light"
          >
            {{ itemData.lose }}
          </td>
        </tr>
        <tr>
          <td>Numero carte perdenti</td>
          <td
            class="has-text-centered has-text-danger-dark has-background-danger-light"
          >
            {{ itemData.loseCards }}
          </td>
        </tr>
      </table>

      <table class="table is-narrow is-fullwidth is-bordered mt-4">
        <tr>
          <td>Carte girate</td>
          <td class="has-text-centered">
            {{ flippedAmounts.length }}
          </td>
        </tr>
        <tr>
          <td>Totale in questa mano</td>
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
        blocca guadagno e scopri le carte
      </button>
    </div>
  </div>
</template>

<script>
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
