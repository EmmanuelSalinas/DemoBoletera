import MainRoutes from "./main.routes"

const HOME_PAGE_PATH = "/home"

export default [
    {
        path: "/",
        name: "THome",
        redirect: "/system/landing",
    },
    /* {
        path: "/domainContentProtected",
        name: "TDomainContentProtected",
        component: () => import("@/layout/TDomainContentProtected.vue"),
    }, */
    {
        path: "/system",
        children: MainRoutes,
        component: () => import("@/layout/TLayoutMain.vue"),
    }
]
