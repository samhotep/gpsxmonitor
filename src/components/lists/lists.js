const lists = {
  statusColors: {
    active: {color: '#69ce02', text: 'Online'},
    just_registered: {color: '#999999', text: 'Awaiting Connection'},
    idle: {color: '#0795fb', text: 'GPS not updated'},
    signal_lost: {color: '#fc6701', text: 'Connection lost'},
    offline: {color: '#fc6701', text: 'Offline'},
  },
  inputTypes: {
    ignition: {
      false: require('../../assets/flash.png'),
      true: require('../../assets/flash_active.png'),
    },
    engine: {
      false: require('../../assets/engine.png'),
      true: require('../../assets/engine_active.png'),
    },
    mass: {
      false: require('../../assets/omega.png'),
      true: require('../../assets/omega_active.png'),
    },
    car_alarm: {
      false: require('../../assets/alarm.png'),
      true: require('../../assets/alarm_active.png'),
    },
    sos_button: {
      false: require('../../assets/emergency.png'),
      true: require('../../assets/emergency_active.png'),
    },
    hood: {
      false: require('../../assets/hood.png'),
      true: require('../../assets/hood_active.png'),
    },
    door: {
      false: require('../../assets/door.png'),
      true: require('../../assets/door_active.png'),
    },
    car_lock: {
      false: require('../../assets/lock.png'),
      true: require('../../assets/lock_active.png'),
    },
  },
  counterTypes: {
    odometer: {
      title: 'Odometer',
      text: 'GPS based estimation for odometer',
      unit: 'km',
    },
    engine_hours: {
      title: 'Engine Hours',
      text: 'Calculations based on ignition sensor readings',
      unit: 'h',
    },
    fuel_consumed: {
      title: 'Fuel Consumed',
      text: 'Calculations based on fuel sensor readings',
      unit: 'litres',
    },
  },
};

export default lists;
