<script setup>
import { ref, onMounted } from 'vue'
import { getGoodDetail } from '@/api/buyer/mainPage'
import { useRoute } from 'vue-router'

const route = useRoute()

const good = ref({
    id: 1,
    name: '商品1',
    image: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    price: 100,
    desc: '商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描'
})
// 获取商品详情
const getDetail = async () => {
    const id = route.params.id
    console.log(id)
    const res = await getGoodDetail(id)
    console.log(res.data)
    good.value = res.data.data
}

const handleAddCart = () => {
    console.log('加入购物车')
}
const handleBuy = () => {
    console.log('立即购买')
}

onMounted(() => {
    getDetail()
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
    </el-descriptions>
    <el-button type="primary" @click="handleAddCart">加入购物车</el-button>
    <el-button type="primary" @click="handleBuy">立即购买</el-button>
</template>