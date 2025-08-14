// Copyright (c) 2025 DB-Thor<db912356847@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import type { CommonServerOptions ,HtmlTagDescriptor} from 'vite'

import { glob } from 'glob' 

export const createProxys = (proxyList = []) => {
    const proxys: CommonServerOptions['proxy'] = {}
    proxyList.forEach((item: [string, string]) => {
        const [key, value] = item
        proxys[key] = {
            target: value,
            changeOrigin: true,
            rewrite: (path: string) => path.replace(new RegExp(`^${key}`), ''),
        }
    })
    return proxys
}


export const imagePreloadTags: HtmlTagDescriptor[] = glob
    .sync('src/assets/images/**/*.{png,jpg,jpeg,gif,svg}')
    .map((img) => ({
        tag: 'link',
        injectTo: 'head',
        attrs: {
            rel: 'preload',
            as: 'image',
            href: `/${img}`,
            type: `image/${img.split('.').pop()}`,
        },
    }))