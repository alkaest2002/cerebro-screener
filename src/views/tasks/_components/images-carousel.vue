<template>
  <div>
    <div
      v-for="(img, index) in images"
      :key="index"
      class="
        is-flex
        is-flex-direction-column
        is-justify-content-flex-start
        is-align-items-center
        mb-3
      "
    >
      <a
        v-bind="$attrs"
        href="#"
        class="has-text-grey has-text-centered"
        @click.prevent="onClickFigure(index)"
      >
        <img src="@/assets/images/figure.svg" />
        <span>{{ i18n.fig }} {{ index + 1 }}</span>
      </a>
    </div>
    <image-teleport
      :modal-is-open="modalIsOpen"
      :image-class="{ 'is-active': modalIsOpen }"
      :image-src="`/img/tasks/${modalData.src}`"
      :image-description="modalData.description"
      @click="modalIsOpen = false"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { imagesCarousel as i18n } from "@/i18n/it/views/tasks";
import imageTeleport from "./image-teleport.vue";

export default {
  // name
  name: "images-carousel",

  // components
  components: {
    imageTeleport,
  },

  // do not inherit attrs
  inheritAttrs: false,

  // props
  props: {
    images: {
      type: Array,
      required: true,
    },
  },

  // setup
  setup(props) {
    // modal open flag
    const modalIsOpen = ref(false);

    // clicked image
    const clickedImg = ref(0);

    // modal data
    const modalData = computed(() => props.images[clickedImg.value]);

    // handle on click figure
    const onClickFigure = (index) => {
      // store index
      clickedImg.value = index;
      // show modal
      modalIsOpen.value = true;
    };

    // return setup object
    return {
      i18n,
      modalIsOpen,
      modalData,
      onClickFigure,
    };
  },
};
</script>
