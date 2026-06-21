export default Object({
    namespaced: true,
    state: {
        timeRemaining: 600, // 10 minutes in seconds
        timerId: null,
    },
    getters: {
        getTimer: (state: any) => state.timeRemaining,
        getFormattedTime: (state: any) => {
            const minutes = Math.floor(state.timeRemaining / 60)
            const seconds = state.timeRemaining % 60
            return `${minutes.toString().padStart(2, "0")}:${seconds
                .toString()
                .padStart(2, "0")}`
        },
    },
    actions: {
        //@ts-ignore
        startTimer({ commit, dispatch }) {
            dispatch("resetTimer")

            // start a new tempo, these decrements value per second
            const timerId = setInterval(() => {
                dispatch("decrementTime")
            }, 1000)
            //save id tempo if want to delete
            commit("SET_TIMER_ID", timerId)
        },
        //@ts-ignore
        stopTimer({ state, commit }) {
            if (state.timerId) {
                clearInterval(state.timerId)
                commit("SET_TIMER_ID", null)
            }
        },
        //@ts-ignore
        decrementTime({ commit, state, dispatch }) {
            commit("DECREMENT_TIME")
            if (state.timeRemaining <= 0) {
                dispatch("stopTimer")
            }
        },
        //@ts-ignore
        resetTimer({ commit, dispatch }) {
            // Detiene el temporizador y resetea el tiempo restante a 10 minutos
            dispatch("stopTimer")
            commit("SET_TIME_REMAINING", 600)
        },
    },
    mutations: {
        SET_TIME_REMAINING(state: any, payload: any) {
            state.timeRemaining = payload
        },
        SET_TIMER_ID(state: any, payload: any) {
            state.timerId = payload
        },
        DECREMENT_TIME(state: any) {
            if (state.timeRemaining > 0) {
                state.timeRemaining--
            }
        },
    },
})
