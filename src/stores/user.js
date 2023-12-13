/* eslint-disable no-constant-condition */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore(
  'user',
  () => {
    const userId = ref(-1)
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
        userId.value = res.data.data.id
        occupation.value = o
        isLogin.value = true
        return true
      } else {
        console.log('login failed')
        isLogin.value = false
        return false
      }
    }
    const logout = () => {
      if (true) {
        userId.value = ''
        occupation.value = ''
        console.log('logout')
      }
    }
    return { userId, isLogin, login, logout }
  },
  {
    persist: true
  }
)

export default useUserStore
