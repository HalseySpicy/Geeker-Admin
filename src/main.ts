import { createApp } from "vue";
import App from "./App.vue";
// reset style sheet
import "@/styles/reset.scss";
// CSS common style sheet
import "@/styles/common.scss";
// iconfont css
import "@/assets/iconfont/iconfont.css";
// element plus
import ElementPlus from "element-plus";
// Element icons
import * as Icons from "@element-plus/icons-vue";
// element css(如果使用了CDN，不需要引入css)
import "element-plus/dist/index.css";
// vue Router
import router from "@/router/index";
// pinia store
import { createPinia } from "pinia";
// pinia persist
import piniaPersist from "pinia-plugin-persist";

const app = createApp(App);

// cerate Pinia
const pinia = createPinia();
pinia.use(piniaPersist);

// 注册element Icons组件
Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(router).use(pinia).use(ElementPlus).mount("#app");
