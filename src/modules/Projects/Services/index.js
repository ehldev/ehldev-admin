import http from '@/plugins/axios'

export default {
    list(params) {
        return http.get('/projects', { params })
    },
    save(params) {
        return http.post('/projects', params)
    }
}