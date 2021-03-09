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
      ids[_.id] = Number(_.id);
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
  getTimeDifference: (dateString) => {
    let destructuredTime = '';
    let diff = new Date(
      Date.now() - Date.parse(dateString.replace(/-+/g, '/')),
    );
    let millis = diff.getTime();
    let ranges = [
      {name: 'days', length: 86400000},
      {name: 'hours', length: 3600000},
      {name: 'min.', length: 60000},
    ];
    ranges.map((_, i) => {
      let total = Math.floor(millis / _.length);
      if (total > 0) {
        destructuredTime += `${total} ${_.name} `;
      }
      millis = millis % _.length;
    });
    return destructuredTime;
  },
};

export default Utils;
