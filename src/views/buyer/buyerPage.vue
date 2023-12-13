<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import router from '@/routers'
import { changePassword } from '@/api/buyer/password'

const { userId, logout } = useUserStore()

const visible = ref(false)

const form = ref()
// 修改密码表单
const formData = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
// 表单校验规则
const rules = ref({
  oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === formData.value.oldPassword) {
          callback(new Error('新密码不能与旧密码相同'))
        } else {
          callback()
        }
      }
    }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formData.value.newPassword) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      }
    }
  ]
})

const quit = () => {
  console.log('退出')
  logout()
  router.push('/login')
}

const handleOk = async () => {
  const res = await form.value.validate()
  if (!res) {
    return
  }
  const data = {
    id: userId,
    oldPassword: formData.value.oldPassword,
    newPassword: formData.value.newPassword
  }
  console.log(data)
  const res2 = await changePassword(data)
  console.log(res2)

  if (res2.data.code === 200) {
    ElMessage.success(res2.data.msg)
  }
  if (res2.data.code === 400) {
    ElMessage.error(res2.data.msg)
    return
  }
  form.value.resetFields()
  visible.value = false
}
const handleCancel = () => {
  console.log('取消')
  form.value.resetFields()
  visible.value = false
}
</script>

<template>
  <el-container>
    <el-aside>
      <el-menu router>
        <el-menu-item index="/buyer/main">主页</el-menu-item>
        <el-menu-item index="/buyer/cart">购物车</el-menu-item>
        <el-sub-menu>
          <template #title>
            <span>个人信息</span>
          </template>
          <el-menu-item index="/buyer/info">个人昵称</el-menu-item>
          <el-menu-item @click="visible = true">修改密码</el-menu-item>
        </el-sub-menu>
        <el-menu-item @click="quit">退出登陆</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main class="h-220">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
  <el-dialog title="修改账号密码" width="600px" v-model="visible">
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input v-model="formData.oldPassword" type="password" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="formData.newPassword" type="password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="formData.confirmPassword" type="password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
    </template>
  </el-dialog>
</template>
