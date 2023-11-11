<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../../stores/user'

const { login } = useUserStore()

const formData = ref({
    username: '',
    password: ''
})
const rules = ref({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
})

const isBuyer = ref(true)

const handleLogin = () => {
    login(formData.value.username, formData.value.password, isBuyer.value, !isBuyer.value)
}
</script>

<template>
    <div v-if="isBuyer">用户登陆</div>
    <div v-else>管理员登陆</div>
    <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="formData.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleLogin">登陆</el-button>
        </el-form-item>
    </el-form>
</template>