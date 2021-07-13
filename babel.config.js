module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: './',
          alias: {
            '@views': './views',
            '@components': './components',
            '@assets': './assets',
          },
        },
      ],
    ],
  }
}
