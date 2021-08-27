<template>
  <teleport to="#modal">
    <div class="modal" :class="imageClass">
      <div class="modal-background" />
      <div class="modal-content">
        <div class="card">
          <div class="card-image">
            <figure class="image">
              <img :src="imageSrc" />
            </figure>
          </div>
          <div class="card-content">
            <div class="content has-text-grey" v-html="imageDescription" />
            <div class="buttons is-flex is-justify-content-center">
              <button class="button is-link" type="button" v-bind="$attrs">
                {{ i18n.buttons.close }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { imagesCarousel as i18n } from "@/i18n/it/views/tasks";

export default {
  name: "image-teleport",

  // do not inherit attrs
  inheritAttrs: false,

  // props
  props: {
    imageClass: {
      type: Object,
      required: true,
    },

    imageSrc: {
      type: String,
      required: true,
    },

    imageDescription: {
      type: String,
      required: true,
    },
  },

  // setup
  setup() {
    return {
      i18n,
    };
  },
};
</script>
