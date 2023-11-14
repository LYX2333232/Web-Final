<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const { nickname, gender, updateName, updateGender } = useUserStore()

const visible = ref(false)
const confirmLoading = ref(false)
const form = ref()

const handleEdit = () => {
    FormData.value.nickname = nickname
    FormData.value.gender = gender
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
    nickname,
    gender
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
    console.log(FormData.value)
    updateName(FormData.value.nickname)
    updateGender(FormData.value.gender)
    visible.value = false
    form.value.resetFields()
    location.reload()
}
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
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">取 消</el-button>
            <el-button type="primary" @click="handleOk" :loading="confirmLoading">确 定</el-button>
        </span>
    </el-dialog>
</template>