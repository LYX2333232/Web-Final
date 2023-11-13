<script setup lang="ts">
import { useUserStore } from '../../stores/user'
import router from '../../routers'

const { logout } = useUserStore()

const quit = () => {
    console.log("退出")
    logout()
    router.push('/login')
}
</script>

<template>
    <el-container>
        <el-aside>
            <el-menu router>
                <el-menu-item index="/buyer/main">主页</el-menu-item>
                <el-menu-item index="/buyer/cart">购物车</el-menu-item>
                <el-sub-menu>
                    <template #title>
                        <span>个人信息</span>
                    </template>
                    <el-menu-item index="1">个人昵称</el-menu-item>
                    <el-menu-item index="2">收货地址</el-menu-item>
                    <el-menu-item index="2">修改账号密码</el-menu-item>
                    <el-menu-item @click="quit">退出登陆</el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>