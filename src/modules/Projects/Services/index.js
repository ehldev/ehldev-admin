import http from 'ehldev-admin-library/dist/plugins/axios'

export default {
    list(params) {
        return http.get('/projects', { params })
    },
    get(slug) {
        return http.get(`/projects/${slug}`)
    },
    save(params) {
        return http.post('/projects', params)
    },
    deleteItem(id) {
        return http.delete(`/projects/${id}`)
    }
}