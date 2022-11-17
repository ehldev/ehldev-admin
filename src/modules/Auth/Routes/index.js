import AuthView from '../AuthView'
import LoginPage from '../Pages/LoginPage'

const routes = [
    {
        path: '/auth',
        component: AuthView,
        children: [
            {
                path: 'login',
                name: 'login',
                component: LoginPage
            }
        ]
    }
]

export default routes