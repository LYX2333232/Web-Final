<!-- eslint-disable no-undef -->
<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import router from '@/routers'
import { getInfo, updateInfo } from '@/api/buyer/infoPage'

const { userId } = useUserStore()

const nickname = ref()
const gender = ref()
const age = ref()

const visible = ref(false)
const confirmLoading = ref(false)
const form = ref()

const handleEdit = () => {
    FormData.value.nickname = nickname.value
    FormData.value.gender = gender.value
    FormData.value.age = age.value
    visible.value = true
}

const rules = {
    nickname: [
        { required: true, message: '请输入昵称', trigger: 'blur' },
        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
    ],
    gender: [
        { required: true, message: '请选择性别', trigger: 'change' }
    ]
}

const FormData = ref({
    nickname: '',
    gender: undefined,
    age: undefined
})
const getData = async () => {
    console.log(userId)
    if (userId) {
        // TODO: 获取数据
        const res = await getInfo(userId)
        console.log(res.data)
        if (res.data.code === 200) {
            nickname.value = res.data.data.nickname
            gender.value = res.data.data.gender
            age.value = res.data.data.age
        }
        else {
            ElMessage.warning(res.data.msg)
        }
    }
    else {
        ElMessage.warning('请先登录')
        router.push({
            path: '/buyer/login'
        })
    }

}
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
    console.log(FormData.value)
    confirmLoading.value = true
    // 上传数据
    if (userId) {
        // TODO: 修改数据
        const data = FormData.value
        data.id = userId
        const res = await updateInfo(FormData.value)
        console.log(res)
        if (res.data.code === 200) {
            ElMessage.success("修改成功")
        }
        else {
            ElMessage.warning("修改失败")
        }
    }
    confirmLoading.value = false
    visible.value = false
    form.value.resetFields()
    getData()
}

onMounted(() => {
    getData()
})
</script>

<template>
    <el-card>
        <template #header>
            <div class="flex justify-between">
                <span class="text-3xl">个人信息</span>
                <el-button type="primary" @click="handleEdit">修改信息</el-button>
            </div>
        </template>
        <el-descriptions :column="1" border>
            <el-descriptions-item label="昵称">{{ nickname }}</el-descriptions-item>
            <el-descriptions-item label="性别">
                <div v-if="gender === 1">男</div>
                <div v-if="gender === 2">女</div>
                <div v-if="gender === 0">保密</div>
            </el-descriptions-item>
            <el-descriptions-item label="年龄">
                {{ age }}
            </el-descriptions-item>
        </el-descriptions>
    </el-card>
    <el-dialog title="修改信息" width="600px" v-model="visible">
        <el-form ref="form" :model="FormData" :rules="rules" label-width="100px">
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="FormData.nickname" placeholder="请输入昵称" />
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="FormData.gender">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                    <el-radio :label="0">保密</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input placeholder="请输入年龄" v-model="FormData.age" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="handleCancel">取 消</el-button>
            <el-button type="primary" @click="handleOk" :loading="confirmLoading">确 定</el-button>
        </template>
    </el-dialog>
</template>