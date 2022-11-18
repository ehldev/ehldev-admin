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
        },
        LOGOUT(state) {
            Cookies.remove(process.env.VUE_APP_COOKIE_NAME)
            state.user = null
        }
    },
    actions: {
        async verifyToken() {
            let response = await AuthService.getUserData()
            
            return response.data.user
        }
    },
    getters: {
        getAuthToken() {
            return Cookies.get(process.env.VUE_APP_COOKIE_NAME)
        },
        getCurrentUser(state) {
            return state.user
        }
    }
}