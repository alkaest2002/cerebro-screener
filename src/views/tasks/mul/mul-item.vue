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
        <div class="is-flex is-justify-content-center">
          <div style="width: 55%">
            <div
              class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
            >
              <mul-gauges-panel 
                :gauges-data="itemData.gauges[currentIndex]" 
                :animation-has-ended="animationHasEnded"
              />
            </div>
          </div>
          <div class="is-flex is-flex-direction-column" style="width: 35%">
            <div>
              <mul-counter :counter-data="itemData.counter" />
            </div>
            <div class="mt-4">
              <mul-inputs @click="onStartAnimation" />
            </div>
          </div>
        </div>
        <slot name="explanation" :item-data="itemData" />
        {{ itemData.gauges }}  {{ currentIndex }}
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
    const animationHasEnded = computed(() =>
      currentIndex.value == itemData.gauges.length -1
    );

    // handle on start animation
    const onStartAnimation = () => {
      // start animation
      interval.value = setInterval(() => {
        // if we reached the end of the gauges array
        if (currentIndex.value == itemData.gauges.length -1)
          // clear interval
          return clearInterval(interval.value);
        // update currentIndex
        currentIndex.value++;
      }, 5000)
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
      onStartAnimation
    };
  },
};
</script>
