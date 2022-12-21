// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
module.exports = {
  //是否在保存时语法检查
  lintOnSave: false,

  // 打包配置
  // publicPath: process.env.NODE_ENV === "production" ? "/vue/" : "./",

  //基本路径
  publicPath: "./",

  //生成的文件目录
  outputDir: 'dist',

  //静态文件目录
  assetsDir: './static',

  //index主页面路径
  // indexPath: './index.html',

  // 配置全局的样式变量
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      scss: {
        //基于ass-loader10版本，全局注入scss文件，可以在文件内编写scss代码
        additionalData: `@import "@/style/variables.scss";`
       }
    }
  },


  devServer: {
    proxy: {
    }
  }
}

