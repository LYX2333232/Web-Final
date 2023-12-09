/* eslint-disable no-constant-condition */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
    const userId = ref('')
    const nickname = ref('')
    const gender = ref(null)
    const password = ref('')
    const occupation = ref('')
    const isLogin = ref(false)
    const login = async (u, p, o) => {
        const res = await axios.post('/api/login', {
            username: u,
            password: p,
            occupation: o
        })
        console.log(res.data)
        if (res.data.code == 200) {
            userId.value = u
            password.value = p
            occupation.value = o
            isLogin.value = true
            return true
        }
        else {
            console.log('login failed')
            isLogin.value = false
            return false
        }
    }
    const logout = () => {
        if (true) {
            userId.value = ''
            password.value = ''
            isLogin.value = false
            nickname.value = ''
            gender.value = null
            occupation.value = ''
            console.log('logout')
        }
    }
    const updateName = (name) => {
        // 从后台更新数据
        console.log('updateName')
        nickname.value = name
    }
    return { userId, password, isLogin, login, logout, nickname, gender, updateName }
},
    {
        persist: true
    }
)

export default useUserStore