/**
 * Reusable utility functional objects
 */

const Utils = {
  /**
   * Return modified array with objects sorted into categories, which are
   * mapped with identifier colors
   */
  getTrackerIDs: (list) => {
    let ids = [];
    list.map((_, i) => {
      ids.push(_.id);
    });
    return ids;
  },
  getCategories: (list) => {
    let cc = {};
    list.map((_, i) => {
      cc[_.group_id] = [_];
    });
    return cc;
  },
};

export default Utils;

let b = {
  15: [
    {
      clone: false,
      group_id: 15,
      id: 251,
      label: 'M10-UAR 662V',
      source: [Object],
      tag_bindings: [Array],
    },
  ],
  2: [
    {
      clone: true,
      group_id: 2,
      id: 5013,
      label: '2010091 - URA BUSITEMA GENSET',
      source: [Object],
      tag_bindings: [Array],
    },
  ],
  5: [
    {
      clone: false,
      group_id: 5,
      id: 274,
      label: 'UBG 066T Toyota Hillux',
      source: [Object],
      tag_bindings: [Array],
    },
  ],
};
