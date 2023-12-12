<script setup>
import router from '@/routers';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getOrder } from '@/api/buyer/orderPage'
import { getGoodDetail } from '@/api/buyer/mainPage'

const route = useRoute()
const data = ref({
    id: null,
    name: undefined,
    phone: undefined,
    email: undefined,
    time: undefined,
    goodId: undefined,
    good: {
        id: undefined,
        name: undefined,
        price: undefined,
        desc: undefined,
        image: undefined,
        sold: undefined
    }
})
const good = ref({
    id: undefined,
    name: undefined,
    price: undefined,
    desc: undefined,
    image: undefined,
    sold: undefined
})

const getData = async () => {
    const id = route.params.id
    const res = await getOrder(id)
    if (res.data.code === 200) {
        console.log("res:", res.data);
        data.value = res.data.data
        console.log(data.value)
        const res2 = await getGoodDetail(data.value.goodId)
        if (res2.data.code === 200) {
            console.log("res2:", res2.data.data)
            good.value = res2.data.data
        }
        else {
            ElMessage.error('获取商品信息失败')
        }
    }
    else {
        ElMessage.error('获取订单信息失败')
    }
}

onMounted(() => {
    getData()
})
</script>

<template>
    <el-card>
        <template #header>
            <div class="flex justify-between">
                <span>
                    订单信息
                </span>
                <span>
                    <el-button type="primary" @click="router.push('/buyer/main')">返回首页</el-button>
                </span>
            </div>

        </template>
        <el-descriptions column="3" border>
            <el-descriptions-item label="订单号" span="3">{{ data.id }}</el-descriptions-item>
            <el-descriptions-item label="姓名">{{ data.name }} </el-descriptions-item>
            <el-descriptions-item label="手机号">{{ data.phone }} </el-descriptions-item>
            <el-descriptions-item label="邮箱">{{ data.email }} </el-descriptions-item>
            <el-descriptions-item label="下单时间" span="3">{{ data.time }} </el-descriptions-item>
            <el-descriptions-item label="商品名称">{{ good.name }} </el-descriptions-item>
            <el-descriptions-item label="商品价格">{{ good.price }} </el-descriptions-item>
            <el-descriptions-item label="商品数量">{{ good.sold }} </el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>