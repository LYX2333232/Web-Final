import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', () => {
    const username = ref('123')
    const password = ref('abc')
    const isLogin = ref(false)
    const login = (username,password) => {
        console.log('login')
        this.username.value = username   
        this.password.value = password
        this.isLogin.value = true
    }
    const logout = () => {
        console.log('logout')
        this.username.value = ''
        this.password.value = ''
        this.isLogin.value = false
    }
    return {username, password, login, logout, isLogin}
})

export default useUserStore