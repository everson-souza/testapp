module.exports = {
  "transpileDependencies": [
    "vuetify",
  ],
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://138.204.26.122:3080',
        changeOrigin: true
      },
    }
  }
}

