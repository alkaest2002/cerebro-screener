const getItemsBlocks = (blocks, typeOfBlocks) =>
  blocks.filter((e) => typeOfBlocks.includes(e.type));

const isBlocksArray = blocks => Array.isArray(blocks);

export const computeTaskTotalItems = (
  blocks,
  typeOfBlocks = ["items"],
  countFn = (e) => e.items?.length || 0
) => {
  // ensure blocks is an array
  if (!isBlocksArray(blocks))
   return 0;
  // get blocks
  const itemsBlocks = blocks[0]?.type ? getItemsBlocks(blocks, typeOfBlocks) : blocks;
  // count items in each blocks
  return itemsBlocks.reduce((acc, itr) => (acc += countFn(itr)), 0);
};

export const computeTaskTotalDuration = (blocks, typeOfBlocks = ["items"]) => {
  // ensure block is an array
  if (!isBlocksArray(blocks))
    return 0;
  // get blocks
  const itemsBlocks = blocks[0]?.type ? getItemsBlocks(blocks, typeOfBlocks) : blocks;
  // compute total time
  return itemsBlocks.reduce((acc, itr) => {
    acc += itr?.timer?.timeLimit || 0;
    acc += computeTaskTotalDuration(itr?.items || []);
    return acc;
  }, 0);
};
