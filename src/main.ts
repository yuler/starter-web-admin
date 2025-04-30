import {isClient} from '@vueuse/core'
import {createRouter, createWebHistory} from 'vue-router'
import {routes} from 'vue-router/auto-routes'
import {setupLayouts} from 'virtual:generated-layouts'
import type {UserModule} from './types'
import App from './App.vue'

import 'uno.css'
import 'element-plus/dist/index.css'
// TODO: Dynamic import when is drak theme
// import 'element-plus/theme-chalk/dark/css-vars.css'
import './main.css'

const app = createApp(App)

// Setup routes
const router = createRouter({
  routes: setupLayouts(routes),
  history: createWebHistory(),
})
app.use(router)

// Install all modules under `modules/`
Object.values(
  import.meta.glob<{install: UserModule}>('./modules/*.ts', {
    eager: true,
  }),
).forEach(i => i.install?.({app, router, routes, isClient}))

app.mount('#app')
