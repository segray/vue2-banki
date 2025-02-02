import Vue from "vue"
import "./styles/main.scss"
import App from "../App.vue"
import { createPinia } from "pinia"

const pinia = createPinia()

Vue.use(pinia)

new Vue({
    el: "#app",
    components: {
        App,
    },
    template: "<App />"
})