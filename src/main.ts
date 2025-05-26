import "@/assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// 引入 Pixel UI
import "@mmt817/pixel-ui/dist/index.css";

import { onPluginReady } from "./rubick/init";

const app = createApp(App);

onPluginReady(app);
app.use(createPinia());
app.use(router);

app.mount("#app");
