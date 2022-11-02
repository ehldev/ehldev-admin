import http from '@/plugins/axios'

export default {
    list() {
        return http.get('/projects')
    }
}