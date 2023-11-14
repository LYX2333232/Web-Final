import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const username = ref('123')
    const nickname = ref('lyx')
    const gender = ref(null)
    const addressInfo = ref([])
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

            const address = [
                {
                    name: 'lyx',
                    phone: '123456789',
                    address: '123'
                },
                {
                    name: 'lyx',
                    phone: '123456789',
                    address: '123'
                }
            ]
            // update()
            update('lyx', 0, address)
        }
    }
    const logout = () => {
        if (true) {
            username.value = ''
            password.value = ''
            isBuyer.value = false
            isSeller.value = false
            isLogin.value = false
            addressInfo.value = []
            update('', '', [])
        }
    }
    const updateName = (name) => {
        // 从后台更新数据
        console.log('updateName')
        nickname.value = name
    }
    const updateGender = (sex) => {
        // 从后台更新数据
        console.log('updateGender')
        gender.value = sex
    }
    const updateAddress = (a) => {
        // 从后台更新数据
        addressInfo.value = []
        //判断a是否为数组
        if (a instanceof Array) {
            addressInfo.value = a
        } else {
            addressInfo.value.push(a)
        }
    }
    const update = (name, sex, a) => {
        if (true) {
            updateName(name)
            updateGender(sex)
            updateAddress(a)
        }
    }
    return { username, password, isLogin, isSeller, isBuyer, login, logout, nickname, gender, addressInfo, update, updateName, updateGender, updateAddress }
},
    {
        persist: true
    }
)

export default useUserStore