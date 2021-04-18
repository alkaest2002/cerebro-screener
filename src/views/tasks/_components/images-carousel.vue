<template>
  <div>
    <div
      v-for="(img, index) in images"
      :key="index"
      class="is-flex is-flex-direction-column is-justify-content-flex-start is-align-items-center mb-3"
    >
      <a
        v-bind="$attrs"
        href="#"
        class="has-text-grey has-text-centered"
        @click.prevent="onClickFigure(index)"
      >
        <img src="@/assets/images/figure.svg" alt="figure placheholder" />
        <span>fig {{ index + 1 }}</span>
      </a>
    </div>
    <teleport to="#modal">
      <div class="modal" :class="{ 'is-active': modalOpen }">
        <div class="modal-background" />
        <div class="modal-content">
          <div class="card">
            <div class="card-image">
              <figure class="image">
                <img :src="`/img/tasks/${modalData.src}`" alt="immagine" />
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
                  chiudi
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
import { ref, computed } from "vue";

export default {
  // name
  name: "task-component-carousel",

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
    // ref
    const modalOpen = ref(false);
    const clickedImg = ref(null);

    // computed
    const modalData = computed(() => props.images[clickedImg.value || 0]);

    // handle on click figure
    const onClickFigure = (index) => {
      // store index
      clickedImg.value = index;
      // show modal
      modalOpen.value = true;
    };

    // return setup object
    return {
      modalOpen,
      modalData,
      onClickFigure,
    };
  },
};
</script>
