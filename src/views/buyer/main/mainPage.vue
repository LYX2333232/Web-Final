<script setup>
import { ref } from 'vue'
import router from '@/routers'
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
</script>

<template>
    <el-row>
        <el-col :span="4" class="border-2 border-yellow-400 mx-10 my-5 h-70" v-for="item in dataList" :key="item.id"
            @click="toDetail(item.id)">
            <el-image :src="item.img" fit="fill" />
            <div class="text-center">
                <span>{{ item.name }}</span>
                <span class="text-red-600">${{ item.price }}</span>
            </div>
        </el-col>
    </el-row>
</template>