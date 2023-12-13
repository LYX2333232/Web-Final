<script setup>
import router from '@/routers'
import { ref } from 'vue'
import { addGood } from '@/api/seller/listPage'
import { useUserStore } from '@/stores/user'

const { userId } = useUserStore()

const handleAdd = () => {
  form.value.validate(async (valid) => {
    if (!valid) {
      return
    }
    const params = {
      sellerId: userId,
      name: FormData.value.name,
      image: FormData.value.image,
      price: FormData.value.price,
      desc: FormData.value.desc
    }
    const res = await addGood(params)
    if (res.data.code !== 200) {
      ElMessage.error('新增商品信息失败')
      return
    }
    ElMessage.success('新增商品信息成功')
    router.push('/seller/list')
  })
}

const form = ref()
const FormData = ref({
  name: undefined,
  image: undefined
})

const rules = {
  name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
  image: [{ required: true, message: '请上传商品图片', trigger: 'change' }],
  price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }]
}
const handleImageChange = (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    console.log(reader.result)
    FormData.value.image = reader.result
  }
}
</script>

<template>
  <el-card>
    <template #header>
      <div class="flex justify-between">
        <span>新增商品信息</span>
        <span>
          <el-button type="info" @click="router.push('/seller/list')">返回</el-button>
          <el-button type="primary" @click="handleAdd">添加</el-button>
        </span>
      </div>
      <el-form ref="form" :model="FormData" :rules="rules" label-width="80px">
        <el-form-item label="商品名称" prop="name">
          <el-input placeholder="请输入商品名称" :maxLength="20" v-model="FormData.name"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="image">
          <input type="file" @change="handleImageChange" accept="image/*" />
          <el-image v-if="FormData.image" :src="FormData.image" fit="fill"></el-image>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input-number
            placeholder="请输入商品价格"
            v-model="FormData.price"
            min="1"
            :precision="2"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <el-input
            type="textarea"
            placeholder="请输入商品描述"
            :rows="4"
            v-model="FormData.desc"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
  </el-card>
</template>
