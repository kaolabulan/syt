import { createApp } from 'vue'
import App from '@/App.vue'
//引入清除默认样式
import "@/style/reset.scss"
//引入全局组件
import HospitalTop from "@/components/hospital_top/index.vue"
import HospitalBottom from "@/components/hospital_bottom/index.vue"

//引入vue-router
import router from "@/router";
//引入pinia
import {createPinia} from "pinia";

const app = createApp(App)
const pinia = createPinia()
//引入顶部全局组件
app.component("HospitalTop",HospitalTop)
app.component('HospitalBottom',HospitalBottom)
//安装vue-router
app.use(router)
app.use(pinia)

//挂载
app.mount('#app')
