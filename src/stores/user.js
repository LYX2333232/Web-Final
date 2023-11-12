import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const username = ref('123')
    const password = ref('abc')
    const isBuyer = ref(false)
    const isSeller = ref(false)
    const isLogin = ref(false)
    const login = (username, password, isBuyer, isSeller) => {
        if (true) {
            localStorage.setItem('isLogin', 'true')
            localStorage.setItem('username', username)
            localStorage.setItem('password', password)
            localStorage.setItem('isBuyer', isBuyer)
            localStorage.setItem('isSeller', isSeller)
            isLogin.value = true
        }
    }
    const logout = () => {
        localStorage.clear()
    }
    onMounted(() => {
        if (localStorage.getItem('isLogin') === 'true') {
            username.value = localStorage.getItem('username')
            password.value = localStorage.getItem('password')
            isLogin.value = localStorage.getItem('isLogin') === 'true'
            isBuyer.value = localStorage.getItem('isBuyer') === 'true'
            isSeller.value = localStorage.getItem('isSeller') === 'true'
        }
    })
    return { username, password, isLogin, isSeller, isBuyer, login, logout }
})

export default useUserStore