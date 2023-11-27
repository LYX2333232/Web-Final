<script setup>
import { onMounted, ref } from 'vue'
import router from '@/routers'
import {getGoodsList} from '@/api/buyer/mainPage'
// import { useUserStore } from '@/stores/user'

// const { username, password } = useUserStore()

const dataList = ref(
    [
        // 获取8个商品
        {
            id: 1,
            name: '商品1',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 100
        },
        {
            id: 2,
            name: '商品2',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 200
        },
        {
            id: 3,
            name: '商品3',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 300
        },
        {
            id: 4,
            name: '商品4',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 400
        },
        {
            id: 5,
            name: '商品5',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 500
        },
        {
            id: 6,
            name: '商品6',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 600
        },
        {
            id: 7,
            name: '商品7',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 700
        },
        {
            id: 8,
            name: '商品8',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 1000
        },
        {
            id: 9,
            name: '商品9',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 1000
        },
        {
            id: 10,
            name: '商品10',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 1000
        }
    ]
)
const toDetail = (id) => {
    console.log(id)
    router.push({
        path: '/buyer/detail',
        query: {
            id: id
        }
    })
}
const getList = async()=>{
    const res = await getGoodsList()
    console.log(res)
    dataList.value = res.data.records
}

onMounted(() => {
    getList()
})
</script>

<template>
    <el-card>
        <template #header>
            <div class="flex justify-between">
                <span class="text-3xl">商品列表</span>
                <el-button type="primary" @click=getList>换一批</el-button>
            </div>
        </template>
        <el-row>
            <el-card :span="4" class="w-60 border-2 border-yellow-400 mx-10 my-5 h-70" v-for="item in dataList"
                :key="item.id" @click="toDetail(item.id)">
                <el-image :src="item.image" fit="fill" />
                <div class="flex justify-evenly">
                    <span>{{ item.name }}</span>
                    <span class="text-red-600">${{ item.price }}</span>
                </div>
            </el-card>
        </el-row>
    </el-card>
</template>