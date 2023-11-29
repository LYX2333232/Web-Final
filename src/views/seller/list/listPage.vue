<script setup>
import { ref, onMounted } from 'vue'

// 表单信息
const form = ref({
    name: undefined,
    minPrice: undefined,
    maxPrice: undefined
})
// 商品信息
const dataList = ref([])

//获取商品信息
const getList = async () => {
    const list = [
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
        }
    ]
    dataList.value = list
}

// 新增商品信息
const add = () => {
    console.log("新增")
}
onMounted(() => {
    getList()
})
</script>

<template>
    <el-card>
        <template #header>
            <div class="flex justify-between">
                <span>商品列表</span>
                <el-button type="primary" @click="add">新增</el-button>
            </div>
        </template>
        <el-row>
            <el-col :span="16" xs="24">
                <el-form ref="form" :model="form">
                    <el-form-item label="商品名称" prop="name">
                        <el-input placeholder="请输入商品名称" :maxLength="20" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格范围" prop="price">
                        <el-row :gutter="20">
                            <el-col :span="11">
                                <el-input-number placeholder="请输入最小价格" v-model="form.minPrice" min="0"
                                    max="form.maxPrice"></el-input-number>
                            </el-col>
                            <el-col :span="11">
                                <el-input-number placeholder="请输入最大价格" v-model="form.maxPrice"
                                    :min="form.minPrice || 0"></el-input-number>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="8" xs="24" class="flex justify-evenly">
                <el-button type="danger" @click="reset">重置</el-button>
                <el-button type="primary" @click="getList">查询</el-button>
            </el-col>
        </el-row>
        <el-table :data="dataList" :loading="loading" bordered rowKey="id">
            <el-table-column label="id" prop="id" align="center" />
            <el-table-column label="商品名称" prop="name" align="center" />
            <el-table-column label="商品图片" prop="img" align="center">
                <template #default="{ row }">
                    <el-image :src="row.img" width="100" />
                </template>
            </el-table-column>
            <el-table-column label="商品价格" prop="price" align="center" />
            <el-table-column label="操作" width="150" align="center">
                <template #default="{ row }">
                    <div class="my-3">
                        <el-button type="primary" @click="toDetail(row.id)">详情</el-button>
                    </div>
                    <div class="my-3">
                        <el-button type="danger" @click="del(row.id)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>