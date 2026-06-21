import ability from "@/app/services/ability"
export default Object({
    namespaced: true,
    state: Object({
        token: String(),
        userData: Object() as any,
        hasBonoGallo: Boolean(),
        isOpenAsideMenu: false,
    }) as any,

    getters: Object({
        token: function (state: any) {
            return state.token
        },
        userData: function (state: any) {
            return state.userData
        },
        getHasBonoGallo: function (state: any) {
            return state.hasBonoGallo
        },
        getIsOpenAsideMenu: function (state: any) {
            return state.isOpenAsideMenu
        },
    }),
    actions: Object({
        useDataUser: function (contex: any, data: any) {
            return contex.commit("setData", data)
        },
        activeBonoGalloSection: function (contex: any, data: any) {
            return contex.commit("updateHasBonogallo")
        },
        logout: function (contex: any) {
            return contex.commit("deleteCredentials")
        },
        resetPassword: function (contex: any) {
            return contex.commit("setResetPassword")
        },
        async changeIsOpenAsideMenu({ commit }: any, params: any) {
            commit("setIsOpenAsideMenu", params)
        },
    }),
    mutations: Object({
        setData: function (state: any, data: any) {
            state.token = data.token
            state.userData = data.userdata[0]
            state.hasBonoGallo = data.userdata[0].hasBonoGallo
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('auth_userData', JSON.stringify(data.userdata[0]));

        },
        updateHasBonogallo: function (state: any, data: any) {
            state.hasBonoGallo = true
        },
        setResetPassword: function (state: any) {
            state.userData.forcedPasswordReset = true
        },
        deleteCredentials: function (state: any) {
            state.token = ""
            state.userData = Object()
            ability.update([])
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_userData');
        },
        setIsOpenAsideMenu(state: any, value: any) {
            state.isOpenAsideMenu = value
        },
    }),
})
