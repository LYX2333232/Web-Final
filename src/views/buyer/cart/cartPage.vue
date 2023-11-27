<script setup>
import { ref, onMounted } from 'vue'
import router from '@/routers'
// import { useUserStore } from '@/stores/user'

// const { username, password } = useUserStore()
const num = ref(0)
const total = ref(0)
const dataList = ref([])
const getList = () => {
    num.value = 0
    total.value = 0
    dataList.value = []
    const data = [
        // 获取8个商品
        {
            id: 1,
            name: '商品1',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 100,
            checked: false
        },
        {
            id: 2,
            name: '商品2',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 200,
            checked: false
        },
        {
            id: 3,
            name: '商品3',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 300,
            checked: true
        },
        {
            id: 4,
            name: '商品4',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 400,
            checked: false
        },
        {
            id: 5,
            name: '商品5',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 500,
            checked: false
        },
        {
            id: 6,
            name: '商品6',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 600,
            checked: true
        },
        {
            id: 7,
            name: '商品7',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 700,
            checked: false
        },
        {
            id: 8,
            name: '商品8',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 1000,
            checked: false
        }

    ]
    dataList.value = data
    data.forEach(item => {
        if (item.checked) {
            num.value++
            total.value += item.price
        }
    })
}
const select = (item) => {
    // console.log(item)
    if (item.checked) {
        num.value++
        total.value += item.price
    } else {
        num.value--
        total.value -= item.price
    }
}
const handleDelete = (item) => {
    console.log(item)
    dataList.value = dataList.value.filter(i => i.id !== item.id)
    if (item.checked) {
        num.value--
        total.value -= item.price
    }
}
const toDetail = (id) => {
    console.log(id)
    router.push({
        path: '/buyer/detail',
        query: {
            id: id
        }
    })
}
const settle = () => {
    console.log("结算")
}
onMounted(() => {
    getList()
})
</script>

<template>
    <el-card>
        <template #header>
            <div style="display: flex; justifyContent: space-between;">
                <span>共有<span class="text-red-600">{{ num }}</span>件商品，总计<span class="text-red-600">{{ total
                }}</span>元</span>
                <el-button type="primary" @click=settle >结算</el-button>
            </div>
        </template>
        <el-row>
            <el-card :span="4" class=" w-60 border-2 border-yellow-400 mx-10 my-5 h-80" v-for="item in dataList"
                :key="item.id" body-style="{'padding': '0px'}">
                <template #header>
                    <div class="flex justify-between">
                        <el-checkbox v-model="item.checked" label="选择" @change="select(item)" />
                        <el-link type="danger" @click="handleDelete(item)">删除</el-link>
                    </div>
                </template>
                <div @click="toDetail(item.id)">
                    <el-image :src="item.img" fit="fill" />
                    <div style="display: flex; justify-content: space-evenly; align-items: center;">
                        <span class="mx-5">{{ item.name }}</span>
                        <span class="text-red-600">${{ item.price }}</span>
                    </div>
                </div>
            </el-card>
        </el-row>
    </el-card>
</template>