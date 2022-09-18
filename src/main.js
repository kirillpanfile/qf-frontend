//imports
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import Notifications from "@kyvg/vue3-notification"
import { createPinia } from "pinia"
import "./App.css"
import "./services/fontpro"
import VWave from "v-wave"
import sequentialEntrance from "vue3-sequential-entrance"
import "vue3-sequential-entrance/vue-sequential-entrance.css"

import { initComponents } from "./globals"

const app = createApp(App)

initComponents(app)

if (process.env.NODE_ENV === "development") {
    app.config.devtools = true
}

app.use(router).use(createPinia()).use(VWave).use(Notifications).use(sequentialEntrance).mount("#app")
