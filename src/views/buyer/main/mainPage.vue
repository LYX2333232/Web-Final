<script setup>
import { onMounted, ref } from 'vue'
import router from '@/routers'
import { getGoodsList, recordBrowse } from '@/api/buyer/mainPage'
import { useUserStore } from '@/stores/user'
import { datetimeFormat } from '@/utils/datetimeFormat'

const { userId } = useUserStore()

const dataList = ref([])
const toDetail = (id) => {
  console.log(id)
  const data = {
    goodId: id,
    buyerId: userId,
    time: datetimeFormat(new Date())
  }
  console.log(data)
  recordBrowse(data)
  router.push({
    path: '/buyer/detail/' + id
  })
}
const getList = async () => {
  const res = await getGoodsList()
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
      <div class="flex justify-between">
        <span class="text-3xl">商品列表</span>
        <el-button type="primary" @click="getList">换一批</el-button>
      </div>
    </template>
    <el-row>
      <el-card
        :span="4"
        class="w-60 border-2 border-yellow-400 mx-10 my-5 h-70"
        v-for="item in dataList"
        :key="item.id"
        @click="toDetail(item.id)"
      >
        <el-image :src="item.image" fit="fill" />
        <div class="flex justify-evenly">
          <span>{{ item.name }}</span>
          <span class="text-red-600">${{ item.price }}</span>
        </div>
      </el-card>
    </el-row>
  </el-card>
</template>
