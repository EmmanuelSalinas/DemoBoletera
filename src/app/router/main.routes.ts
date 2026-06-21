
export default [
    {
        path: "list-events",
        name: "TListEvents",
        component: () => import("@/views/ticketing/TListEvents.vue"),
        /* meta: {
            requiresAuth: true,
            parentPath: "TClient",
            current: "Cliente",
        }, */
    },
    {
        path: "landing",
        name: "TLandingPage",
        component: () => import("@/views/TLandingPage.vue"),
        meta: {
            requiresAuth: true,
            parentPath: "TClient",
            current: "Cliente",
        },
    },
    {
        path: "/preview",
        name: "TPreview",
        component: () => import("@/views/preview/TPreview.vue"),
    },
    {
        path: "sale",
        name: "TTickets__sale",
        component: ()=> import("@/views/ticketing/TTickets_sale.vue"),
    },
    {
        path: "proccessSale",
        name: "TTickets_proccessSale",
        component: ()=> import("@/views/ticketing/TTickets_proccessSale.vue"),
    }

    /* --------------------------------------------------- */
    /* {
        path: "tickets-base/",
        children: TicketsRoutes,
        component: () => import("@/layout/TLayoutBlanck.vue"),
    } */
]
