import VueSweetalert2 from "vue-sweetalert2" // sweet alert
import "sweetalert2/dist/sweetalert2.min.css" // sweet alert
//import store from "@/app/storage" //esto es ele store
import router from "@/app/router" //esto es ele router
import { createApp } from 'vue'
import "@/assets/styles/__colorimetry.css" // Estilos generales
import "@/assets/styles/__normalize.css" // Estilos generales
import "@/assets/styles/__font-style.css" // Estilos generales
import "@/assets/styles/__attributes.css" // Estilos generales
import "@/assets/styles/style.css" // Estilos generales
import TDisplayer from "@/TDisplayer.vue"
const HTML_ELEMENT_CONTAINER = "#application"
const application = createApp(TDisplayer)
//application.use(store)
application.use(router)
application.use(VueSweetalert2)
application.mount(HTML_ELEMENT_CONTAINER)

