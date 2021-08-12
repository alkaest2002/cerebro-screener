<template>
  <div class="is-flex is-justify-content-center">
    <div id="info" class="is-flex is-align-items-center">
      <div
        :class="{
          [`has-text-${
            2000 + itemData.netAmount >= 0 ? 'success' : 'danger'
          }-dark`]: true,
          [`has-background-${
            2000 + itemData.netAmount >= 0 ? 'success' : 'danger'
          }-light`]: true,
        }"
        class="
          is-flex
          is-flex-direction-column
          is-align-items-center
          is-justify-content-center
        "
      >
        <span>{{ i18n.netAmount }}</span>
        <span class="has-text-weight-bold">{{
          formatAmount(2000 + itemData.netAmount)
        }}</span>
      </div>
      <table class="table">
        <tr>
          <td class="has-text-grey">{{ i18n.lastWin }}</td>
          <td
            class="has-text-centered has-text-weight-bold has-text-success-dark"
          >
            {{
              itemData.wins.slice(-1)[0] == undefined
                ? "n.d."
                : itemData.wins.slice(-1)[0]
            }}
          </td>
        </tr>
        <tr>
          <td class="has-text-grey">{{ i18n.lastLoss }}</td>
          <td
            class="has-text-centered has-text-weight-bold has-text-danger-dark"
          >
            {{
              itemData.losses.slice(-1)[0] == undefined
                ? "n.d."
                : itemData.losses.slice(-1)[0]
            }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { iowInfo as i18n } from "@/i18n/it/views/tasks";

export default {
  // name
  name: "iow-info",

  // props
  props: {
    itemData: {
      type: Object,
      required: true,
    },
  },

  //setup
  setup() {
    // return setup object
    return {
      i18n,
      formatAmount: (value) => (value > 0 ? `+${value}` : value),
    };
  },
};
</script>

<style lang="scss" scoped>
#info {
  padding: 0;
  border-radius: 3px;

  > div {
    padding: 0 30px;
    min-height: 80px;
    min-width: 200px;

    span:nth-child(2) {
      font-size: 2em;
      line-height: 1em;
    }
  }

  table {
    tr {
      td {
        padding: 1px 10px;
      }

      td:first-child {
        width: 190px;
      }

      td:nth-child(2) {
        width: 80px;
      }
    }

    tr:last-child {
      td {
        border-bottom: none;
      }
    }
  }
}
</style>
