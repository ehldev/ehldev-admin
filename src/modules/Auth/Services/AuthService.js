import http from 'ehldev-admin-library/dist/plugins/axios'

export default {
    login(params) {
        return http.post('/auth/login', params)
    },
    verifyToken() {
        console.log('Verify')
    }
}