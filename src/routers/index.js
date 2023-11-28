import { createRouter, createWebHistory } from 'vue-router'
import useUserStore from '@/stores/user.js'

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: '/login',
        children: [
            {
                path: 'buyer',
                name: 'buyer',
                redirect: '/buyer/main',
                component: () => import('@/views/buyer/buyerPage.vue'),
                children: [
                    {
                        path: 'main',
                        name: 'buyerMain',
                        component: () => import('@/views/buyer/main/mainPage.vue')
                    },
                    {
                        path: 'cart',
                        name: 'buyerCart',
                        component: () => import('@/views/buyer/cart/cartPage.vue')
                    },
                    {
                        path: 'detail',
                        name: 'buyerDetail',
                        component: () => import('@/views/buyer/detailPage.vue')
                    },
                    {
                        path: 'info',
                        name: 'buyerInfo',
                        component: () => import('@/views/buyer/info/namePage.vue')
                    },
                    {
                        path: 'address',
                        name: 'buyerAddress',
                        component: () => import('@/views/buyer/info/addressPage.vue')
                    }
                ]
            },
            {
                path: 'seller',
                name: 'seller',
                redirect: '/seller/list',
                component: () => import('@/views/seller/sellerPage.vue'),
                children: [
                    {
                        path: 'list',
                        name: 'sellerList',
                        component: () => import('@/views/seller/list/listPage.vue')
                    },
                    {
                        path: 'table',
                        name: 'sellerTable',
                        component: () => import('@/views/seller/table/tablePage.vue')
                    },
                    {
                        path: 'browse',
                        name: 'sellerBrowse',
                        component: () => import('@/views/seller/browse/browsePage.vue')
                    },
                    {
                        path: 'buy',
                        name: 'sellerBuy',
                        component: () => import('@/views/seller/buy/buyPage.vue')
                    },
                    {
                        path: 'info',
                        name: 'sellerInfo',
                        component: () => import('@/views/seller/info/infoPage.vue')
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/loginPage.vue')
    }
]

const router = createRouter({
    // eslint-disable-next-line no-undef
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    if (to.name !== 'Login' && !userStore.isLogin) {
        console.log(userStore.isLogin)
        next({ name: 'Login' })
    } else {
        next()
    }
})


export default router