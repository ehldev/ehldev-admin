module.exports = {
  css: {
    extract: false,
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/_variables.scss";',
        // prependData: '@import "~ehldev-admin-library/dist/styles/_variables.scss";'
      },
    },
  },
};
