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
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      exclude: [/\.map$/, /_redirects/],
    }
  }
}
