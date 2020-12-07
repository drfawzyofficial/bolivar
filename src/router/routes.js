export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('./views/account/login'),
    },
    {
        path: '/',
        name: 'home',
        component: () => import('./views/home'),
    },
    {
        path: '/feedback',
        name: 'feedback',
        component: () => import('./views/ui/rating'),
    },
    {
        path: '/roles',
        name: 'roles',
        component: () => import('./views/ui/ratingT'),
    },
    {
        path: '/clients',
        name: 'clients',
        component: () => import('./views/ui/clients'),
    },
    {
        path: '/tables',
        name: 'tables',
        component: () => import('./views/ui/clients'),
    },
    {
        path: '*',
        component: () => import('./views/pages/error-404'),
    },
]