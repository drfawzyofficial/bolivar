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
        component: () => import('./views/ui/Feedback'),
    },
    {
        path: '/roles',
        name: 'roles',
        component: () => import('./views/ui/roles'),
    },  
    {
        path: '/clients',
        name: 'clients',
        component: () => import('./views/ui/clients'),
    },
    {
        path: '/tables',
        name: 'tables',
        component: () => import('./views/ui/tables'),
    },
    {
        path: '/classes',
        name: 'classes',
        component: () => import('./views/ui/classes'),
    },
    {
        path: '/offers',
        name: 'offers',
        component: () => import('./views/ui/Offers'),
    },
    {
        path: '/class/:className',
        name: 'class',
        component: () => import('./views/ui/class'),
    },
    {
        path: '*',
        component: () => import('./views/pages/error-404'),
    },
]