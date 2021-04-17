import { ref, computed } from "vue";
import { clone } from "@/utils/utilityFns";

export default (props, emit) => {
  // sequence of numbers to show
  const sequenceToPlay = ref(clone([" ", ...props.sequence]));

  // css state
  const cssState = ref(props.sequenceHasPlayed ? "finished" : "idle");

  // number to show
  const numberToShow = computed(() => {
    if (cssState.value == "idle") return "";
    if (cssState.value == "finished") return "fine";
    return sequenceToPlay.value[0];
  });

  // handle on click play
  const onClickPlay = async () => {
    // do nothing if sequence is not idle
    if (cssState.value != "idle") return;
    // update css state
    cssState.value = "started";
    // play animation
    const intervalID = setInterval(() => {
      // update css state
      cssState.value = "playing";
      // remove first element of sequence to play
      sequenceToPlay.value.splice(0, 1);
      // when sequence is exhausted
      if (sequenceToPlay.value.length == 0) {
        // clear interval
        clearInterval(intervalID);
        // update css state
        cssState.value = "finished";
        // emit event
        emit("sequenceHasPlayed", true);
      }
    }, 2000);
  };

  // return setup object
  return {
    cssState,
    numberToShow,
    onClickPlay,
  };
};
