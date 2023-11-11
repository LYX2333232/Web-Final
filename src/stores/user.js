import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const username = ref('123')
    const password = ref('abc')
    const isBuyer = ref(false)
    const isSeller = ref(false)
    const isLogin = ref(false)
    const login = (username, password, isBuyer, isSeller) => {
        console.log('login')
        this.username.value = username
        this.password.value = password
        this.isLogin.value = true
        this.isBuyer.value = isBuyer
        this.isSeller.value = isSeller
    }
    const logout = () => {
        console.log('logout')
        this.username.value = ''
        this.password.value = ''
        this.isLogin.value = false
        this.isBuyer.value = false
        this.isSeller.value = false
        localStorage.clear()
    }
    return { username, password, isLogin, isSeller, isBuyer, login, logout }
})

export default useUserStore