import { defineConfig, loadEnv } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import styleImport from 'vite-plugin-style-import';
import legacy from '@vitejs/plugin-legacy';
import copy from 'rollup-plugin-copy';
import { eslint } from 'rollup-plugin-eslint';
import { injectHtml, minifyHtml } from 'vite-plugin-html';
import path from 'path';
import antdTheme from './theme';
// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    base: '/',
    publicDir: 'public',
    // mode: 'development' for serve, 'production' for build
    build: {
      target: ['es2015', 'edge16', 'firefox60', 'chrome61', 'safari11'],
      chunkSizeWarningLimit: 1024, // 默认500k
      rollupOptions: {
        output: {
          // sourcemap: true
          manualChunks: {
            // 拆分公共包，拆分后总体积会变大，单个变小
            react: ['react'],
            antd: ['antd']
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: antdTheme
        },
        scss: {
          // 自动导入全局样式
          additionalData: `
            @import '@/styles/mixin.scss';
            @import '@/styles/variable.scss';
          `
        }
      }
    },
    server: {
      port: Number(loadEnv(mode, process.cwd()).VITE_DEV_PORT)
      // proxy: {
      //   '/api': {
      //     target: 'http://192.168.138.XX:XXXX',
      //     changeOrigin: true,
      //     // rewrite: (path) => path.replace(/^\/api/, ''),
      //   }
      // }
    },
    optimizeDeps: {
      include: [
         
      ]
    },
    plugins: [
      legacy({
        polyfills: ['es.promise.finally', 'es/map', 'es/set'],
        modernPolyfills: ['es.promise.finally']
      }),
      {
        ...eslint({
          throwOnError: true,
          throwOnWarning: false,
          include: 'src/**/*.+(js|jsx|ts|tsx)',
          exclude: ['node_modules/**']
        }),
        enforce: 'pre'
      },
      styleImport({
        libs: [
          // {
          //   libraryName: 'ant-design-vue',
          //   esModule: true,
          //   resolveStyle: (name) => {
          //     return `ant-design-vue/es/${name}/style/index`;
          //   },
          // },
          {
            libraryName: 'antd',
            esModule: true,
            resolveStyle: (name) => {
              return `antd/es/${name}/style/index`;
            }
          }
          // {
          //   libraryName: 'element-plus',
          //   resolveStyle: (name) => {
          //     return `element-plus/lib/theme-chalk/${name}.css`;
          //   },
          //   resolveComponent: (name) => {
          //     return `element-plus/lib/${name}`;
          //   },
          // }
        ]
      }),
      // https://cnpmjs.org/package/rollup-plugin-copy
      copy({
        targets: [
          { src: ['static/**/*'], dest: 'dist/static' }
        ],
        hook: 'writeBundle',
        flatten: false 
      }),
      minifyHtml(),
      injectHtml({
        injectData: {
          title: 'react'
        }
      }),
      reactRefresh()
    ]
  })
}
