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
    <teleport to="#modal">
      <div class="modal" :class="{ 'is-active': modalOpen }">
        <div class="modal-background" />
        <div class="modal-content">
          <div class="card">
            <div class="card-image">
              <figure class="image">
                <img :src="`/img/tasks/${modalData.src}`" />
              </figure>
            </div>
            <div class="card-content">
              <div
                class="content has-text-grey"
                v-html="modalData.description"
              />
              <div class="buttons is-flex is-justify-content-center">
                <button
                  class="button is-link"
                  type="button"
                  @click="modalOpen = false"
                >
                  {{ i18n.buttons.close }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import { imagesCarousel as i18n } from "@/i18n/it/views/tasks";
import { ref, computed } from "vue";

export default {
  // name
  name: "images-carousel",

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
    const modalOpen = ref(false);

    // clicked image
    const clickedImg = ref(0);

    // modal data
    const modalData = computed(() => props.images[clickedImg.value]);

    // handle on click figure
    const onClickFigure = (index) => {
      // store index
      clickedImg.value = index;
      // show modal
      modalOpen.value = true;
    };

    // return setup object
    return {
      i18n,
      modalOpen,
      modalData,
      onClickFigure,
    };
  },
};
</script>
