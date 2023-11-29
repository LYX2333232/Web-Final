<script setup>
import { ref, onMounted } from 'vue'
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
const getList = () => {
    // 这里是假数据
    const list = [
        {
            id: 1,
            name: '商品1',
            price: 100,
            sold: 1000
        },
        {
            id: 2,
            name: '商品2',
            price: 200,
            sold: 2000
        },
        {
            id: 3,
            name: '商品3',
            price: 300,
            sold: 3000
        }
    ]
    dataList.value = list
}
// 重置表单
const reset = () => {
    form.value.resetFields()
    getList()
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