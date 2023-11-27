<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const { userid } = useUserStore()

// loading条
const loading = ref(false)

// 地址信息
const addressInfo = ref([])

const visible = ref(false)
const confirmLoading = ref(false)
const title = ref('')
const form = ref()

// 获取地址信息
const getData = () => {
    loading.value = true
    // 获取信息

    // 静态数据
    addressInfo.value = [
        {
            id: 1,
            name: '张三',
            phone: '135****8888',
            address: '北京市朝阳区东四环中路123号'
        },
        {
            id: 2,
            name: '李四',
            phone: '135****8888',
            address: '北京市朝阳区东四环中路123号'
        }
    ]
    loading.value = false
}

const handleAdd = () => {
    visible.value = true
    title.value = '添加地址'
}
const handleEdit = (item) => {
    form.value.name = item.name
    form.value.phone = item.phone
    form.value.address = item.address
    visible.value = true
    title.value = '修改地址'
}
const handleDelete = (item) => {
    console.log(addressInfo)
    let data = addressInfo
    console.log(data)
    data.splice(data.indexOf(item), 1)
    updateAddress(data)
}
const formData = ref({
    name: '',
    phone: '',
    address: ''
})
const handleCancel = () => {
    visible.value = false
    form.value.resetFields()
}
const handleOk = async () => {
    // 表单校验
    const res = await form.value.validate()
    if (!res) {
        return
    }
    let data = addressInfo
    data.push({
        name: formData.value.name,
        phone: formData.value.phone,
        address: formData.value.address
    })
    updateAddress(data)
    visible.value = false
    form.value.resetFields()
}
onMounted(() => {
    getData()
})
</script>

<template>
    <el-card>
        <template #header>
            <div class="flex justify-between">
                <span class="text-3xl">收货地址</span>
                <el-button type="primary" @click="handleAdd">添加地址</el-button>
            </div>
        </template>
        <el-table :data="addressInfo" :loading="loading" border>
            <el-table-column label="姓名" prop="name" />
            <el-table-column label="联系电话" prop="phone" />
            <el-table-column label="收货地址" prop="address" />
            <el-table-column label="操作" width="100">
                <template #default="scope">
                    <div class="flex justify-between">
                        <el-link type="primary" @click="handleEdit(scope.row)">修改</el-link>
                        <el-link type="danger" @click="handleDelete(scope.row)">删除</el-link>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <el-dialog :title="title" width="600px" v-model="visible">
        <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.name" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
                <el-input v-model="formData.phone" placeholder="请输入联系电话" />
            </el-form-item>
            <el-form-item label="收货地址" prop="address">
                <el-input v-model="formData.address" placeholder="请输入收货地址" />
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer flex justify-evenly">
            <el-button @click="handleCancel">取 消</el-button>
            <el-button type="primary" @click="handleOk" :loading="confirmLoading">确 定</el-button>
        </span>
    </el-dialog>
</template>