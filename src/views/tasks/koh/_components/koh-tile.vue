<template>
  <div class="tile-wrapper is-relative">
    <div
      :draggable="isDraggable"
      :class="{
        [tileColor]: true,
        [currentRotationValue]: true,
        'is-clickable': !isLocked && tileColor != 'void',
        'is-hover': highlightVoid,
      }"
      class="tile"
      @click.exact.left="onRotateTile('clockwise')"
      @click.exact.right.prevent="onRotateTile('counterClockwise')"
      @dragenter="onDrag($event, 'enter')"
      @dragover="onDrag($event, 'over')"
      @dragleave="onDrag($event, 'leave')"
      @dragstart="onDragStart"
      @drop="onDrop"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  // name
  name: "koh-tile",

  // props
  props: {
    isLocked: {
      type: Boolean,
      default: false,
    },

    tileIndex: {
      type: Number,
      required: true,
    },

    tileType: {
      type: String,
      required: true,
      validator: (value) => {
        return ["reference", "figure"].includes(value);
      },
    },

    tileColor: {
      type: String,
      required: true,
      validator: (value) => {
        return [
          "void",
          "white",
          "red",
          "blue",
          "yellow",
          "yellow-blue",
          "red-white",
        ].includes(value);
      },
    },

    tileRotation: {
      type: String,
      required: true,
      validator: (value) => {
        return ["clock-0", "clock-90", "clock-180", "clock-270"].includes(
          value
        );
      },
    },
  },

  // emitted events
  emits: {
    "tile-dragged": (value) =>
      ["tileIndex", "tileType", "tileColor", "tileRotation"].every((e) =>
        Object.keys(value).includes(e)
      ),

    "tile-rotated": (value) =>
      Object.keys(value).every((e) =>
        ["tileIndex", "tileRotationValue"].includes(e)
      ),

    "tile-dropped": (value) => typeof value == "number",
  },

  setup(props, { emit }) {
    // default rotations
    const rotations = ["0", "90", "180", "270"].map((e) => `clock-${e}`);

    // duplicate rotations
    rotations.splice(rotations.length, 0, ...[...rotations]);

    // highlght void tile on hovering
    const highlightVoid = ref(false);

    // is draggable
    const isDraggable = computed(
      () => !props.isLocked && props.tileColor != "void"
    );

    // is droppable
    const isDroppable = computed(
      () => !props.isLocked && props.tileColor == "void"
    );

    // can be rotated
    const canBeRotated = computed(() =>
      [
        !props.isLocked,
        props.tileType == "figure",
        ["yellow-blue", "red-white"].includes(props.tileColor),
      ].every((e) => e)
    );

    // rotation value
    const currentRotationValue = computed({
      get: () => props.tileRotation,
      set: (rotationType) => {
        // clone default rotations (and reverse if it's the case)
        const clonedRotation =
          rotationType == "clockwise"
            ? [...rotations]
            : [...rotations].reverse();
        // find current tile rotation in default rotations array
        const currentRotationIndex = clonedRotation.findIndex(
          (e) => e == currentRotationValue.value
        );
        // notify tile rotated
        emit("tile-rotated", {
          tileIndex: props.tileIndex,
          tileRotationValue: clonedRotation[currentRotationIndex + 1],
        });
      },
    });

    // handle on drag enter
    const onDrag = ($event, dragOp) => {
      // let drag be
      if (!isDroppable.value) return;
      highlightVoid.value = dragOp != "leave";
      $event.preventDefault();
    };

    // handle on drag start
    const onDragStart = () => {
      const { isLocked, ...tile } = props; // eslint-disable-line no-unused-vars
      // notify tile dragged
      emit("tile-dragged", tile);
    };

    // handle on drop tile
    const onDrop = () => {
      // do nothing if it is not droppable
      if (!isDroppable.value) return;
      // reset highlight
      highlightVoid.value = false;
      // notifiy tile dropped
      emit("tile-dropped", props.tileIndex);
    };

    // handle on rotate tile
    const onRotateTile = (direction) => {
      // do nothing if tile cannot be rotated
      if (!canBeRotated.value) return;
      // do nothing if tile has full color (rotation doesn't make sense)
      if (!/-/.test(props.tileColor)) return;
      // rotate clockwise or counter-clockwise
      currentRotationValue.value = direction;
    };

    // return setup object
    return {
      currentRotationValue,
      isDraggable,
      isDroppable,
      canBeRotated,
      highlightVoid,
      onDrag,
      onDragStart,
      onDrop,
      onRotateTile,
    };
  },
};
</script>

<style lang="scss" scoped>
$tile-dim: 60px;
$face-void: #fff;
$face-void-highlght: #eee;
$face-red: #ed5565;
$face-blue: #0074d9;
$face-yellow: #ffdc00;
$face-white: #ddd;

@mixin m-rotate($degree) {
  -webkit-transform: rotate($degree);
  -moz-transform: rotate($degree);
  transform: rotate($degree);
}

.tile-wrapper {
  height: $tile-dim;
  width: $tile-dim;

  .tile {
    position: relative;
    height: $tile-dim;
    width: $tile-dim;

    &.void {
      background-color: $face-void;

      &.is-hover {
        background-color: $face-void-highlght;
      }
    }

    &.white {
      background-color: $face-white;
    }

    &.red {
      background-color: $face-red;
    }

    &.yellow {
      background-color: $face-yellow;
    }

    &.blue {
      background-color: $face-blue;
    }

    &.red-white {
      background-image: -webkit-linear-gradient(
        -45deg,
        $face-red 50%,
        $face-white 50.3%
      );
    }

    &.yellow-blue {
      background-image: -webkit-linear-gradient(
        -45deg,
        $face-yellow 50%,
        $face-blue 50.3%
      );
    }

    &.clock-0 {
      @include m-rotate(0deg);
    }

    &.clock-90 {
      @include m-rotate(90deg);
    }

    &.clock-180 {
      @include m-rotate(180deg);
    }

    &.clock-270 {
      @include m-rotate(270deg);
    }

    &.counter-clock-90 {
      @include m-rotate(-90deg);
    }

    &.counter-clock-180 {
      @include m-rotate(-180deg);
    }

    &.counter-clock-270 {
      @include m-rotate(-270deg);
    }
  }
}
</style>
