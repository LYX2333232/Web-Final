/* eslint-disable no-constant-condition */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
    const userid = ref()
    const nickname = ref()
    const gender = ref(null)
    const password = ref()
    const occupation = ref()
    const isLogin = ref(false)
    const login = (u, p, o) => {
        const res = axios.post('/login', {
            userid: u,
            password: p,
            occupation: o
        })
        console.log(res)
        if (true) {
            userid.value = u
            password.value = p
            occupation.value = o
            isLogin.value = true
        }
    }
    const logout = () => {
        if (true) {
            userid.value = ''
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
    return { userid, password, isLogin, login, logout, nickname, gender, updateName }
},
    {
        persist: true
    }
)

export default useUserStore