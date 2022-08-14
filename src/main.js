//imports
import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import Notifications from '@kyvg/vue3-notification'
import ripple from '@/directives/ripple'
import { createPinia } from 'pinia'
import '@/assets/scss/style.scss'
import '@/assets/scss/tailwind.css'
import './services/fontpro'
import { autoImportComponents, initGlobalApp } from '@/globals'

import sequentialEntrance from 'vue3-sequential-entrance'
import 'vue3-sequential-entrance/vue-sequential-entrance.css'

const uiComponents = autoImportComponents()
const app = createApp(App)
const pinia = createPinia()

app.directive('ripple', ripple)

/**
 * @description if mode is development, then use devtools
 */

if (process.env.NODE_ENV === 'development') {
    app.config.devtools = true
}

/**
 * @description - import global components from src/components/global folder
 */

uiComponents
    ? uiComponents.forEach((component) => {
          app.component(
              component.default.name,
              defineAsyncComponent(() => import(`./components/global/${component.default.name}`))
          )
      })
    : console.log('No components found')

/**
 * @description - import global components from src/components/global folder
 * @param {object} app - Vue app
 * @param {object} pinia - Pinia store
 * @param {object} router - Vue router
 * @param {object} Notifications - Vue notification component
 * @returns {Element} - Vue app
 */

app.use(router).use(Notifications).use(pinia).use(sequentialEntrance).mount('#app')

/**
 * @description - initialize global initGlobalApp function from globals.js to provide global functionality
 * @param {Element} app - Vue app
 */
initGlobalApp(app)
