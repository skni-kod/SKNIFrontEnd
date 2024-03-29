module.exports = {
  productionSourceMap: false,
  chainWebpack(config) {
    config.plugins.delete('prefetch');

    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]',
      });
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // production options
      ;
    } else {
      devtool: 'source-map';
    }
  },
};
