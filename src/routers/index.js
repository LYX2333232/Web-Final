import { createRouter, createWebHistory } from 'vue-router'
import useUserStore from '@/stores/user.js'

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: '/buyer/main',
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
                        path: 'info',
                        name: 'buyerInfo',
                        component: () => import('@/views/buyer/info/infoPage.vue')
                    },
                    {
                        path: 'detail',
                        name: 'buyerDetail',
                        component: () => import('@/views/buyer/detailPage.vue')
                    }
                ]
            },
            {
                path: 'seller',
                name: 'seller',
                component: () => import('@/views/seller/sellerPage.vue')
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