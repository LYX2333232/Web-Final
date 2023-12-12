<script setup>
import { ref, onMounted } from 'vue'
import router from '@/routers'
import { getAll, deleteItem, changeNumber } from '@/api/buyer/cartPage'
import { buyGood } from '@/api/buyer/mainPage'
import { datetimeFormat } from '@/utils/datetimeFormat'
import { useUserStore } from '@/stores/user'

const { userId } = useUserStore()
const dataList = ref([])
const selectId = ref(null)
const selectNumber = ref(null)
const visible = ref(false)
const form = ref()
const FormData = ref({
    name: '',
    phone: '',
    email: ''
})
const rules = {
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '请输入联系电话', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
    ]
}

const onClose = () => {
    form.value.resetFields()
    selectId.value = null
    selectNumber.value = null
    visible.value = false
}

const getList = async () => {
    dataList.value = []
    console.log(userId)
    const res = await getAll(userId)
    console.log(res)
    console.log(res.data)
    dataList.value = res.data.data
}
const toDetail = (id) => {
    console.log(id)
    router.push({
        path: '/buyer/detail/' + id,
    })
}
const settle = (item) => {
    selectId.value = item.id
    selectNumber.value = item.number
    visible.value = true
}

const handleOk = async () => {
    if (userId == -1) {
        ElMessage.error('请先登录')
        router.push('/login')
        return
    }
    // 表单校验
    const check = await form.value.validate()
    if (!check) {
        return
    }
    const data = {
        buyerId: userId,
        goodId: selectId.value,
        name: FormData.value.name,
        phone: FormData.value.phone,
        email: FormData.value.email,
        number: selectNumber.value,
        time: datetimeFormat(new Date())
    }
    const res = await buyGood(data)
    if (res.data.code === 200) {
        ElMessage.success('购买成功')
        deleteItem(selectId.value)
        router.push('/buyer/order/' + res.data.data.id)
    }
    else {
        ElMessage.error('购买失败')
    }
    visible.value = false
    getList()
}
// 数量变化
const addOrSub = (item) => {
    const index = dataList.value.findIndex(i => i.id === item.id)
    const data = {
        id: item.id,
        number: item.number
    }
    changeNumber(data)
    dataList.value[index] = { ...item }// 重新赋值，触发视图更新
}
onMounted(() => {
    getList()
})
</script>

<template>
    <el-card>
        <el-row>
            <el-card :span="4" class=" w-70 border-2 border-yellow-400 mx-10 my-5 h-100 flex flex-col"
                v-for="item in dataList" :key="item.id" body-style="{'padding': '0px'}">
                <template #header>
                    <div class="flex justify-between">
                        <el-button type="primary" @click="settle(item)">购买</el-button>
                        <el-link type="danger" @click="deleteItem(item.id)">删除</el-link>
                    </div>
                </template>
                <el-image :src="item.image" fit="fill" @click="toDetail(item.id)" />
                <div style="display: flex; justify-content: space-evenly; align-items: center;">
                    <span class="mx-5 whitespace-nowrap overflow-hidden overflow-ellipsis">{{ item.name }}</span>
                    <span class="text-red-600">${{ item.price }}</span>
                </div>
                <el-input-number :min="0" v-model="item.number" :step="1" controls class="mx-10"
                    @change="addOrSub(item)"></el-input-number>
            </el-card>
        </el-row>
    </el-card>

    <el-dialog title="请选择收货信息" width="600px" v-model="visible" @close="onClose">
        <el-form ref="form" :model="FormData" :rules="rules" label-width="80px">
            <el-form-item label="姓名" prop="name">
                <el-input placeholder="请填写姓名" :maxLength="20" v-model="FormData.name" />
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input placeholder="请填写手机号" :maxLength="11" v-model="FormData.phone" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input placeholder="请填写收货地址" :maxLength="20" v-model="FormData.email" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button size="small" @click="onClose">取 消</el-button>
            <el-button size="small" type="primary" @click="handleOk" :loading="confirmLoading">确 定</el-button>
        </template>
    </el-dialog>
</template>