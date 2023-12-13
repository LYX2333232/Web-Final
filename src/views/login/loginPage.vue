<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { ref } from 'vue'
import router from '@/routers'
import { useUserStore } from '@/stores/user'
import { register } from '@/api/login'

const { login } = useUserStore()

const formData = ref({
  occupation: 'buyer',
  username: '',
  password: ''
})
const rules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const form = ref()

const isRegister = ref(false)

const handleRegister = async () => {
  // 表单校验
  form.value.validate((valid) => {
    if (!valid) {
      return
    }
  })
  const config = {
    username: formData.value.username,
    password: formData.value.password,
    occupation: formData.value.occupation
  }
  const res = await register(config)
  console.log(res)
  if (res.data.code === 200) {
    alert('注册成功')
    isRegister.value = false
  }
}
const handleLogin = async () => {
  // 表单校验
  const res = await form.value.validate()
  if (!res) {
    return
  }
  console.log(formData.value)

  // 登陆接口
  if (await login(formData.value.username, formData.value.password, formData.value.occupation)) {
    if (formData.value.occupation === 'buyer') {
      router.push('/buyer')
    } else {
      router.push('/seller')
    }
  } else {
    alert('用户名或密码错误')
  }
}
const changeRegister = () => {
  isRegister.value = !isRegister.value
}
</script>

<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="80px" class="form">
    <el-form-item>
      <el-radio v-model="formData.occupation" :label="'buyer'">买家</el-radio>
      <el-radio v-model="formData.occupation" :label="'seller'">管理员</el-radio>
    </el-form-item>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="formData.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="formData.password" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <div v-if="isRegister">
        <el-button type="primary" @click="handleRegister">注册</el-button>
        <el-button type="default" @click="changeRegister">返回</el-button>
      </div>
      <div v-else>
        <el-button type="primary" @click="handleLogin">登陆</el-button>
        <el-button type="default" @click="changeRegister">注册</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
