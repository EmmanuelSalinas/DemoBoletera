/* @ts-ignore */
import { createStore } from "vuex"
import session from "./session"
import timerPurchase from "./timerPurchase"
import VuexPersistence from "vuex-persist"
const dataState = new VuexPersistence({
    modules: ["session", "purchaseSeats", "timerPurchase", "fanSession"],
    storage: window.sessionStorage,
})

export default createStore({
    modules: Object({ session, timerPurchase }),
    plugins: [dataState.plugin],
})
