import Vue from 'vue'
import Router from 'vue-router'
import AppLayout from '../components/admin/AppLayout'
import AuthLayout from '../components/auth/AuthLayout'
import lazyLoading from './lazyLoading'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '*',
            redirect: { name: 'login' },
        }, {
            name: 'Admin',
            path: '/admin',
            component: AppLayout,
            children: [{
                    name: 'dashboard',
                    path: 'dashboard',
                    component: lazyLoading('dashboard/Dashboard'),
                    default: true,
                },
                {
                    path: '/app/:id',
                    props: true,
                    component: lazyLoading('dashboard/AppStats')
                }
            ]
        },
        {
            path: '/auth',
            component: AuthLayout,
            children: [{
                name: 'login',
                path: 'login',
                component: lazyLoading('auth/login/Login'),
            }],
        },
    ],
})