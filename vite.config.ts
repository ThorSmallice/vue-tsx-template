import {
  defineConfig,
  loadEnv,
  type ConfigEnv,
  type UserConfig
} from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'
import { createProxys, imagePreloadTags } from './src/tools/vite-config'


// https://vite.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
    // 加载环境变量
    const env = loadEnv(mode, process.cwd(), ['APP_', 'VITE_'])
    const { APP_BASE_URL, APP_PORT, VITE_PROXYS: viteProxysStr } = env

    // 扫描图片并生成preload标签配置

    // 构建要暴露的环境变量

    return defineConfig({
        base: APP_BASE_URL || './',
        envPrefix: ['VITE_', 'APP_'],
        plugins: [
            vue(),
            vueJsx(),

            createHtmlPlugin({
                inject: {
                    tags: [...imagePreloadTags],
                },
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        server: {
            host: '0.0.0.0',
            port: Number(APP_PORT) || 3000,
            proxy: {
                ...createProxys(JSON.parse(viteProxysStr)),
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    silenceDeprecations: ['legacy-js-api'],
                },
            },
        },
    })
}
