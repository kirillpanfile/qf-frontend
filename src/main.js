//imports
import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Notifications from '@kyvg/vue3-notification'
import VWave from 'v-wave'

//styles
import './scss/style.scss'

//Auto Import Script
import autoImportComponents from './utils/import'
const uiComponents = autoImportComponents()

//create Vue app
const app = createApp(App)

//if node env is development, then use devtools
if (process.env.NODE_ENV === 'development') {
    app.config.devtools = true
}

//! IMPORTS ONLY FROM src/components/UI
uiComponents
    ? uiComponents.forEach((component) => {
          //import component asynchronously
          app.component(
              component.default.name,
              defineAsyncComponent(() => import(`./components/UI/${component.default.name}`))
          )
      })
    : console.log('No components found')

//If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.
//This is because the compiler will automatically generate a wrapper component for the custom element.
//If you want to use the custom element as a component, you need to explicitly import it.

//create app
app.use(store).use(router).use(Notifications).use(VWave).mount('#app')
