<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { getInfo, changeUsername } from '@/api/seller/infoPage'

const { userId } = useUserStore()

const name = ref()

const visible = ref(false)
const confirmLoading = ref(false)
const form = ref()

const handleEdit = () => {
  FormData.value.name = name.value
  visible.value = true
}

const rules = {
  name: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
  ]
}

const FormData = ref({
  name: ''
})
const getData = async () => {
  console.log(userId)
  if (userId) {
    const res = await getInfo(userId)
    console.log(res)
    if (res.data.code === 200) {
      name.value = res.data.data.username
    }
  }
}
const handleCancel = () => {
  visible.value = false
  form.value.resetFields()
}
const handleOk = async () => {
  // 表单校验
  const res = await form.value.validate()
  if (!res) {
    return
  }
  console.log(FormData.value)
  confirmLoading.value = true
  // 上传数据
  if (userId) {
    // TODO: 修改数据
    const data = {
      id: userId,
      username: FormData.value.name
    }
    const res = await changeUsername(data)
    console.log(res)
    if (res.data.code === 200) {
      ElMessage.success('修改成功')
    } else {
      ElMessage.error('修改失败')
    }
  }
  confirmLoading.value = false
  visible.value = false
  form.value.resetFields()
  getData()
}

onMounted(() => {
  getData()
})
</script>

<template>
  <el-card>
    <template #header>
      <div class="flex justify-between">
        <span class="text-3xl">商家信息</span>
        <el-button type="primary" @click="handleEdit">修改信息</el-button>
      </div>
    </template>
    <el-descriptions :column="1" border>
      <el-descriptions-item label="商家昵称">{{ name }}</el-descriptions-item>
    </el-descriptions>
  </el-card>
  <el-dialog title="修改信息" width="600px" v-model="visible">
    <el-form ref="form" :model="FormData" :rules="rules" label-width="100px">
      <el-form-item label="商家昵称" prop="name">
        <el-input v-model="FormData.name" placeholder="请输入昵称" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleOk" :loading="confirmLoading">确 定</el-button>
    </template>
  </el-dialog>
</template>
