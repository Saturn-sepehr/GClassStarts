'use strict';

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'gclass-tests-ember',
    environment,
    // GitHub Pages serves this repo at github.io/GClassStarts/, and Pages has
    // no server-side rewrites - so the app is mounted under its own sub-path
    // and routes with the hash, not the history API.
    rootURL: '/GClassStarts/ember/',
    locationType: 'hash',
    EmberENV: {
      EXTEND_PROTOTYPES: false,
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};