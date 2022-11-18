import Cookies from 'js-cookie'

import AuthService from '@/modules/Auth/Services/AuthService'

export default {
    namespaced: true,
    state: () => ({
        user: null
    }),
    mutations: {
        SET_USER(state, data) {
            state.user = data
        },
        SET_SESSION(state, token) {
            Cookies.set(process.env.VUE_APP_COOKIE_NAME, token, { expires: 7 })
        }
    },
    actions: {
        async verifyToken() {
            let response = await AuthService.verifyToken()
            console.log(response)
        }
    },
    getters: {
        getAuthToken() {
            return Cookies.get(process.env.VUE_APP_COOKIE_NAME)
        }
    }
}