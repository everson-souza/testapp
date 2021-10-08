module.exports = {
  "transpileDependencies": [
    "vuetify",
  ],
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://qab01.weblakes.com:3080',
        changeOrigin: true
      }      
    },
    disableHostCheck: true    
  }
}

