// next.config.js

module.exports = {
  experimental: {
    appDir: false,
  },
  
  telemetry: false,

  exportPathMap() {
    return {
      '/': { page: '/' },
    };
  },
};
