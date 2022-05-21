module.exports = {
  outputDir: './build',
  devServer: {
    proxy: {
      '/api': {
         target: 'http://localhost:8101',
        //target: 'http://124.71.223.181:7222',
        pathRewrite: {
          '^/api': '',
        },
        secure: false,
        changeOrigin: true,
      },
      '/myApi': {
        target: 'http://124.71.223.181:7222',
        // target: 'http://localhost:8101',
        pathRewrite: {
          '^/myApi': '',
        },
        secure: false,
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
        assets: '@/assets',
      },
    },
  },
};
