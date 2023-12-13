<script setup>
import { ref, onMounted } from 'vue'
import { getGoodDetail } from '@/api/seller/detailPage'
import { useRoute } from 'vue-router'

const route = useRoute()

const good = ref({
  id: 0,
  name: '',
  price: 0,
  desc: '',
  image: ''
})
// 获取商品详情
const getDetail = async () => {
  const id = route.params.id
  console.log(id)
  const res = await getGoodDetail(id)
  console.log(res.data)
  good.value = res.data.data
}

onMounted(async () => {
  await getDetail()
})
</script>

<template>
  <el-descriptions title="商品信息" :column="1" border>
    <el-descriptions-item label="商品图片">
      <div class="w-40 h-50">
        <el-image :src="good.image" :fit="'contain'" />
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="商品名称">{{ good.name }} </el-descriptions-item>
    <el-descriptions-item label="商品价格"> {{ good.price }}</el-descriptions-item>
    <el-descriptions-item label="商品描述">
      {{ good.desc }}
    </el-descriptions-item>
    <el-descriptions-item label="买家信息">
      <el-table :data="good.orders" border>
        <el-table-column label="买家姓名" prop="name"></el-table-column>
        <el-table-column label="买家电话" prop="phone"></el-table-column>
        <el-table-column label="买家邮箱" prop="email"></el-table-column>
        <el-table-column label="购买时间" prop="time"></el-table-column>
      </el-table>
    </el-descriptions-item>
  </el-descriptions>
</template>
