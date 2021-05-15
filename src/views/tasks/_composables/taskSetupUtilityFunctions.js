const getItemsBlocks = (blocks) => blocks.filter((e) => e.type == "items");

export const computeTaskTotalItems = (blocks, countFn = (e) => e.items.length) => {
  // get blocks of type items
  const itemsBlocks = getItemsBlocks(blocks);
  // count items in each blocks
  return itemsBlocks.reduce((acc,itr) => acc += countFn(itr), 0);
};

export const computeTaskTotalDuration = (blocks) => {
  // get blocks of type items
  const itemsBlocks = getItemsBlocks(blocks);
  // compute total time
  return itemsBlocks
    .reduce((acc,itr) => {
    	acc += itr?.timer?.timeLimit || 0;
      acc += computeTaskTotalDuration(itr?.items || []);
      return acc;
    }, 0);
};
