//imports
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//styles
import "./scss/style.scss";

//create app
createApp(App).use(store).use(router).mount("#app");
