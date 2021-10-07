module.exports = {
  "transpileDependencies": [
    "vuetify",
  ],
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost',
        changeOrigin: true
      }      
    },
    disableHostCheck: true    
  }
}

