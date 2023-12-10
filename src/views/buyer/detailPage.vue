<script setup>
import { ref, onMounted } from 'vue'
import { getGoodDetail, buyGood, addToCart } from '@/api/buyer/mainPage'
import router from '@/routers'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { datetimeFormat } from '@/utils/datetimeFormat'

const { userId } = useUserStore()

const route = useRoute()

const good = ref({
    id: 0,
    name: '',
    price: 0,
    desc: '',
    image: ''
})
// 获取商品详情
const getDetail = async () => {
    const id = route.params.id
    console.log(id)
    const res = await getGoodDetail(id)
    console.log(res.data)
    good.value = res.data.data
}

const handleAddCart = async () => {
    if (userId == -1) {
        ElMessage.error('请先登录')
        router.push('/login')
        return
    }
    const data = {
        goodId: good.value.id,
        buyerId: userId
    }
    console.log(data)
    const res = await addToCart(data)
    console.log(res)
    if (res.data.code === 200) {
        ElMessage.success('加入购物车成功')
    }
    else {
        ElMessage.error('加入购物车失败')
    }
}

const visible = ref(false)
const onClose = () => {
    if (userId == -1) {
        ElMessage.error('请先登录')
        router.push('/login')
        return
    }
    visible.value = false
}

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
        { required: true, message: '请输入联系电话', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                if (!(/^1[3456789]\d{9}$/.test(value))) {
                    callback(new Error('手机号格式不正确'))
                } else {
                    callback()
                }
            }
        }
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
    ]
}

const handleOk = async () => {
    // 表单校验
    const res = await form.value.validate()
    if (!res) {
        return
    }
    const data = {
        name: FormData.value.name,
        phone: FormData.value.phone,
        email: FormData.value.email,
        goodId: good.value.id,
        buyerId: userId,
        time: datetimeFormat(new Date())
    }
    console.log(data)
    const res2 = await buyGood(data)
    console.log(res2)
    if (res2.data.code === 200) {
        ElMessage.success('购买成功')
        router.push('/buyer/order/' + res2.data.data.id)
    }
    visible.value = false
    form.value.resetFields()
}

onMounted(async () => {
    await getDetail()
})
</script>

<template>
    <el-descriptions title="商品信息" :column="1" border>
        <el-descriptions-item label="商品图片">
            <div class="w-40 h-50">
                <el-image :src="good.image" :fit="'contain'" />
            </div>
        </el-descriptions-item>
        <el-descriptions-item label="商品名称">{{ good.name }} </el-descriptions-item>
        <el-descriptions-item label="商品价格"> {{ good.price }}</el-descriptions-item>
        <el-descriptions-item label="商品描述">
            {{ good.desc }}
        </el-descriptions-item>
    </el-descriptions>
    <el-button type="primary" @click="handleAddCart">加入购物车</el-button>
    <el-button type="primary" @click="visible = true">立即购买</el-button>

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