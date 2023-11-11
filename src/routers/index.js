import {createRouter,createWebHistory} from 'vue-router'
import useUserStore from '@/stores/user.js'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/home/homePage.vue')
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

router.beforeEach((to,from,next) => {
    const userStore = useUserStore()
    if(to.name !== 'Login' && !userStore.isLogin){
        next({name: 'Login'})
    }else{
        next()
    }
})


export default router