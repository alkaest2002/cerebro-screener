import { clone } from "@/utils/utilityFns";

export default (blocks) => {
  // clone blocks
  const clonedBlocks = clone(blocks);
  // loop through cloned blocks
  return clonedBlocks.reduce((accOuter, itrOuter, indexOuter) => {
    // loop through current block items
    const presenters = itrOuter.items.reduce(
      (accInner, itrInner, indexInner) => {
        // add presenter to final array of presenters
        accInner.push({
          blockType: itrOuter.type,
          blockIndex: indexOuter,
          itemIndex: indexInner,
          timeIn: {},
          timeOut: {},
          timeFirstReaction: {},
          ...itrInner,
        });
        // return current block presenters array
        return accInner;
      },
      []
    );
    // splat block presenters
    return [...accOuter, ...presenters];
  }, []);
};
