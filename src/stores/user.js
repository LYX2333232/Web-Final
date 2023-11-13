import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const username = ref('123')
    const password = ref('abc')
    const isBuyer = ref(false)
    const isSeller = ref(false)
    const isLogin = ref(false)
    const login = (u, p, b, s) => {
        if (true) {
            username.value = u
            password.value = p
            isBuyer.value = b
            isSeller.value = s
            isLogin.value = true

        }
    }
    const logout = () => {
        if (true) {
            username.value = ''
            password.value = ''
            isBuyer.value = false
            isSeller.value = false
            isLogin.value = false
        }
    }
    return { username, password, isLogin, isSeller, isBuyer, login, logout }
},
    {
        persist: true
    }
)

export default useUserStore