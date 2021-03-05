/**
 * Reusable utility functional objects
 */

const Utils = {
  /**
   * Return modified array with objects sorted into categories, which are
   * mapped with identifier colors
   */
  getIDList: (list) => {
    let ids = {};
    list.map((_, i) => {
      let id = _.group_id;
      ids[id] = Number(id);
    });
    return Object.values(ids);
  },
  createCategories: (groups, trackers) => {
    let categories = [];
    groups.map((group, i) => {
      let tracker_list = [];
      trackers.map((tracker, index) => {
        if (group.id === Number(tracker.group_id)) {
          tracker_list.push(tracker);
        }
      });
      if (tracker_list.length > 0) {
        categories.push({...group, trackers: tracker_list});
      }
    });
    return categories;
  },
};

// nof = [
//   {
//     id: 13,
//     label: "cat",
//     color: "#ffffff",
//     trackers: [
//       {...},
//       {...}
//     ]
//   }
// ]

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
