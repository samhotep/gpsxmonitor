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
  getTimeDifference: (dateString) => {
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
      ranges.map((_, i) => {
        let total = Math.floor(millis / _.length);
        if (total > 0 && total < 2) {
          destructuredTime += `${total} ${_.name} `;
        } else if (total > 1) {
          destructuredTime += `${total} ${_.name}s `;
        }
        millis = millis % _.length;
      });
      return destructuredTime;
    } else {
      return '';
    }
  },
};

export default Utils;

let x = [
  {
    clone: false,
    group_id: 0,
    id: 5757,
    label: 'office car testing',
    source: {
      blocked: false,
      creation_date: '2021-03-15',
      device_id: '860922040997250',
      id: 1530,
      model: 'bce_fms500_lightplus_mqtt',
      phone: null,
      status_listing_id: null,
      tariff_end_date: '2021-03-16',
      tariff_id: 2,
    },
    tag_bindings: [],
  },
  {
    clone: true,
    group_id: 0,
    id: 6079,
    label: 'UBH 988G',
    source: {
      blocked: false,
      creation_date: '2020-11-10',
      device_id: '866795039733454',
      id: 1238,
      model: 'bce_fms500_one',
      phone: '256753132842',
      status_listing_id: null,
      tariff_end_date: '2020-11-11',
      tariff_id: 2,
    },
    tag_bindings: [],
  },
  {
    clone: true,
    group_id: 0,
    id: 6080,
    label: 'UBD 451P',
    source: {
      blocked: false,
      creation_date: '2020-09-14',
      device_id: '862522030277024',
      id: 1035,
      model: 'topfly_t8803plus',
      phone: '256707151559',
      status_listing_id: null,
      tariff_end_date: '2020-09-15',
      tariff_id: 2,
    },
    tag_bindings: [],
  },
];

let v = {
  features: [
    'branding_web',
    'branding_mobile',
    'tracking',
    'reports',
    'fleet',
    'field_service',
  ],
  master: {
    demo: false,
    first_name: 'DEUS',
    id: 1,
    last_name: 'AGABA',
    legal_name: 'Fleet Monitoring Systems ',
    legal_type: 'legal_entity',
    middle_name: '',
    title: 'Fleet Monitoring Systems ',
  },
  paas_id: 1,
  paas_settings: {
    allow_registration: false,
    app_color_theme: 'blue_2',
    app_logo: 'static/paas/1/app_logo.png',
    color_theme: 'metromorph',
    credentials: {google: [Object]},
    currency: 'UGX',
    default_map: {location: [Object], type: 'roadmap', zoom: 10},
    demo_login: 'demo',
    demo_password: 'demo',
    desktop_wallpaper: null,
    display_model_features_link: true,
    domain: 'hosting.fms-ecsinternational.com',
    favicon: 'static/paas/1/favicon.ico',
    geocoders: ['google', 'yandex', 'progorod', 'osm', 'locationiq'],
    gis_package: 'none',
    google_client_id: 'AIzaSyBJEaofJZjm-MyIlaHo5W90y78G9nzeG8c',
    has_https: false,
    lbs_providers: ['google'],
    locale: 'en_US',
    login_footer: '',
    login_wallpaper: null,
    logo: null,
    maps: [
      'roadmap',
      'satellite',
      'hybrid',
      'yandex',
      'yandex_satellite',
      'yandex_hybrid',
      'yandexpublic',
      'osm',
      'osmmapnik',
      'wikimapia',
      'cdcom',
      'doublegis',
      'bing',
      'bing_satellite',
      'bing_hybrid',
      'mailru',
      'kosmosnimki',
      'sputnik',
    ],
    monitoring_logo: 'static/paas/1/monitoring_logo.png',
    monitoring_logo_clickable: true,
    no_register_commands: false,
    payment_link: '',
    privacy_policy_link: 'https://fms-ecsafrica.com/privacy-policy-2/',
    promo_url: 'https://fms-ecsafrica.com/',
    route_providers: ['google', 'osrm'],
    service_title: 'Fleet Monitoring Systems Ltd',
    show_call_notifications: false,
    show_mobile_apps: true,
    tos: '',
    tracker_model_filter: {exclusion: true, values: [Array]},
  },
  premium_gis: false,
  privileges: {rights: []},
  success: true,
  tariff_restrictions: {
    allowed_maps: [
      'roadmap',
      'satellite',
      'hybrid',
      'yandex',
      'yandex_satellite',
      'yandex_hybrid',
      'yandexpublic',
      'osm',
      'osmmapnik',
      'wikimapia',
      'cdcom',
      'doublegis',
      'bing',
      'bing_satellite',
      'bing_hybrid',
      'mailru',
      'kosmosnimki',
      'sputnik',
    ],
  },
  user_info: {
    balance: 0,
    bonus: 0,
    creation_date: '2020-12-14 13:22:05',
    default_geocoder: 'google',
    demo: false,
    first_name: 'Test',
    id: 365,
    last_name: 'Test',
    legal_type: 'individual',
    locale: 'en_US',
    login: 'test@fms-ecsafrica.com',
    measurement_system: 'metric',
    middle_name: '',
    phone_verified: false,
    post_city: '',
    post_country: '',
    post_index: '',
    post_region: '',
    post_street_address: '',
    registered_city: '',
    registered_country: '',
    registered_index: '',
    registered_region: '',
    registered_street_address: '',
    route_provider: 'osrm',
    time_zone: 'Africa/Kampala',
    title: 'Test Test',
    verified: true,
  },
};
