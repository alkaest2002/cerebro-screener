import { clone, leftPadValue } from "@/utils/utilityFns";

export default {
  // prop
  data: null,
  // function to zip arrays
  _zip(arr, ...arrs) {
    return arr.map((e, idx) =>
      arrs.reduce((acc, itr) => [...acc, itr[idx]], [e])
    );
  },
  // public methods
  chain(data) {
    // filter out end block
    this.data = data.filter((e) => e.blockType != "end");
    // return object for chaining
    return this;
  },
  keepDefaultProps() {
    // loop through presenters
    this.data = this.data.map((e) =>
      // keep default props
      (({
        id,
        blockIndex,
        blockType,
        timeIn,
        timeOut,
        timeFirstReaction,
        itemData,
      }) => {
        // for instructions blocks
        if (blockType == "instructions")
          // keep actions only
          itemData = Object.assign({}, { actions: itemData.actions });
        // return default props
        return { id, blockIndex, timeIn, timeOut, timeFirstReaction, itemData };
      })(e)
    );
    // return object for chaining
    return this;
  },
  computeDuration() {
    // loop through presenters
    this.data = this.data.map((e) => {
      // zip timeIn and timeOut ARRAYS
      const zipped = this._zip(e.timeOut[e.id], e.timeIn[e.id]);
      // compute duration in seconds
      e.itemDuration =
        zipped.reduce((acc, itr) => (acc += itr[0] - itr[1]), 0) / 1000;
      // round duration with one decimal (e.g., 1.4 seconds)
      e.itemDuration = Math.round(e.itemDuration * 10) / 10;
      // if timeFirstReaction is set
      if (e.timeFirstReaction[e.id]) {
        // compute itemFirstReaction in seconds
        e.itemFirstReactionAfter =
          (e.timeFirstReaction[e.id][0] - e.timeIn[e.id][0]) / 1000;
        // round duration with one decimal (e.g., 1.4 seconds)
        e.itemFirstReactionAfter =
          Math.round(e.itemFirstReactionAfter * 10) / 10;
      } else {
        // set no timeFirstReaction to null
        e.itemFirstReactionAfter = null;
      }
      // delete props
      delete e.timeIn;
      delete e.timeOut;
      delete e.timeFirstReaction;
      // return e
      return e;
    });
    // return object for chaining
    return this;
  },
  omitSpecifiedItemDataProps(propsToOmit = []) {
    // set itemData props to omit
    const augmentedPropsToOmit = [
      ...propsToOmit,
      ...["enableNext", "canGoForth"],
    ];
    // loop through presenters
    this.data = this.data.map((e) => {
      // loop through itemData props to be omitted and delete them
      augmentedPropsToOmit.forEach((p) => delete e.itemData[p]);
      // return presenter
      return e;
    });
    // return object for chaining
    return this;
  },
  explodeBlock(blockId, blockType, numberOfItems, itemDataFn) {
    // find index of target block
    const blockIndex = this.data.findIndex((e) => e.id == blockId);
    // clone block to be exploded
    const block = clone(this.data[blockIndex]);
    // get timeIn values
    const timeIn = Object.values(block.timeIn).slice(1);
    // get timeOut values
    const timeOut = Object.values(block.timeOut);
    // get timeFirstReaction values
    const timeFirstReaction = Object.values(block.timeFirstReaction);
    // compute id prefix
    const idPrefix = block.id.split(".")[0];
    // create an array of numberOfITems length, then loop
    const explodedBlock = Array.from(
      { length: numberOfItems },
      (e, idx) => idx
    ).map((e) => {
      // create and return exploded item
      const id = `${idPrefix}.${leftPadValue(e + 1, 3, 0)}`;
      return {
        id,
        blockType,
        blockIndex: block.blockIndex,
        timeIn: { [id]: timeIn[e] },
        timeOut: { [id]: timeOut[e] },
        timeFirstReaction: { [id]: timeFirstReaction[e] },
        itemData: itemDataFn(block, e),
      };
    });
    // replace block with exploded block
    this.data[blockIndex] = explodedBlock;
    // flatten out data
    this.data = this.data.flat();
    // return object for chaining
    return this;
  },
  flatten() {
    // loop through presenters
    this.data = this.data.map((e) => {
      // get props
      const { id, blockIndex, itemDuration, itemFirstReactionAfter, itemData } =
        e;
      // flatten pbject
      const flattended = {
        id,
        itemDuration,
        itemFirstReactionAfter,
        ...itemData,
      };
      // update keys to take into account flattening
      return Object.keys(flattended).reduce((acc, itr) => {
        acc[`bl${blockIndex}.${id}.${itr}`] = flattended[itr];
        return acc;
      }, {});
    });
    // return object for chaining
    return this;
  },
  getData() {
    // loop thriugh data array
    return this.data.reduce((acc, itr) => {
      // transform data array into shallow object
      return { ...acc, ...itr };
    }, {});
  },
};
