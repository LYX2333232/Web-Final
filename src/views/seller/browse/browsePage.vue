<script setup>
import { ref, onMounted } from 'vue'
const form = ref(null)
const formProps = ref({
  username: undefined,
  goodname: undefined,
  time: []
})

// 禁止选择当前时间之后的时间
const disabledDate = (time) => {
  return time.getTime() > Date.now()
}

const dataList = ref([])
const getList = () => {
  const list = [
    {
      id: 1,
      username: '张三',
      goodname: '小米手机',
      time: '2021-09-09 10:00:00'
    },
    {
      id: 2,
      username: '李四',
      goodname: '华为手机',
      time: '2021-09-09 10:00:00'
    },
    {
      id: 3,
      username: '王五',
      goodname: '苹果手机',
      time: '2021-09-09 10:00:00'
    },
    {
      id: 4,
      username: '赵六',
      goodname: '小米电视',
      time: '2021-09-09 10:00:00'
    },
    {
      id: 5,
      username: '孙七',
      goodname: '华为电视',
      time: '2021-09-09 10:00:00'
    }
  ]
  dataList.value = list
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
            <el-input v-model="formProps.username" placeholder="请输入客户名称" />
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="formProps.goodname" placeholder="请输入商品名称" />
          </el-form-item>
          <el-form-item label="浏览时间">
            <el-date-picker v-model="formProps.time" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间"
              :disabled-date="disabledDate" />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6" class="flex justify-evenly">
        <el-button type="danger" @click="handleReset">重置</el-button>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-col>
    </el-row>
    <el-table :data="dataList" :loading="loading" bordered rowKey="id">
      <el-table-column label="id" prop="id" width="100" />
      <el-table-column label="客户名称" prop="username" />
      <el-table-column label="商品名称" prop="goodname" />
      <el-table-column label="浏览时间" prop="time" />
    </el-table>
  </el-card>
</template>