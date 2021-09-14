module.exports = {
    publicPath:'/miaomiao',
    configureWebpack: {
      externals: {
        'BMap': 'BMap' // 百度地图配置
      }
    },

    devServer : {
      proxy : {
        '/api' : {
          target : 'http://localhost:3000',
          changeOrigin : true
        }
      }
    }
}