module.exports = (api) => {
  api.cache(true)

  return {
    presets: [
      ['@babel/preset-env', {
        targets: { node: '12.16' },
      }],
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
    ],
  }
}
