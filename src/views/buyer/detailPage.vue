<script setup>
import { ref } from 'vue'

const good = ref({
    img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    name: '小米手机',
    price: 3000,
    desc: '小米手机是一款基于高通骁龙处理器的手机，搭载了高通骁龙855处理器，采用了高通骁龙855处理器。'
})
const handleAddCart = () => {
    console.log('加入购物车')
}
const handleBuy = () => {
    console.log('立即购买')
}
</script>

<template>
    <el-descriptions title="商品信息" :column="1" border>
        <el-descriptions-item label="商品图片">
            <div class="w-40 h-50">
                <el-image :src="good.img" :fit="'contain'" />
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