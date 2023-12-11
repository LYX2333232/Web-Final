<script setup>
import { ref, onMounted } from 'vue'
import { getBrowse } from '@/api/seller/browsePage'
import { useUserStore } from '@/stores/user'
import { datetimeFormat } from '@/utils/datetimeFormat'

const { userId } = useUserStore()


const form = ref(null)
const formProps = ref({
  userName: undefined,
  goodName: undefined,
  time: []
})

// 禁止选择当前时间之后的时间
const disabledDate = (time) => {
  return time.getTime() > Date.now()
}

const handleReset = () => {
  formProps.value = {
    userName: undefined,
    goodName: undefined,
    time: []
  }
  getList()
}

const dataList = ref([])
const getList = async () => {
  const params = {
    sellerId: userId,
    userName: formProps.value.userName,
    goodName: formProps.value.goodName,
    startTime: formProps.value.time[0] ? datetimeFormat(new Date(formProps.value.time[0])) : null,
    endTime: formProps.value.time[1] ? datetimeFormat(new Date(formProps.value.time[1])) : null
  }
  const res = await getBrowse(params)
  console.log(res)
  dataList.value = res.data.data
}
onMounted(() => {
  getList()
})
</script>

<template>
  <el-card>
    <template #header>
      <span>客户浏览记录</span>
    </template>
    <el-row :gutter="0">
      <el-col :span="18">
        <el-form ref="form" :model="formProps">
          <el-form-item label="客户名称">
            <el-input v-model="formProps.userName" placeholder="请输入客户名称" />
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="formProps.goodName" placeholder="请输入商品名称" />
          </el-form-item>
          <el-form-item label="浏览时间">
            <el-date-picker v-model="formProps.time" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间"
              :disabled-date="disabledDate" />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6" class="flex justify-evenly">
        <el-button type="danger" @click="handleReset">重置</el-button>
        <el-button type="primary" @click="getList">查询</el-button>
      </el-col>
    </el-row>
    <el-table :data="dataList" :loading="loading" bordered rowKey="id">
      <el-table-column label="id" prop="id" width="100" />
      <el-table-column label="客户名称" prop="buyerName" />
      <el-table-column label="商品名称" prop="goodName" />
      <el-table-column label="浏览时间" prop="time" />
    </el-table>
  </el-card>
</template>