<template>
  <div id="presenter-wrapper">
    <div id="title" class="mb-3">
      <h1 class="is-size-3 has-text-weight-bold">
        <slot name="title">
          {{ i18n.task }} {{ presenter.itemIndex + 1 }}|{{ totalItems }}
        </slot>
      </h1>
    </div>
    <div id="presenter" class="is-relative is-clipped box">
      <item-container>
        <div
          v-if="!animationHasEnded"
          class="is-flex is-flex-direction-column is-align-items-center"
        >
          <div class="is-flex is-justify-content-center">
            <div
              class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center mr-5"
            >
              <mul-gauges-panel
                :animation-has-ended="animationHasEnded"
                :gauges-data="itemData.gauges[currentIndex]"
              />
            </div>
            <div
              class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
            >
              <mul-counter
                :animation-has-ended="animationHasEnded"
                :counter-data="itemData.counter[currentIndex]"
              />
            </div>
          </div>
          <div class="mt-3">
            <a
              v-if="currentIndex == 0"
              href="#"
              @click.prevent="onStartAnimation"
            >
              {{ i18n.startAnimation }}
            </a>
            <span v-else class="has-text-grey">
              {{ i18n.animationStarted }}
            </span>
          </div>
        </div>
        <div v-else>
          <mul-inputs />
        </div>
        <slot name="explanation" :item-data="itemData" />
      </item-container>
    </div>
  </div>
</template>

<script>
import { mulItem as i18n } from "@/i18n/it/views/tasks";
import { ref, computed, onUnmounted } from "vue";
import initItem from "@/views/tasks/_composables/initItem";
import itemContainer from "@/views/tasks/_components/item-container";
import mulGaugesPanel from "./_components/mul-gauges-panel";
import mulCounter from "./_components/mul-counter";
import mulInputs from "./_components/mul-inputs";

export default {
  // name
  name: "mul-item",

  // components
  components: {
    itemContainer,
    mulCounter,
    mulGaugesPanel,
    mulInputs,
  },

  // props
  props: {
    presenter: {
      type: Object,
      required: true,
    },
  },

  // setup
  setup(props) {
    // init presenter
    const { totalItems, itemData } = initItem(props.presenter.itemData);

    // interval
    const interval = ref(null);

    // current index
    const currentIndex = ref(0);

    // animation has ended flag
    const animationHasEnded = computed(
      () => currentIndex.value == itemData.gauges.length - 1
    );

    // handle on start animation
    const onStartAnimation = () => {
      // increment immediately current index
      // to reduce starting time of delayed animations
      // of gauges and counter
      currentIndex.value++;
      // start delayed animations
      interval.value = setInterval(() => {
        // if we reached the end of animations
        if (currentIndex.value == itemData.gauges.length - 1)
          // clear interval
          return clearInterval(interval.value);
        // increment current index
        currentIndex.value++;
      }, 4000);
    };

    // on unmounted
    onUnmounted(() => clearInterval(interval.value));

    // return setup object
    return {
      i18n,
      totalItems,
      itemData,
      currentIndex,
      animationHasEnded,
      onStartAnimation,
    };
  },
};
</script>
