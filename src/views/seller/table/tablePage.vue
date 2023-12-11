<script setup>
import { ref, onMounted } from 'vue'
import { getTableList } from '@/api/seller/tablePage'
import { useUserStore } from '@/stores/user'
import router from '@/routers'

const { userId } = useUserStore()
// 查询表单
const formProps = ref({
    name: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    minSold: undefined,
    maxSold: undefined
})
const form = ref(null)
// 展示的数据
const dataList = ref([])
// 获取数据
const getList = async () => {
    const params = {
        sellerId: userId,
        name: formProps.value.name,
        minPrice: formProps.value.minPrice,
        maxPrice: formProps.value.maxPrice,
        minSold: formProps.value.minSold,
        maxSold: formProps.value.maxSold
    }
    const res = await getTableList(params)
    if (res.data.code !== 200) {
        ElMessage.error('获取数据失败')
        return
    }
    dataList.value = res.data.data
}
// 重置表单
const reset = () => {
    form.value.resetFields()
    getList()
}

const toDetail = async (row) => {
    console.log(row)
    router.push(`/seller/detail/${row.id}`)
}
onMounted(() => {
    getList()
})
</script>
<template>
    <el-card>
        <template #header>
            <span>销售统计表</span>
        </template>
        <el-row>
            <el-col :span="18" xs="24">
                <el-form :ref="form" v-model="formProps" label-width="80px">
                    <el-form-item label="商品名称" prop="name">
                        <el-input placeholder="请输入" :maxLength="20" v-model="formProps.name" />
                    </el-form-item>
                    <el-form-item label="商品价格" prop="price">
                        <el-input-number :min="0" :max="formProps.maxPrice" v-model="formProps.minPrice"
                            placeholder="最低价格" />
                        <span> - </span>
                        <el-input-number :min="formProps.minPrice || 0" v-model="formProps.maxPrice" placeholder="最高价格" />
                    </el-form-item>
                    <el-form-item label="商品销量" prop="sold">
                        <el-input-number :min="0" :max="formProps.maxSold" v-model="formProps.minSold" placeholder="最低销量" />
                        <span> - </span>
                        <el-input-number :min="formProps.minSold || 0" v-model="formProps.maxSold" placeholder="最高销量" />
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="6" xs="24" class="flex justify-evenly">
                <el-button type="danger" @click="reset">重置</el-button>
                <el-button type="primary" @click="getList">查询</el-button>
            </el-col>
        </el-row>
        <el-table :data="dataList" :loading="loading" bordered rowKey="id" border>
            <el-table-column label="id" prop="id" />
            <el-table-column label="商品名称" prop="name" />
            <el-table-column label="商品价格" prop="price" />
            <el-table-column label="商品销量" prop="sold" />
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button type="primary" @click="toDetail(row)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>