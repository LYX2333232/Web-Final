<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const { userid } = useUserStore()

const name = ref()
const gender = ref()

const visible = ref(false)
const confirmLoading = ref(false)
const form = ref()

const handleEdit = () => {
  FormData.value.name = name.value
  FormData.value.gender = gender.value
  visible.value = true
}

const rules = {
  name: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
  ]
}

const FormData = ref({
  name: '',
  gender: undefined
})
const getData = () => {
  console.log(userid)
  if (userid) {
    // TODO: 获取数据

    // 静态数据
    name.value = '小明'
    gender.value = 1
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
  if (userid) {
    // TODO: 修改数据

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