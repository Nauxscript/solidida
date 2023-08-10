import path from 'path'
import { defineConfig } from 'vite'
import Solid from 'solid-start/vite'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
// @ts-expect-error - missing types
import vercelAdapter from 'solid-start-vercel'
// import staticAdapter from 'solid-start-static'

export default defineConfig({
  test: {
    deps: {
      registerNodeLoader: true,
      inline: [/solid-js/],
    },
    // https://github.com/capricorn86/happy-dom/issues/994
    environment: 'happy-dom',
    // environment: 'jsdom',
    globals: true,
    setupFiles: ['node_modules/@testing-library/jest-dom/extend-expect', './setupVitest.js'],
    transformMode: { web: [/\.[jt]sx?$/] },
    // css: true,
  },
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`,
    },
    conditions: ['development', 'browser'],
  },
  plugins: [
    Solid({
      adapter: vercelAdapter(),
      ssr: false,
    }),
    UnoCSS({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true,
        }),
      ],
      shortcuts: {
        'flex-col-box': 'flex flex-col',
        'flex-both-center': 'flex items-center justify-center',
      },
      rules: [
        ['dialog-shadow', {
          'box-shadow': 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.2) 0px 5px 18px 0px',
        }],
        ['unset', { all: 'unset' }],
      ],
      safelist: [
        // dynamic icon
        'i-carbon-calendar',
        'i-carbon-sunrise',
        'i-carbon-recently-viewed',
        'i-carbon-user-role',
        'i-carbon-archive',
        'i-carbon-checkmark-outline',
        'i-carbon-sunrise',
        'i-carbon-close-outline',
        'i-carbon-trash-can',
        'i-carbon-menu',
        'i-carbon-tag',

        // dynamic style
        'text-dark',
        'text-gray',
      ],
    }),
    AutoImport({
      imports: ['solid-js', 'solid-app-router'],
      dts: './src/auto-imports.d.ts',
      // resolvers: [
      //   IconsResolver({
      //     componentPrefix: 'Icon',
      //   }),
      // ],
    }),
  ],
})
