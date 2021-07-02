module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: '5e Character Sheet',
    themeColor: '#FF5050',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestPath: 'manifest.json',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
        // swSrc is required in InjectManifest mode.
        swSrc: 'service-worker.js',
        // ...other Workbox options...
        exclude: [/_redirects/],
    }
  }
}
