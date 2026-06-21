import routes from "./homeRoutes"
import { createRouter, createWebHistory } from "vue-router"
/* import store from '@/app/storage'; */
const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL),
})

router.beforeEach(async(to, from, next) => {
    return next()
})

export default router
