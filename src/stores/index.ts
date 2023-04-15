import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// pinia persist
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
