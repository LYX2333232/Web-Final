<script setup>
import { ref, onMounted } from 'vue'
import { getGoodList, deleteGood } from '@/api/seller/listPage'
import { useUserStore } from '@/stores/user'
import router from '@/routers'

const { userId } = useUserStore()

const reset = () => {
    form.value.resetFields()
    formData.value = {
        name: undefined,
        minPrice: undefined,
        maxPrice: undefined
    }
    getList()
}

const loading = ref(false)
// 表单信息
const form = ref()
const formData = ref({
    name: undefined,
    minPrice: undefined,
    maxPrice: undefined
})
// 商品信息
const dataList = ref([])

//获取商品信息
const getList = async () => {
    const params = {
        sellerId: userId,
        name: formData.value.name,
        minPrice: formData.value.minPrice,
        maxPrice: formData.value.maxPrice
    }
    const res = await getGoodList(params)
    console.log(res)
    if (res.data.code !== 200) {
        ElMessage.error('获取商品信息失败')
        return
    }
    dataList.value = res.data.data
}

// 新增商品信息
const add = () => {
    router.push('/seller/add')
}

// 查看详情
const toDetail = (id) => {
    router.push(`/seller/detail/${id}`)
}

// 删除商品信息
const del = async (id) => {
    const res = await deleteGood(id)
    if (res.data.code !== 200) {
        ElMessage.error('删除商品信息失败')
        return
    }
    ElMessage.success('删除商品信息成功')
    getList()
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
            <el-col :span="16">
                <el-form ref="form" :model="formData">
                    <el-form-item label="商品名称" prop="name">
                        <el-input placeholder="请输入商品名称" :maxLength="20" v-model="formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格范围" prop="price">
                        <el-row :gutter="20">
                            <el-col :span="11">
                                <el-input-number placeholder="请输入最小价格" v-model="formData.minPrice" :min="0"
                                    :max="formData.maxPrice"></el-input-number>
                            </el-col>
                            <el-col :span="11">
                                <el-input-number placeholder="请输入最大价格" v-model="formData.maxPrice"
                                    :min="formData.minPrice || 0"></el-input-number>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="8" class="flex justify-evenly">
                <el-button type="danger" @click="reset">重置</el-button>
                <el-button type="primary" @click="getList">查询</el-button>
            </el-col>
        </el-row>
        <el-table :data="dataList" :loading="loading" bordered rowKey="id">
            <el-table-column label="id" prop="id" align="center" />
            <el-table-column label="商品名称" prop="name" align="center" />
            <el-table-column label="商品图片" prop="img" align="center">
                <template #default="{ row }">
                    <el-image :src="row.image" width="100" />
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