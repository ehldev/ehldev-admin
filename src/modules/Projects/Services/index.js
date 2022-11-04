import http from '@/plugins/axios'

export default {
    list(params) {
        return http.get('/projects', { params })
    }
}