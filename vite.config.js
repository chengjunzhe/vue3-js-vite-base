import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
// import legacy from '@vitejs/plugin-legacy'//兼容传统浏览器
import vueJsx from '@vitejs/plugin-vue-jsx' //vue-jsx
import externalGlobals from 'rollup-plugin-external-globals' //cdn
import viteCompression from 'vite-plugin-compression' //gzip压缩
import html from 'vite-plugin-html' //html模板控制

// 解析绝对路径方法
const resolvePath = (p) => resolve(__dirname, p)

// 获取环境变量方法
const getEnvConfig = (mode) => require(resolvePath(`./src/config/${mode}.js`))

export default defineConfig(async ({ command, mode }) => {
  const envConfig = await getEnvConfig(mode)
  return {
    base: './',
    plugins: [
      vue(),
      //vue-jsx
      vueJsx(),
      //html模板控制
      html({
        minify: true,
        inject: {
          data: {
            title: envConfig.title
          }
        }
      }),
      // gzip压缩
      viteCompression({
        //生成压缩包gz
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      })
      //兼容传统浏览器
      // legacy({ targets: ['defaults', 'not IE 11'] })
    ],
    // 服务
    server: {
      open: true,
      port: 3003,
      // 代理配置
      proxy: {
        '/apis': {
          target: 'http://101.200.76.112/', //代理接口
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/apis/, '')
        }
      }
    },
    // 打包
    build: {
      // 打包后目录,默认dist
      outDir: 'dist',
      // 拆分css文件
      cssCodeSplit: false,
      minify: 'terser', // 混淆器，terser构建后文件体积更小
      // terser配置
      terserOptions: {
        compress: {
          keep_infinity: true, //保持infinity
          drop_console: true //取消console
        }
      },
      brotliSize: false, //打包时不计算包大小
      // rollup配置
      rollupOptions: {
        // 配置cdn
        external: ['vue'],
        plugins: [
          externalGlobals({
            vue: 'Vue'
          })
        ]
        // // 输出文件
        // output: {
        //   chunkFileNames: 'static/js/[name]-[hash].js',
        //   entryFileNames: 'static/js/[name]-[hash].js'
        //   // assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        // }
      }
    },
    resolve: {
      alias: {
        '@': resolvePath('./src/')
      }
    }
  }
})
