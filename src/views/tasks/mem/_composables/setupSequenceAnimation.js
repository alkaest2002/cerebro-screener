import { ref } from "vue";
import { clone } from "@/utils/utilityFns";

export default (itemData) => {
  
  // sequence of numbers to show
  const sequenceToPlay = ref(clone([...itemData.sequence]));

  // css state
  const cssState = ref(itemData.sequenceHasPlayed ? "finished" : "idle");

  // handle on click play
  const onClickPlay = async () => {
    // do nothing if sequence is not idle
    if (cssState.value != "idle") return;
    // update css state
    cssState.value = "playing";
    // play animation
    const intervalID = setInterval(() => {
      // remove first element of sequence to play
      sequenceToPlay.value.splice(0, 1);
      // when sequence is exhausted
      if (sequenceToPlay.value.length == 0) {
        // clear interval
        clearInterval(intervalID);
        // update css state
        cssState.value = "finished";
        // update sequence has played
        itemData.sequenceHasPlayed = true;
      }
    }, 2000);
  };

  // return setup object
  return {
    sequenceToPlay,
    cssState,
    onClickPlay,
  };
};
