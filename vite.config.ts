import path from 'node:path'
import {defineConfig, splitVendorChunkPlugin, loadEnv} from 'vite'
import visualizer from 'rollup-plugin-visualizer'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import {VueRouterAutoImports} from 'unplugin-vue-router'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import Inspect from 'vite-plugin-inspect'

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    define: {
      // https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags
      __VUE_OPTIONS_API__: false,
    },
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    plugins: [
      process.env.VISUALIZER &&
        visualizer({
          filename: './node_modules/.cache/visualizer/stats.html',
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),

      splitVendorChunkPlugin(),

      VueRouter(),

      Vue({
        include: [/\.vue$/, /\.md$/],
      }),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        dirs: ['src/composables', 'src/store', 'src/helpers'],
        imports: [
          'vue',
          VueRouterAutoImports,
          'vue/macros',
          '@vueuse/head',
          '@vueuse/core',
          'pinia',
        ],
        dts: 'src/auto-imports.d.ts',
        vueTemplate: true,
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        dirs: 'src/**/components',
        resolvers: [
          IconsResolver({
            prefix: 'icon',
          }),
          ElementPlusResolver({
            importStyle: 'css',
          }),
        ],
        extensions: ['vue', 'md', 'ts'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: 'src/components.d.ts',
      }),

      // https://github.com/antfu/unplugin-icons
      Icons({
        compiler: 'vue3',
        autoInstall: true,
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss(),

      // https://github.com/antfu/vite-plugin-inspect
      // Visit http://localhost:3333/__inspect/ to see the inspector
      Inspect(),
    ],

    server: {
      proxy: {
        '^/api': {
          target: env.VITE_API_ROOT,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
