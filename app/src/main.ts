import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/index.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import mitt from 'mitt';
type Events = {
    foo : string;
    bar?: number;
}

const emitter = mitt<Events>();
const app = createApp(App)

app.config.globalProperties.emitter = emitter;

app.use(store).use(ElementPlus).use(router).mount('#app')
