<script setup>
import { ref, onMounted,computed } from 'vue'
import router from '@/routers'
// import { useUserStore } from '@/stores/user'

// const { username, password } = useUserStore()
const num = computed(() => {
    var all = 0
    console.log("计算总数")
    dataList.value.forEach(item => {
        if (item.checked) {
            all += 1
        }
    })
    return all
})
const total = computed(() => {
    var all = 0
    console.log("计算总价")
    dataList.value.forEach(item => {
        if (item.checked) {
            all += item.price * item.number
        }
    })
    return all
})
const dataList = ref([])
const getList = () => {
    num.value = 0
    total.value = 0
    dataList.value = []
    const data = [
        // 获取8个商品
        {
            id: 1,
            name: 'asdasdasdasdasddddddddddddd',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 100,
            checked: false,
            number: 1
        },
        {
            id: 2,
            name: '商品2',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 200,
            checked: false,
            number: 1
        },
        {
            id: 3,
            name: '商品3',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 300,
            checked: true,
            number: 2
        },
        {
            id: 4,
            name: '商品4',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 400,
            checked: false,
            number: 1
        },
        {
            id: 5,
            name: '商品5',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 500,
            checked: false,
            number: 1
        },
        {
            id: 6,
            name: '商品6',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 600,
            checked: true,
            number: 2
        },
        {
            id: 7,
            name: '商品7',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 700,
            checked: false,
            number: 1
        },
        {
            id: 8,
            name: '商品8',
            img: 'https://img.yzcdn.cn/vant/ipad.jpeg',
            price: 1000,
            checked: false,
            number: 1
        }

    ]
    dataList.value = data
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
// 数量变化
const addOrSub = (item) => {
    const index = dataList.value.findIndex(i => i.id === item.id)
    dataList.value[index] = { ...item }// 重新赋值，触发视图更新
}
onMounted(() => {
    getList()
})
</script>

<template>
    <el-card>
        <template #header>
            <div style="display: flex; justifyContent: space-between;">
                <span>共有<span class="text-red-600">{{ num }}</span>种商品，总计<span class="text-red-600">{{ total
                }}</span>元</span>
                <el-button type="primary" @click=settle >结算</el-button>
            </div>
        </template>
        <el-row>
            <el-card :span="4" class=" w-70 border-2 border-yellow-400 mx-10 my-5 h-100 flex flex-col" v-for="item in dataList"
                :key="item.id" body-style="{'padding': '0px'}">
                <template #header>
                    <div class="flex justify-between">
                        <el-checkbox v-model="item.checked" label="选择" @change="select(item)" />
                        <el-link type="danger" @click="handleDelete(item)">删除</el-link>
                    </div>
                </template>
                <el-image :src="item.img" fit="fill" @click="toDetail(item.id)"/>
                <div style="display: flex; justify-content: space-evenly; align-items: center;">
                        <span class="mx-5 whitespace-nowrap overflow-hidden overflow-ellipsis">{{ item.name }}</span>
                        <span class="text-red-600">${{ item.price }}</span>
                </div>
                <el-input-number :min="0" v-model="item.number" :step="1" controls class="mx-10" @change="addOrSub(item)"></el-input-number>
            </el-card>
        </el-row>
    </el-card>
</template>