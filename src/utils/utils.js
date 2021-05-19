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
    let modified_groups = [
      ...groups,
      {color: '1e96dc', id: 0, title: 'No Group'},
    ];
    modified_groups.map((group, i) => {
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
  getTimeDifference: (dateString, showSeconds = true) => {
    if (dateString) {
      let destructuredTime = '';
      let diff = new Date(
        Date.now() - Date.parse(dateString.replace(/-+/g, '/')),
      );
      let millis = diff.getTime();
      let ranges = [
        {name: 'day', length: 86400000},
        {name: 'hour', length: 3600000},
        {name: 'min', length: 60000},
      ];
      showSeconds ? ranges.push[{name: 'second', length: 1000}] : null;
      ranges.map((_, i) => {
        let total = Math.floor(millis / _.length);
        if (total > 0 && total === 1) {
          destructuredTime += `${total} ${_.name}. `;
        } else if (total > 1) {
          destructuredTime += `${total} ${_.name}s. `;
        }
        millis = millis % _.length;
      });
      return destructuredTime;
    } else {
      return '';
    }
  },
  getHoursAndMinutes: (start, end) => {
    let hours = end.getHours() - start.getHours();
    let minutes = end.getMinutes() - start.getMinutes();
    if (minutes < 0) {
      hours -= 1;
      minutes = 60 + minutes;
    }
    return {hours: hours, minutes: minutes};
  },
  calculateTimeDifference: (start, end) => {
    let hours,
      minutes = Utils.getHoursAndMinutes(start, end);
    return `${hours} h ${minutes} m`;
  },
  getTime: (millis) => {
    let destructuredTime = '';
    let ranges = [
      {name: 'h', length: 3600000},
      {name: 'min', length: 60000},
    ];
    ranges.map((_, i) => {
      let total = Math.floor(millis / _.length);
      if (total > 0) {
        destructuredTime += `${total} ${_.name}. `;
      }
      millis = millis % _.length;
    });
    if (destructuredTime !== '') {
      return destructuredTime;
    } else {
      return '0';
    }
  },
  getSignalIcon: (signal_level) => {
    if (signal_level > 75) {
      return require('../assets/signal/strong.png');
    } else if (signal_level <= 75 && signal_level > 50) {
      return require('../assets/signal/good.png');
    } else if (signal_level <= 50 && signal_level > 25) {
      return require('../assets/signal/low.png');
    } else if (signal_level <= 25) {
      return require('../assets/signal/poor.png');
    }
  },
  getMovementIcon: (movement_status) => {
    if (movement_status === 'moving') {
      return require('../assets/speed.png');
    } else if (movement_status === 'parked') {
      return require('../assets/parked.png');
    } else if (movement_status === 'stopped') {
      return require('../assets/stop.png');
    }
  },
  getDirection: (degrees) => {
    /**
     * Azimuthal direction using quadrants
     * Approximations for compass rose (leading letters determine direction e.g NNE)
     * Allowance is 22.5 degrees
     */
    if ((degrees <= 22.5 && degrees > 337.5) || degrees === 0) {
      return 'N';
    } else if (degrees <= 67.5 && degrees > 22.5) {
      return 'NE';
    } else if (degrees <= 112.5 && degrees > 67.5) {
      return 'E';
    } else if (degrees <= 157.5 && degrees > 112.5) {
      return 'SE';
    } else if (degrees <= 202.5 && degrees > 157.5) {
      return 'S';
    } else if (degrees <= 247.5 && degrees > 202.5) {
      return 'SW';
    } else if (degrees <= 292.5 && degrees > 247.5) {
      return 'W';
    } else if (degrees <= 337.5 && degrees > 292.5) {
      return 'NW';
    }
  },
  getBatteryIcon: (level) => {
    if (level >= 66) {
      return require('../assets/battery_full.png');
    } else if (level < 66 && level >= 33) {
      return require('../assets/battery_medium.png');
    } else if (level < 33) {
      return require('../assets/battery_low.png');
    }
  },
  sortIntoDateGroups: (items, type = 'Tracks') => {
    let dates = {};
    items.map((_, i) => {
      let item_date =
        type === 'Tracks'
          ? _.start_date.split(' ')[0]
          : _.status_change_date.split(' ')[0];
      if (dates[item_date]) {
        dates[item_date].push(_);
      } else {
        dates[item_date] = [_];
      }
    });
    // TODO Return list sorted by date
    return dates;
  },
};

export default Utils;
