/**
 * Webpack supports code-splitting via () => import(...)
 * You can use it here, and create a separate router config file
 * without it for SSR.
 */

import Router from 'svelte-easyroute'
import PageOne from '../components/PageOne.svelte'
import PageTwo from '../components/PageTwo.svelte'

const routes = [
    {
        path: '/',
        component: PageOne
    },
    {
        path: '/page-two',
        component: PageTwo
    }
]

const router = new Router({
    mode: 'history',
    routes
})

export default router