const getItemsBlocks = (blocks, typeOfBlocks) => blocks.filter((e) => typeOfBlocks.includes(e.type));

export const computeTaskTotalItems = (
  blocks,
  typeOfBlocks = ["items"],
  countFn = (e) => e.items.length
) => {
  // get blocks of type items
  const itemsBlocks = getItemsBlocks(blocks, typeOfBlocks);
  // count items in each blocks
  return itemsBlocks.reduce((acc, itr) => (acc += countFn(itr)), 0);
};

export const computeTaskTotalDuration = (
  blocks, 
  typeOfBlocks = ["items"]
) => {
  // get blocks of type items
  const itemsBlocks = getItemsBlocks(blocks, typeOfBlocks);
  // compute total time
  return itemsBlocks.reduce((acc, itr) => {
    acc += itr?.timer?.timeLimit || 0;
    acc += computeTaskTotalDuration(itr?.items || []);
    return acc;
  }, 0);
};
